require('dotenv').config()
const express= require ('express')
const req = require('express/lib/request')
const app=express()
const mongosse=require ('mongoose')

mongosse.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db = mongosse.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('connected to db'))
app.use(express.json())

const reviewRouter=require ('./routes/review')
app.use('/review',reviewRouter)
const ratingRouter = require('./routes/rating')
app.use('/rating',ratingRouter)
const courseRouter = require('./routes/course')
app.use('/course',courseRouter)


app.listen(3000,()=>console.log('server started'))