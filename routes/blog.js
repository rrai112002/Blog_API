const express = require('express')
const router = express.Router()
const Blog = require('../model/Blog')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/checkAuth')
const jwt = require('jsonwebtoken');


// add new blog
router.post('',checkAuth,(req, res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'Rai123')

    // console.log(req.body)
    const newBlog = new Blog({
        _id:new mongoose.Types.ObjectId,
        userId : req.body.userId,
       title : req.body.title,
       imageUrl : req.body.imageUrl,
       categoryTitle : req.body.categoryTitle,
       categoryId : req.body.categoryId,



    })
    newBlog.save()
    .then(result=>{
        res.status(200).json({
            newBlog:result

        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })

    })

})

// update

router.put('/:id', checkAuth, (req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'Rai123')
    console.log(verify)
    Blog.find({_id:req.params.id,userId:verify.userId})
    .then(result=>{
        if(result.length == 0)
        {
            return res.status(400).json({
                msg : "something is wrong"

            })
        }
        Blog.findOneAndUpdate({_id: req.params.id,userId:verify.userId},{
            $set:{
                userId : req.body.userId,
                title : req.body.title,
                imageUrl : req.body.imageUrl,
                categoryTitle : req.body.categoryTitle,
                categoryId : req.body.categoryId
            }
        })
        .then(result=>{
            res.status(200).json({
                msg:result
            })
        })
        
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })

    })
    .catch(err=>{
        res.status(400).json({
            error: err
        })
    })
   


})


module.exports = router

