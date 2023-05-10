# In-Cart Upsell Service

This is a custom built feature which will observe which products a user has viewed as they browse the website and then by the time 
they reach the checkout it will then attempt to identify the best possible upsell opportunity as determined by our algorithm.

Consider using the following code inside the browser's developer console to interact with the service.

```js
const testHelper = {
  installScript: () => {
    let randomString = (Math.random() + 1).toString(36).substring(7);
    const upsellScript = document.createElement('script');
    upsellScript.type = "module";
    upsellScript.src = `https://storage.googleapis.com/boom-demo/index.js?version=${randomString}`;
    document.body.insertAdjacentElement('beforeend', upsellScript);
  },
  productView: () => {
    window.looptimize.registerProductView();
  },
  showInCart: async () => {
    await window.looptimize.checkTestEligibility();
    const upsellComponent = document.createElement('incart-upsell');
    const cartSection = document.getElementById('shopify-section-template--14574067187825__cart-footer');
    cartSection.insertAdjacentElement('afterend', upsellComponent);
  },
  resetData: () => {
    window.localStorage.removeItem('looptimize_icu');
    window.sessionStorage.removeItem('in_cart_promo');
  }
}
```