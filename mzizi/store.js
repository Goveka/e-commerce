//getting all the button elements
const addbutton=document.querySelectorAll(".addbutton")[0];
const dtlbutton=document.querySelectorAll(".dltbutton")[0];
//the first button
const addbutton1=document.querySelectorAll(".addbutton1")[0];
const dtlbutton1=document.querySelectorAll(".dltbutton1")[0];
//the second button
const addbutton2=document.querySelectorAll(".addbutton2")[0];
const dtlbutton2=document.querySelectorAll(".dltbutton2")[0];
//the third button
const addbutton3=document.querySelectorAll(".addbutton3")[0];
const dtlbutton3=document.querySelectorAll(".dltbutton3")[0];
//the forth button
const addbutton4=document.querySelectorAll(".addbutton4")[0];
const dtlbutton4=document.querySelectorAll(".dltbutton4")[0];
//the firth button
const addbutton5=document.querySelectorAll(".addbutton5")[0];
const dtlbutton5=document.querySelectorAll(".dltbutton5")[0];


//general elements
const wishbutton=document.querySelectorAll(".wishbutton")[0];
const cart=document.querySelectorAll(".cart")[0];
const featuredDetails=document.querySelectorAll(".featured-details")[0];
const shopping=document.querySelectorAll(".shopping")[0];
const carting=document.querySelectorAll(".carting")[0];
const wish=document.querySelectorAll(".wish")[0];
const list=document.querySelectorAll(".list")[0];
const price=document.querySelectorAll(".price")[0];
const tot=document.querySelectorAll('.total')[0];
const prc=document.querySelectorAll('.prc')[0];
let array=[];


  // add button event listener
  addbutton.addEventListener("click", event);
addbutton1.addEventListener("click", even);
addbutton2.addEventListener("click", eve);
addbutton3.addEventListener("click", every);
addbutton4.addEventListener("click", hello);
addbutton5.addEventListener("click", hi);
//the remove button
dtlbutton.addEventListener("click", remove);
dtlbutton1.addEventListener("click", remove);
dtlbutton2.addEventListener("click", remove);
dtlbutton3.addEventListener("click", remove);
dtlbutton4.addEventListener("click", remove);
dtlbutton5.addEventListener("click", remove);
//wishlist buttons both event listiner  and all its elements
const wishlist=document.querySelectorAll(".wishlist")[0];
const wishlist1=document.querySelectorAll(".wishlist1")[0];
const wishlist2=document.querySelectorAll(".wishlist2")[0];
const wishlist3=document.querySelectorAll(".wishlist3")[0];
const wishlist4=document.querySelectorAll(".wishlist4")[0];
const wishlist5=document.querySelectorAll(".wishlist5")[0];

wishlist.addEventListener("click", add);
wishlist1.addEventListener("click", add);
wishlist2.addEventListener("click", add);
wishlist3.addEventListener("click", add);
wishlist4.addEventListener("click", add);

