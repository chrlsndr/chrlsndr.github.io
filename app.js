

let hamMenu = document.querySelector(".ham-menu");
let offScreenMenu = document.querySelector(".off-screen-menu");
let cartMenu = document.querySelector(".icon-cart");
let offScreenCart = document.querySelector(".cartTab");
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart')
let iconCartSpan = document.querySelector('.icon-cart span')
let checkout = document.querySelector('.checkOut')

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

cartMenu.addEventListener("click", () => {
    cartMenu.classList.toggle("active");
    offScreenCart.classList.toggle("active");
});



let listProduct = [];
let carts = []

const addDataToHTML = () => {
  listProductHTML.innerHTML = '';
  if(listProduct.length > 0){
    listProduct.forEach(products => {
      let newProduct = document.createElement('div')
      newProduct.classList.add('item');
      newProduct.dataset.id = products.id
      newProduct.innerHTML = ` 
        <img src="${products.image}">
        <h2> ${products.name}</h2>
        <div class="price">${products.price}</div>
        <button class="addCart">
            Add to Cart
        </button>
        <button class="removeCart">
                    Reset Cart
        </button>
      `;
      listProductHTML.appendChild(newProduct)
    })
  }
}

checkout.addEventListener('click', (event) => {
  carts.length = 0;
  alert("Checkout Successful, Please proceed to the store to pay and pick up your items")
  addCartToHTML();
})


listProductHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if(positionClick.classList.contains('addCart')){
    let product_id = positionClick.parentElement.dataset.id
    addToCart(product_id);
  }
})

const addToCart = (product_id) => {
  let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
  if(carts.length <= 0){
    carts = [{
      product_id: product_id,
      quantity: 1
    }]
  }else if(positionThisProductInCart < 0){
    carts.push({
      product_id: product_id,
      quantity: 1
    });
  }else{
    carts[positionThisProductInCart].quantity =  carts[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
}

listProductHTML.addEventListener('click', (event) => {
  let positionClick = event.target;
  if(positionClick.classList.contains('removeCart')){
    let product_id = positionClick.parentElement.dataset.id
    removeToCart(product_id);
  }
})

const removeToCart = (product_id) => {
  let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
  if(carts.length <= 0){
    carts = [{
      product_id: product_id,
      quantity: 1
    }]
  }else if(positionThisProductInCart == 0){
    carts.pop({
      product_id: product_id,
      quantity: 1
    });
  }else{
    carts[positionThisProductInCart].quantity =  carts[positionThisProductInCart].quantity - 1 ;
  }
  addCartToHTML();
}


const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0){
      carts.forEach(cart => {
        totalQuantity = totalQuantity + cart.quantity;
        let newCart = document.createElement('div')
        newCart.classList.add('item')
        newCart.dataset.id = cart.product_id;
        let positionProduct = listProduct.findIndex((value) => value.id == cart.product_id);
        let info = listProduct[positionProduct];
        newCart.innerHTML = `
        <div class="item">
                    <div class="image">
                        <img src="${info.image}">
                    </div>
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="totalPrice">
                        ${info.price * cart.quantity}
                    </div>
                    <div class="quantity">  
                        <span>${cart.quantity}</span>
                    </div>
                </div>
        `;
        listCartHTML.appendChild(newCart);
      })
    }
    iconCartSpan.innerText = totalQuantity;
}



const initApp = () => {
  fetch('products.json')
  .then(response => response.json())
  .then(data => {
    listProduct = data;
    addDataToHTML();
  })
}
initApp();