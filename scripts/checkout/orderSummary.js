import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js"
import {getProduct, products} from "../../data/products.js"
import { convertCurrency } from "../util.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderCartSummary(){
  let cartSummaryHTML = "";
  cart.forEach((cartItem) =>{
    const matchingProduct = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    const dateString = calculateDeliveryDate(deliveryOption);
    cartSummaryHTML+=`
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${cartItem.productId}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src= ${matchingProduct.image}>

          <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}">
              ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id = "${cartItem.productId}">
                Update
              </span>
              <input class="quantity-input js-quantity-input-${cartItem.productId}" >
              <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id = "${cartItem.productId}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id = "${cartItem.productId}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(cartItem)}
          </div>
        </div>
      </div>

    `
  });
  // -------------------Adding Event Listeners---------------
  document.body.querySelector(".js-order-summary").innerHTML= cartSummaryHTML;
  document.body.querySelectorAll('.js-delete-link').forEach((link) =>{link.addEventListener("click", () =>{
    const {productId} = link.dataset;
    removeFromCart(productId);
    /*
    const container = document.body.querySelector(`.js-cart-item-container-${productId}`);
    container.remove(); //Removed to use MVC to update the page instead of DOM
    */
    renderCheckoutHeader();
    renderCartSummary();
    renderPaymentSummary();
  })
  })
  document.body.querySelectorAll(".js-update-quantity-link").forEach( (link) => {
    link.addEventListener("click", () => {
      const {productId} = link.dataset;
      const container = document.body.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.add("is-editing-quantity");
    });
  });
  document.body.querySelectorAll(".js-save-quantity-link").forEach((link) =>{
    link.addEventListener("click", () => {
      const {productId} = link.dataset;
      const container = document.body.querySelector(`.js-cart-item-container-${productId}`);
      const quantity = Number(document.body.querySelector(`.js-quantity-input-${productId}`).value);
      updateQuantity(productId, quantity);
      container.classList.remove("is-editing-quantity");
      //const currqty = Number(document.body.querySelector(`.js-quantity-label-${productId}`).innerHTML);
      //document.body.querySelector(`.js-quantity-label-${productId}`).innerHTML= `${quantity}`;
      renderCheckoutHeader();
      renderCartSummary();
      renderPaymentSummary();
    })
  })

  document.body.querySelectorAll('.js-delivery-option-input').forEach((option) => {
    option.addEventListener('click', () => {
      const {productId, deliveryOptionId} = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderCartSummary();
      renderPaymentSummary();
    })
  });

  // -----------------------Functions-------------------------
  function deliveryOptionsHTML(cartItem){
    let html ="";
    deliveryOptions.forEach((deliveryOption) =>{
      const dateString = calculateDeliveryDate(deliveryOption);
      const priceString = deliveryOption.priceCents===0
        ? 'FREE'
        : `$${convertCurrency(deliveryOption.priceCents)} -`;
      const isChecked = cartItem.deliveryOptionId === deliveryOption.id;
      html += `
        <div class="delivery-option js-delivery-option-${cartItem.productId}-${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input js-delivery-option-input 
            js-delivery-option-input-${cartItem.productId}-${deliveryOption.id}"
            data-product-id = "${cartItem.productId}"
            data-delivery-option-id = "${deliveryOption.id}"
            name="delivery-option-${cartItem.productId}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  }
}