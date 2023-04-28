const addToCartBtn= document.querySelectorAll(".addToCartBtn");

addToCartBtn.forEach((add)=>{
  add.addEventListener('click', (e)=>{
    // checking if the available stock is greater than zero
let instock=e.target.previousElementSibling.previousElementSibling.lastElementChild.innerText;
let instockAsNumber=parseFloat(instock)
if(instockAsNumber <= 0){
  alert("out of stock for this product, cant add it to the shopping cart😞😢")
}else{
// getting the shopping cart element by id
const shoppingCart= document.getElementById("shoppingCart");
// getting product details to add to the shopping cart
let productName= e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
let price=e.target.previousElementSibling.previousElementSibling.previousElementSibling.lastElementChild.innerText;
let productImage=e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.src;
let productId=e.target.parentElement.id;


//saving cart information into local storage
const cartItem= {
  name: productName,
  image: productImage,
  price: price,
  productId: productId,
}

// get existing  cart item from local storage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

//add new cart item to the array
cartItems.push(cartItem);
// save and update cart in the local storage
localStorage.setItem('cartItems', JSON.stringify(cartItems));

let numberOfItemsInCart= document.getElementById('numberOfItemsInCart');
numberOfItemsInCart.innerText=cartItems.length;
}
})
})
// getting the number of items in the cart
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let numberOfItemsInCart= document.getElementById('numberOfItemsInCart');
numberOfItemsInCart.innerText=cartItems.length;
