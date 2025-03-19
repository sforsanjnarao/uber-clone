const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require('express')
const app = express()
const cookieParser=require('cookie-parser')
const userRoutes=require('./routes/user.routes')

const connectDb=require('./db/db')
connectDb()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser()) 

app.use('/api/user',userRoutes)
module.exports =app