
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port=process.env.PORT || 3001



app.get('/', (req,res)=>{
  res.sendFile(__dirname + '/mzizi.html')
})


app.use(express.json())

app.use(express.static("mzizi"))



app.listen(port, () => {
 console.log('Server is up on port'+ port)
})
