var products = []
var productsInCart = []

// Cart
var cartAmount = 0;

// Modal
var productInfoModal = document.querySelector('#myModal');
var myModal = new bootstrap.Modal(document.getElementById("myModal"));


function getLocalStorage(){
  let productsLocalStorage = localStorage.getItem('products');
  productsLocalStorage = JSON.parse(productsLocalStorage);
  let cartItemAmountLocalStorage = localStorage.getItem('cartItemAmount');
  let productsInCartLocalStorage = localStorage.getItem('cartProducts')
  if(productsInCartLocalStorage){
    productsInCart = JSON.parse(productsInCartLocalStorage)
  }
  if(!cartItemAmountLocalStorage || cartItemAmountLocalStorage=='null'){ //Si es 0 o es null porque no se especifico
    console.log('Esconder item cant');
    document.querySelector(".basket__numberContainer").style.display = "none";
  }
  cartAmount = cartItemAmountLocalStorage
  products = productsLocalStorage
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function addProductToCart(id){
    productsInCart.push(id)
}

function setFeaturedProduct() {
    //Generar numero random que es la posicion del arreglo que se parseo del local storage
    let productId = getRandomInt(0,products.length)
    document.querySelector('.homeScreen_featuredProductContainer').id = productId;
    document.querySelector('.homeScreen__featuredProduct img').src = products[productId].image;
    document.querySelector('.homeScreen__featuredProduct h2').innerHTML = products[productId].title;
    document.querySelector('.homeScreen__featuredProduct p:nth-of-type(1)').innerHTML = products[productId].description;
    document.querySelector('.homeScreen__featuredProduct p:nth-of-type(2)').innerHTML = '$' + products[productId].price;
}

function showCartNumber(){
    document.querySelector(".basket__numberContainer").style.display = "block";
}

function setAddCartListener(){
    //Agregar los listeners para agregar al carrito
    document.querySelectorAll(".addToBasketButton").forEach((elem) => {
      elem.addEventListener("click", () => {
        parentNode = elem.parentNode;
        productId = parentNode.id;
        if (cartAmount > 0){ //Solo la primera vez
            showCartNumber()
        }
        cartAmount++;
        document.querySelector('.basket__number').innerHTML = cartAmount;
        localStorage.setItem('cartItemAmount',cartAmount);
        addProductToCart(productId);
      });
    });
  }

function setProductList(){
    const parentList = document.querySelector("#homeScreen__productList");
    for (product of products) {
        const item = `
        <div id="${product.id-1}" class="productListItemContainer">
          <div class="productList__item">
            <div class="item__img">
              <img
                src="${product.image}"
                alt=""
              />
            </div>
            <h3 class="item__name">
              ${product.title}
            </h3>
            <h4 class="item__prize">$${product.price} </h4>
          </div>
          <button class="addToBasketButton">Agregar al carrito</button>
        </div>`;
        parentList.innerHTML += item;
    }
}

function setCartNumber(){
    document.querySelector('.basket__number').innerHTML = cartAmount;
}

function setupHome(){
    getLocalStorage()
    setCartNumber()
    setFeaturedProduct()
    setProductList()
    setModalListener()
    setAddCartListener()
}

document.querySelector("#navBar__basket").addEventListener("click", () => {
  localStorage.setItem("cartProducts",JSON.stringify(productsInCart))
  localStorage.setItem("cartItemAmount",cartAmount)
    window.location.pathname = 'cart.html'
});

function setModalListener() {
    //Agregar los listeners para activar el modal
    document.querySelectorAll(".productList__item, .homeScreen__featuredProduct").forEach((elem) => {
      elem.addEventListener("click", function () {
        const parentNode = elem.parentNode;
        // parentElement = elem.parentElement;
        const modalProductId = parentNode.id;
        document.querySelector(".modalItem__img").src = products[modalProductId].image;
        document.querySelector(".modalItem__title").innerHTML = products[modalProductId].title;
        document.querySelector(".modalItem__description").innerHTML = products[modalProductId].description;
        document.querySelector(".modalItem__prize").innerHTML = products[modalProductId].price;
        myModal.show();
      });
    })
  }

setupHome()