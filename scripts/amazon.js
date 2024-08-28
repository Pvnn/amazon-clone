//------------- Global state variables ---------
import {products, loadProducts} from "../data/products.js"
import {cart, addToCart, calculateCartQuantity} from "../data/cart.js"
import { convertCurrency } from "./util.js";

loadProducts(renderProductsGrid);

function renderProductsGrid(){
  let productsHTML='';
  const addedMessageTimeouts = {};
  updateCartQuantity(cart);
  products.forEach( (product)=>
  {
    productsHTML += `
      <div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src="${product.image}">
              </div>

              <div class="product-name limit-text-to-2-lines">
                ${product.name}
              </div>

              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>

              <div class="product-price">
                ${product.getPrice()}
              </div>

              <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>

              ${product.extraInfoHTML()}

              <div class="product-spacer"></div>

              <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
              </div>

              <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
                Add to Cart
              </button>
            </div>
      `
  })

  // ------------ Adding Event Listeners ------------
  document.body.querySelector(".products-grid").innerHTML=productsHTML;
  document.body.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
    button.addEventListener("click", handleAddToCartClick)
  })

  // ------------ Function Definitions -------------
  function displayAddedMessage(productId){
    const addedMessage = document.body.querySelector(`.js-added-to-cart-${productId}`);
    addedMessage.classList.add("after-added-to-cart");
    const previousTimeoutId = addedMessageTimeouts[productId];
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('after-added-to-cart');
    }, 2000);

    // Save the timeoutId for this product
    // so we can stop it later if we need to.
    addedMessageTimeouts[productId] = timeoutId;
  }

  function updateCartQuantity(cart){
    const totqty= calculateCartQuantity(cart); 
    document.body.querySelector(".js-cart-quantity").innerHTML= totqty;
  }

  function handleAddToCartClick(event){
    const button= event.target;
    const {productId} = button.dataset; //destructuring shortcut for const productId = button.dataset.productId
    const selector = document.body.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = parseInt(selector.value);
    addToCart(productId, quantity)
    updateCartQuantity(cart);
    displayAddedMessage(productId);
  }
}