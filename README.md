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
    const cartSection = document.getElementById('MainContent');
    cartSection.insertAdjacentElement('afterBegin', upsellComponent);
  },
  resetData: () => {
    window.localStorage.removeItem('looptimize_icu');
    window.sessionStorage.removeItem('in_cart_promo');
  },
  setFakeData: () => {
    window.localStorage.removeItem('looptimize_icu);
    const fakeData = `[[45696091218,{"product":{"Name":"Boomstick Trio","ProductID":45696091218,"Categories":["All","Best Sellers","boom sticks","Boomsticks","Custom Boom Bag","Empty Cart - Recommended Products","Holiday Collections","holiday products","Holiday Savings","Holiday Store Wide","holiday-2021(1)","holiday-2021-first-1","holiday-2021-first-brow","holiday-2021-first-ny","holiday-2022-first","holiday-2022-first2","Home Slider","Makeup","Mobile App Collection","Store","Store Main","Store Order","store X","store-anniversary"],"ImageURL":"https://cdn.shopify.com/s/files/1/0404/9121/products/Boomstick_Trio_01_grande.jpg?v=1649082869","URL":"https://www.boombycindyjoseph.com/products/boomstick-trio","Brand":"BOOM! by Cindy Joseph","Price":"$79.00","CompareAtPrice":"$96.00"},"views":1}],[40025342705777,{"product":{"Name":"Boomstick Color","ProductID":40025342705777,"Categories":["All","Best Sellers","boom sticks","Boomsticks","Custom Boom Bag","Empty Cart - Recommended Products","Holiday Collections","holiday products","Holiday Savings","Holiday Store First","holiday-2022-first","holiday-2022-first2","Home Slider","Makeup","Mobile App Collection","Store","Store Main","Store Order","store X","store-anniversary"],"ImageURL":"https://cdn.shopify.com/s/files/1/0404/9121/products/Boomstick_Color_01_fc032838-d9ed-421b-b680-656ff7a88c61_grande.jpg?v=1567782097","URL":"https://www.boombycindyjoseph.com/products/boomstick-color","Brand":"BOOM! by Cindy Joseph","Price":"$28.00","CompareAtPrice":"$32.00"},"views":3}],[45696084626,{"product":{"Name":"Boomstick Glimmer","ProductID":45696084626,"Categories":["All","boom sticks","Boomsticks","Custom Boom Bag","Empty Cart - Recommended Products","Holiday Collections","holiday products","Holiday Savings","Holiday Store First","holiday-2022-first","holiday-2022-first2","Home Slider","Makeup","Mobile App Collection","Store","Store Main","Store Order","store X","store-anniversary"],"ImageURL":"https://cdn.shopify.com/s/files/1/0404/9121/products/Boomstick_Glimmer_01_5185720b-5dcd-4597-9853-73d0655ef71e_grande.jpg?v=1567782156","URL":"https://www.boombycindyjoseph.com/products/boomstick-glimmer","Brand":"BOOM! by Cindy Joseph","Price":"$28.00","CompareAtPrice":"$32.00"},"views":1}],[45696084882,{"product":{"Name":"Boomstick Glo","ProductID":45696084882,"Categories":["All","boom sticks","Boomsticks","Custom Boom Bag","Empty Cart - Recommended Products","Holiday Collections","holiday products","Holiday Savings","Holiday Store First","holiday-2022-first","holiday-2022-first2","Home Slider","Makeup","Mobile App Collection","Store","Store Main","Store Order","store X","store-anniversary"],"ImageURL":"https://cdn.shopify.com/s/files/1/0404/9121/products/Boomstick_Glo_01_f96365dc-b0bd-4221-900b-1c07d70a7daf_grande.jpg?v=1613408839","URL":"https://www.boombycindyjoseph.com/products/boomstick-glo","Brand":"BOOM! by Cindy Joseph","Price":"$28.00","CompareAtPrice":"$32.00"},"views":1}],[40124692922481,{"product":{"Name":"Boom Silver - Brightening and Toning Shampoo","ProductID":40124692922481,"Categories":["All","Custom Boom Bag","holiday products","Holiday Store Second","Skincare & Haircare","Store Order"],"ImageURL":"https://cdn.shopify.com/s/files/1/0404/9121/products/Boom_Silver_shampoo_1x1_f560fbe2-a362-45da-9785-174de7b94365_grande.jpg?v=1674592913","URL":"https://www.boombycindyjoseph.com/products/boom-silver-brightening-and-toning-shampoo","Brand":"BOOM! by Cindy Joseph","Price":"$36.00","CompareAtPrice":"$0.00"},"views":1}]]`;
    window.localStorage.setItem('looptimize_icu', fakeData);
  }
}
```