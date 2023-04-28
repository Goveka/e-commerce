let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

cartItems.forEach((product, index)=>{
let shoppingCart= document.getElementById('shoppingCart');
let div= document.createElement('div');
div.className= "cartProduct";
div.id= product.productId
div.innerHTML= `<h3>${product.name}</h3> <img src="${product.image}"/> <p id="price">${product.price}</p><button class="removeFromCart">remove</button>`
shoppingCart.appendChild(div);

let removeFromCart=document.querySelectorAll(".removeFromCart");
div.dataset.index= index
removeFromCart.forEach((remove)=>{
    remove.addEventListener('click', removeCartItem)
})
});

// setting the sum of the cart
let cartTotal= cartItems.map((value)=>{
    return parseFloat(value.price)
})
let sumOfCart= cartTotal.reduce((a,b)=>{
    return a + b
}, 0);


let total= document.getElementById('total');
total.innerText=Math.floor(sumOfCart);

// removing the cart item function
function removeCartItem(e) {
    let product= e.target.parentElement;
    const index= product.dataset.index;
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    window.location.reload();   
}

// sending the cart items to the server for payment proccessing
const checkout=document.getElementById('chackout');
checkout.addEventListener('click', (e)=>{
    const request=new XMLHttpRequest();
    request.open('Post', '/delete-objects');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(`products=${JSON.stringify(cartItems)}`);
})