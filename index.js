import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import dbConnection from './config/db.js';
import router from './routes/userRoute.js'

dotenv.config();
dbConnection()  //db connection config
const app=express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/user', router)

app.get('/',(req,res)=>{
    res.send("<h1>Welcome to E-commerce Home Decor</h1>")
})

const PORT= process.env.PORT ||8080

app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`)
})