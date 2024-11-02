const express = require('express')
const router = express.Router()
const category = require('../model/category')
const mongoose = require('mongoose')
const checkAuth = require('../middleware/checkAuth')
const jwt = require('jsonwebtoken');


router.post('/',checkAuth, (req,res)=>{
    console.log(req.body)
    const newcategory = new category({
        _id:new mongoose.Types.ObjectId,
        userId : req.body.userId,
       title : req.body.title,
       imageUrl : req.body.imageUrl

    })
    newcategory.save()
    .then(result=>{
        res.status(200).json({
            newcategory:result

        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })

    })

})


// add category

// get all category
router.get('/', checkAuth, (req,res)=>{
    category.find()
    .then(result=>{
        res.status(200).json({
            categoryList:result
        })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            msg:TypeError
        })

    })
})

// update

router.put('/:id', checkAuth, (req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const verify = jwt.verify(token, 'Rai123')
    console.log(verify)
    category.find({_id:req.params.id,userId:verify.userId})
    .then(result=>{
        if(result.length == 0)
        {
            return res.status(400).json({
                msg : "something is wrong"

            })
        }
        category.findOneAndUpdate({_id: req.params.id,userId:verify.userId},{
            $set:{
                userId:verify.userId,
                title:req.body.title,
                imageUrl:req.body.imageUrl
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










// 6707637ebbb0b4f363656ba9



// {
//     "userId" : "66e15ae8e2f6b360d2b43825",
//     "title" : "electronics",
//     "imageUrl" : "dummy url"
//   }