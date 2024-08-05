import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import dbConnection from './config/db.js';
import userRoutes from './routes/user.js'

dotenv.config();
dbConnection()  //db connection config
const app=express()

app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/user', userRoutes)

app.get('/',(req,res)=>{
    res.send("<h1>Welcome to E-commerce Home Decor</h1>")
})

const PORT= process.env.PORT ||8087

app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`)
})