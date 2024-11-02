const express = require('express')
const app = express()

const mongoose = require('mongoose')
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://rrai112002:Hitkit9565@hitkit.gjlac.mongodb.net/?retryWrites=true&w=majority&appName=Hitkit')
.then(res =>{console.log('database is connected')})
.catch(err =>{console.log(err)} )

const userRoute = require('../blog_api/routes/user')
const catRoute = require('../blog_api/routes/category')
const blogRoute = require('../blog_api/routes/blog')
// const commentRoute = require('../blog_api/routes/comment')

app.use( bodyParser.json())

app.use('/user', userRoute)
app.use('/category', catRoute)
app.use('/blog', blogRoute)
// app.use('comment', commentRoute)

module.exports = app
