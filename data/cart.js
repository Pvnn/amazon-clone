// Initialize cart
export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart){
    cart = [ 
      { productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", quantity: 2 , deliveryOptionId : '1' }, 
      { productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d", quantity: 1, deliveryOptionId : '1'} 
    ];
  }
}

function saveToLocalStorage(cart){
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function addToCart(productId, quantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId, // shorthand for productId = productId
      quantity, // shorthand for quantity : quantity
      deliveryOptionId : '1'
    });
  }
  saveToLocalStorage(cart);
}
export function removeFromCart(productId){
  let newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId != productId){
      newCart.push(cartItem);
    }
  })
  cart = newCart;
  saveToLocalStorage(cart);
}
export function calculateCartQuantity(cart){
  let totqty= 0;
  cart.forEach((cartItem) =>{
    totqty+= cartItem.quantity;
  })
  return totqty;
}
export function updateQuantity(productId, quantity){
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity = quantity;
  }
  saveToLocalStorage(cart);
}
 
export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId == productId) {
      matchingItem = cartItem;
    }
  });
  if(matchingItem){
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToLocalStorage(cart);
  }
}


export function loadCart(fun){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () =>{
    console.log(xhr.response);

    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}