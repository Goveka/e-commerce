
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const assert = require('assert');
const fs = require('fs');

app.set('view engine', 'ejs');

app.use(require('body-parser')());

app.use(express.static("mzizi"))

// FORM SUBMITIONS

const url='mongodb://localhost:27017/mziziProject';

app.get('/insert', function(req, res){

 res.render('insert', { csrf: 'CSRF token goes here' });
});
app.post('/insert', function(req, res){
let item={
  name: req.body.name,
  surname: req.body.surname,
  email: req.body.email
};


mongoose.connect(url, (err,db)=>{
  assert.equal(null, err);
  db.collection('clientData').insertOne(item,(err,result)=>{
    assert.equal(null,err);
    console.log('item inserted');
    db.close();
  });
});
 res.redirect(303, '/mzizi.html');
});








app.listen(3001, () => {
 console.log('Server is up on port 3000.')
})