//functions
// add button function
function event(clip) {


  let div=document.createElement("div");
  div.classList.add("todo")
  let li=document.createElement("li");
  li.classList.add("to")
  div.appendChild(li)
  shopping.appendChild(div);
  let priceDiv=document.createElement('div');
  let listItem=document.createElement('ul');
  priceDiv.appendChild(listItem)
  price.appendChild(priceDiv)

  li.innerHTML="product1";
  listItem.innerHTML=49.00;
  array.push(49.00);
  let sum=array.reduce((a, b) => {
    return a+b;
  }, 0)
  tot.innerHTML=sum;

};
function even(hip) {


  let div=document.createElement("div");
  div.classList.add("todo")
  let li=document.createElement("li");
  li.classList.add("to")
  div.appendChild(li)
  shopping.appendChild(div);

  let priceDiv=document.createElement('div');
  let listItem=document.createElement('ul');
  priceDiv.appendChild(listItem)
  price.appendChild(priceDiv)

  li.innerHTML="product2";
listItem.innerHTML=35;
array.push(35);
let sum=array.reduce((a, b) => {
  return a+b;
}, 0)
tot.innerHTML=sum

}
function eve(hop) {


  let div=document.createElement("div");
  div.classList.add("todo")
  let li=document.createElement("li");
  li.classList.add("to")
  div.appendChild(li)
  shopping.appendChild(div);

  let priceDiv=document.createElement('div');
  let listItem=document.createElement('ul');
  priceDiv.appendChild(listItem)
  price.appendChild(priceDiv)

  li.innerHTML="product3";
  listItem.innerHTML=30;
  array.push(30);
  let sum=array.reduce((a, b) => {
    return a+b;
  }, 0)
  tot.innerHTML=sum

}
function every(tic) {


  let div=document.createElement("div");
  div.classList.add("todo")
  let li=document.createElement("li");
  li.classList.add("to")
  div.appendChild(li)
  shopping.appendChild(div);

  let priceDiv=document.createElement('div');
  let listItem=document.createElement('ul');
  priceDiv.appendChild(listItem)
  price.appendChild(priceDiv)

  li.innerHTML="product4";
  listItem.innerHTML=25;
  array.push(25);
  let sum=array.reduce((a, b) => {
    return a+b;
  }, 0)
  tot.innerHTML=sum


}
function hello(tac) {


  let div=document.createElement("div");
  div.classList.add("todo")
  let li=document.createElement("li");
  li.classList.add("to")
  div.appendChild(li)
  shopping.appendChild(div);

  let priceDiv=document.createElement('div');
  let listItem=document.createElement('ul');
  priceDiv.appendChild(listItem);
  price.appendChild(priceDiv);
  li.innerHTML="product5";
  listItem.innerHTML=20.00
  array.push(20);
  let sum=array.reduce((a, b) => {
    return a+b;
  }, 0)
  tot.innerHTML=sum

}
function hi(toe) {


  let div=document.createElement("div");
  div.classList.add("todo")
  let li=document.createElement("li");
  li.classList.add("to")
  div.appendChild(li)
  shopping.appendChild(div);

  let priceDiv=document.createElement('div');
  let listItem=document.createElement('ul');
  priceDiv.appendChild(listItem);
  price.appendChild(priceDiv);

  li.innerHTML="product6"
  listItem.innerHTML=15;
  array.push(15);
  let sum=array.reduce((a, b) => {
    return a+b;
  }, 0)
  tot.innerHTML=sum
}

//delete button function
function remove(vall) {

let delee=shopping.lastElementChild;
delee.remove();
let move=price.lastElementChild;
move.remove();
array.pop();
tot.innerHTML=array.reduce((c,p)=>c+p);

}
//wishlist button function
function add(lip) {
  lip.target.style.backgroundColor="red";
}


//form pop up
let popUp=setTimeout(()=>{
  const form=document.querySelectorAll(".form")[0];
  form.style.display='block'
}, 5000);


function openForm() {
const form=document.querySelectorAll(".form")[0];
form.style.display='block'
}

function closeForm() {
  const form=document.querySelectorAll(".form")[0];
  form.style.display='none'

}

// shopping cart pop up
function openCart() {
const cart=document.querySelectorAll(".shop")[0];
cart.style.display='block'
}
function closeCart() {
const cart=document.querySelectorAll(".shop")[0];
cart.style.display='none'
}



//paypal buttons
paypal.Buttons({


      // Sets up the transaction when a payment button is clicked

      createOrder: function(data, actions) {

        return actions.order.create({

          purchase_units: [{

            amount: {

              value: document.getElementById('total').innerHTML // Can reference variables or functions. Example: `value: document.getElementById('...').value`

            }

          }]

        });

      },


      // Finalize the transaction after payer approval

      onApprove: function(data, actions) {

        return actions.order.capture().then(function(orderData) {

          // Successful capture! For dev/demo purposes:

              console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

              var transaction = orderData.purchase_units[0].payments.captures[0];

              alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');


          // When ready to go live, remove the alert and show a success message within this page. For example:

           var element = document.getElementById('paypal');

           element.innerHTML = 'thank you';

           element.innerHTML = '<h3>Thank you for your payment!</h3>';

         //  Or go to another URL:  actions.redirect('thank_you.html');

        });

      }

    }).render('#paypal');
