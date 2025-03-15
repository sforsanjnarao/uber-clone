const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const express = require('express')
const app = express()
const userRoutes=require('./routes/user.routes')

const connectDb=require('./db/db')
connectDb()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user',userRoutes)
module.exports =app