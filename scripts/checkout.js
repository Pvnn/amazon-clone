import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderCartSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/car.js';
//import '../data/backend-practice.js';

async function loadPage() {
  try{
    //throw 'error1'

    await loadProductsFetch();
    const value = await new Promise((resolve) => {
      //throw 'error2';
      loadCart( () => {
        resolve('value3');
      });
    });

  }catch (error) {
    console.log(`Unexpected error. Please try again later`);
  }

  renderCartSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}
loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart( () => {
      resolve();
    });
  })

]).then( (values) => {
  console.log(values);

  renderCartSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/
/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart( () => {
      resolve();
    });
  });

}).then(() => {
  renderCartSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/

/*
loadProducts( () => {
  loadCart( () => {
    renderCartSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
  });
});
*/