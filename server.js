
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port=process.ENV || 3001
//const assert = require('assert');



app.use(express.json())

app.use(express.static("mzizi"))

// FORM SUBMITIONS

//const url='mongodb://localhost:27017/mziziProject';

//app.get('/insert', function(req, res){

// res.render('insert', { csrf: 'CSRF token goes here' });
//});
//app.post('/insert', function(req, res){
//let item={
//  name: req.body.name,
//  surname: req.body.surname,
//  email: req.body.email
//};


//mongoose.connect(url, (err,db)=>{
//  assert.equal(null, err);
//  db.collection('clientData').insertOne(item,(err,result)=>{
//    assert.equal(null,err);
  //  console.log('item inserted');
  //  db.close();
  //});
//});
// res.redirect(303, '/mzizi.html');
//});








app.listen(port, () => {
 console.log('Server is up on port'+ port)
})
