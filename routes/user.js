const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user')
const { default: mongoose } = require('mongoose')


router.post('/signup', (req,res)=> {
    console.log('signup post request')

    User.find({email:req.body.email})
    .then(result=>{
        
        if(result.length > 0)
        {
            return res.status(500).json({
        msg : "email is already exist"})
        }

        bcrypt.hash(req.body.password,10,(err,hash)=>{
            if(err)
            {
                console.log(err)
               return res.status(500).json({
                error : err
               })
            }
    
            const newUser = new User ({
                _id:new mongoose.Types.ObjectId,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                password : hash
            })
            newUser.save()
            .then(result=>{
                res.status(200).json({
                    newUser:result
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            })
        })


    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
    
   

    // use bcrypt to secure pass in database
  

    console.log(req.body)



    // signupcode
})
router.post('/login', (req,res) => {
    console.log('login post request')
    console.log('req.body')
    User.find({email:req.body.email})
    .then(user=>{
        console.log(user)
        if(User.length<1)
        {
            res.status(500).json({
                msg: 'user not exist'
            })
        }

        bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
            if(!user)
            {
                return res.status(401).json({
                    msg:'invalid password'
                })
            }

            const token = jwt.sign({
                firstName: user[0].firstName,
                lastName:user[0].lastName,
                email:user[0].email,
                userId:user[0]._id

            },
                'Rai123', 
                {
                expiresIn:"365d"
                }
            )
            res.status(200).json({
                firstName: user[0].firstName,
                lastName:user[0].lastName,
                email:user[0].email,
                userId:user[0]._id,
                token:token

            })
       
        })

    })
    .catch(err=>{
        console.log(err)
    })
    // logincode 
})

module.exports = router