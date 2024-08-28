import { renderCartSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";
describe('test suite : renderCartSummary', () => {

  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const productName1 = "Black and Gray Athletic Cotton Socks - 6 Pairs";
  const productName2 = "Intermediate Size Basketball";
  const productPrice1 ="$10.90";
  const productPrice2 ="$20.95";

  beforeAll((done)=> {
    loadProductsFetch().then(() => {
      done();
    });
  });

  beforeEach(() =>{
    spyOn(localStorage, 'setItem');

    document.body.querySelector('.js-test-container').innerHTML= `
      <div class="js-order-summary"></div>
      <div class="js-checkout-header"></div>
      <div class="js-payment-summary"></div>
    `;
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([ 
        { productId: productId1, quantity: 2 , deliveryOptionId : '1' }, 
        { productId: productId2, quantity: 1, deliveryOptionId : '1'} 
      ]);
    }); // Replaces localSorage.getItem with a fake method
    loadFromStorage();

    renderCartSummary();
  });


  afterEach(() =>{
    document.body.querySelector('.js-test-container').innerHTML= ``;
  });


  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    expect(
      document.body.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual(productName1);

    expect(
      document.body.querySelector(`.js-product-name-${productId2}`).innerText
    ).toEqual(productName2);

    expect(
      document.body.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual(productPrice1);

    expect(
      document.body.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual(productPrice2);

  });
  

  it('removes a product', ()=> {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  })

  it('updates delivery option', () => {
    document.body.querySelector(`.js-delivery-option-input-${productId1}-3`).click();
    expect(
      document.body.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
    ).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(
      document.body.querySelector(`.js-shipping-money`).innerText
    ).toEqual('$9.99');
    expect(
      document.body.querySelector(`.js-total-money`).innerText
    ).toEqual('$58.01');
  });
});