var products = []
var productsInCart = []
var cartSum = 0;
var cartAmount = 0;

const cart = document.querySelector("#cartList");

document.querySelector("#navBar__basket").addEventListener("click", (elem) => {
    window.location.pathname = 'home.html'
});


function getLocalStorage(){
    products = localStorage.getItem('products');
    products = JSON.parse(products);
    productsInCart = localStorage.getItem('cartProducts');
    productsInCart = JSON.parse(productsInCart);
    let cartItemAmountLocalStorage = localStorage.getItem('cartItemAmount')
    cartAmount = cartItemAmountLocalStorage
    console.log(cartAmount)
    if (cartAmount > 0){
      document.querySelector("#cartSum").style.display = "block";
      document.querySelector("#cartScreen__emptyCartMessage").style.display = "none";
    }
    else{
      document.querySelector('.basket__numberContainer').style.display = 'none'
      document.querySelector("#cartSum").style.display = "none";
    }
}

function setCartProducts(){
  let newItem;
  for(productId in productsInCart){
    let cartProductId = productsInCart[productId];
    newItem = `<li class="list-group-item container">
        <div class="row productList__cartItem">
          <div class="col-4">
            <img
              class="cartItem__img"
              src="${products[cartProductId].image}"
              alt=""
            />
          </div>
          <div class="col-5">
            <span class="cartItem__name"
              >${products[cartProductId].title}</span>
          </div>
          <div class="col-3">
            <span class="cartItem__prize">$${
              products[cartProductId].price
            }</span>
          </div>
        </div>
      </li>`;
    cart.innerHTML += newItem;
    cartSum += products[cartProductId].price
  }
  document.querySelector('.basket__number').innerHTML = cartAmount;
  document.querySelector('.cartSum__prizeSum').innerHTML = '$' + cartSum;
}


function setupCart(){
    getLocalStorage()
    setCartProducts()
}


setupCart()