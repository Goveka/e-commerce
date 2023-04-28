const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url='mongodb://localhost:27017/test'
const bodyParser= require('body-parser');
const port=process.env.PORT || 3001;
const jwt=require('jsonwebtoken');
const cookieParser= require('cookie-parser');
const paypal= require('paypal-rest-sdk');

// middleware
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

// models
const Admin = require('./models/Admin');
const Product= require('./models/Product');

  // connecting to the database
  mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true})

  const database = mongoose.connection
  //checking if our connection to database was successful
  database.on('error', (error)=>{
      console.log(error)
  })
  database.once('connected', ()=>{
      console.log("database connected")
  })

// rendering pages
app.get('/', async(req,res)=>{
  try {
    const products= await Product.find({})
    const gadgets= products.filter(product => product.catergory.toString() === 'accessories');
    const books= products.filter(product => product.catergory.toString() === 'books');
    res.render('home', {books: books, gadgets: gadgets})
  } catch (error) {
    res.status(500).send({error: error.message})
  }
})
app.get('/bookstore', async(req,res)=>{

  try {
    const products= await Product.find({})
    const books= products.filter(product => product.catergory.toString() === 'books');
    res.render('bookstore', {books: books})
  } catch (error) {
    res.status(500).send({error: error.message})
  }
})
app.get('/gadgetstore', async(req,res)=>{
  try {
    const products= await Product.find({})
    const gadgets= products.filter(product => product.catergory.toString() === 'accessories');
    res.render('gadgetstore', {gadgets: gadgets})
  } catch (error) {
    res.status(500).send({error: error})
  }
})
app.get('/shoppingCart', (req,res)=>{
  res.render('shoppingCart', {})
})

// rendering and perfoming functions responsible for admins
app.get('/admin',(req,res)=>{
  res.render('adminLogin', {message: ""})
})

app.get('/add-remove-products',async(req,res)=>{
  const cookie=req.cookies.token

  try {
               // finding the user infomation stored in the cookie
  //decoding the token to get the user infomation
  let decode = jwt.verify(cookie, 'secret-key');
  if (!decode){
    return res.render('adminLogin', {message: 'your session has expired'});}
    try {
      const products= await Product.find({})
      const books= products.filter(product => product.catergory.toString() === 'books');
      const gadgets= products.filter(product => product.catergory.toString() === 'accessories');
      res.render('adminAddProducts', {gadgets: gadgets, books:books})
    } catch (error) {
      res.status(500).send({error: error.message})
    }
  } catch (error) {
    res.render('adminLogin', {message: 'your session has exprired'})
  }

})

app.post('/admin-login',async(req,res)=>{
  const {adminName,password}= req.body;

  Admin.findOne({adminName})
  .then(admin =>{
    if(!admin){
      return res.render('adminLogin', {message: 'wrong Admin name, Try again'})
    }

    if(admin.password === password){
          // creating a JWT token
    const secret= 'secret-key'
    const token= jwt.sign({ id: admin._id}, secret, {expiresIn: '2h'});
    // setting the JWT token in a cookie
    res.cookie('token', token, { httpOnly: true, sameSite: 'strict' });
    //rendering the home page
    return res.status(200).redirect('/admin-home');
  }else{
    return res.render('adminLogin' , {message: "incorrect password"});
  }
  })
})
app.get('/admin-home',async(req,res)=>{
let cookie= req.cookies.token;

  try {
       // finding the user infomation stored in the cookie
  //decoding the token to get the user infomation
  let decode = jwt.verify(cookie, 'secret-key');
  if (!decode){
    return res.render('adminLogin', {message: 'your session has expired'})
  }
  try {
    const products= await Product.find({})
    const books= products.filter(product => product.catergory.toString() === 'books');
    const gadgets= products.filter(product => product.catergory.toString() === 'accessories');
    res.render('adminHome', {
      books, 
      gadgets
    })
  } catch (error) {
    res.status(500).send({error: error.message})
  }
  } catch (error) {
    res.render('adminLogin', {message: 'your session has exprired'})
  }
})
app.post('/delete',async(req,res)=>{
  const id = await req.body.id;
  try {
    Product.deleteOne({_id: id}, (err)=>{
      if (err) throw err;
          console.log('item deleted')
          res.redirect('/add-remove-products')
      })
  } catch (error) {
    res.status(500).send({error: error.message})
  }
})

app.post('/add-product',async(req,res)=>{
const {productImage,productName,price,instock,sumarryDescription,fullDescription,catergory}=req.body;
try {
      // creating a new package
const product= new Product({
  productName: productName,
  productImage: productImage,
  price:price,
  instock:instock,
  sumarryDescription: sumarryDescription,
  fullDescription:fullDescription,
  catergory:catergory 
})
//save to the database
product.save((err)=>{
   if(err) throw err;
res.status(200).redirect('/add-remove-products')
})
} catch (error) {
  res.status(500).redirect('/add-remove-products')
}
})

app.post('/update-product', (req,res)=>{
  const productId= req.body.productId;
  const price= req.body.price;
  const instock= req.body.instock;
  const sumarryDescription= req.body.sumarryDescription
  const fullDescription= req.body.fullDescription;

  try {
    Product.findOne({_id:productId},(err,object)=>{
      if(err){
        res.status(500);
      }else {
        object.price = price;
        object.instock= instock;
        object.sumarryDescription= sumarryDescription
        object.fullDescription= fullDescription;
        object.save(function(err){
            if (err){
                res.sendStatus(500)
                console.error(err)
            }else {
               res.status(200).redirect('/admin-home')
               console.log('item updated')
            }
        })
    }
    })
  } catch (error) {
    res.status(500).redirect('/admin-login')
  }
})

// set up the paypal SDK with my api credentials
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AYwYZhlymxQs9G11rnka3eLYEQyw66IiWPCoNRZpDOv4OcnJp7hJMgsFz_H5wyI83v2uY2dFGizDF4lQ',
  'client_secret': 'EK6RGKeQhG1Pg_6dXmJft9DXNrebIyXS0wXEGgLd3IMohcxMR_4lqFX7MlbFgrinP-FLki-J2DVG2tim'
});

//endpoint to receive payment information from the client side
app.post('/pay', (req,res)=>{
  // get the product information from the client side
  const products_object_as_string= req.body.products;
  const products= JSON.parse(products_object_as_string);

  // create a payment object with the paypal sdk
  const create_payment_json={
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls":{
      "return_url": "/success",
      "cancel_url": "/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": products.map(product =>({
          "name": product.name,
          "price": product.price,
          "productId": product.productId,
          "currency": "USD",
        }))
      },
      "amount":{
        "currency": "USD",
        "total": products.reduce((acc, curr)=> acc+ curr.price, 0)
      }, 
      "description": "payment for products"
    }]
  };
  //send the payment object to PAYPAL for proccessing
  paypal.payment.create(create_payment_json, function(error, payment){
    if(error){
      console.log(error)
    }else{
      //redirect the user to the PAYPAL payment page
      for(let i=o; i< payment.links.length; i++){
        if(payment.links[i].rel === 'approval_url'){
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

app.get('/success',(req,res)=>{
  const payerId = req.query.PayerID;
  const paymentId= req.query.paymentId;
  const products= JSON.parse(localStorage.getItem('cartItems'));

  //verify the payment was successful
  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": products.reduce((acc, cur)=>acc+ cur.price)
      }
    }]
  }
  res.render('shoppingCart')
})

app.listen(port, () => {
 console.log('Server is up on port'+ port)
})
