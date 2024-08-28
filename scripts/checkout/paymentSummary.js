import { calculateCartQuantity, cart } from "../../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { convertCurrency } from "../util.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
  const cartQuantity = calculateCartQuantity(cart);
  let totPrice =0;
  let totShipping =0;
  cart.forEach(cartItem => {
    const matchingProduct = getProduct(cartItem.productId);
    totPrice += (matchingProduct.priceCents * cartItem.quantity);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    totShipping += deliveryOption.priceCents;
  })
  const totBeforeTax = totPrice+ totShipping;
  const taxAmt = totBeforeTax* 0.1;
  const orderTotal = totBeforeTax + taxAmt;
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${convertCurrency(totPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-shipping-money">$${convertCurrency(totShipping)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${convertCurrency(totBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${convertCurrency(taxAmt)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-total-money">$${convertCurrency(orderTotal)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
  `
  document.body.querySelector('.js-payment-summary').innerHTML= paymentSummaryHTML;
  document.body.querySelector('.js-place-order').addEventListener('click', async () => {
    try{
      const response = await fetch('https://supersimplebackend.dev/orders',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          cart : cart
        })
      } );
      const order = await response.json();
      addOrder(order);
    }catch(error){
      console.log('An error has occured. Try again later...');
    }

    window.location.href='orders.html';
    
  });
}