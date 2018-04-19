const express = require('express')
const app = express()
const port = 3000

app.get('/hello',(req,res)=>{
  res.status(200).json({message:'hello'})
})

app.use((req,res,next)=>{
  return res.status(404).json({message:'Not Found'})
})

app.listen(9080)
