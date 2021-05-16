var products = []
var productsInCart = []

// Cart
var cartAmount = 0;

// Modal
var productInfoModal = document.querySelector('#myModal');
var myModal = new bootstrap.Modal(document.getElementById("myModal"));

document.querySelector("#navBar__basket").addEventListener("click", () => {
  localStorage.setItem("cartProducts", JSON.stringify(productsInCart)) //Al momento de pasar al carrito se actualiza el local storage
  localStorage.setItem("cartItemAmount", cartAmount) //Al momento de pasar al carrito se actualiza el local storage
  window.location.pathname = 'cart.html'
});

function getLocalStorage() {
  let productsLocalStorage = localStorage.getItem('products');
  productsLocalStorage = JSON.parse(productsLocalStorage); //Obtengo el arreglo de informacion de productos
  let cartItemAmountLocalStorage = localStorage.getItem('cartItemAmount'); //Obtengo la cantidad de productos actual del local storage
  let productsInCartLocalStorage = localStorage.getItem('cartProducts'); //Obtengo los indices de los productos que actualmente estan en el carrito
  if (productsInCartLocalStorage) { //Si habia algun producto en el carrito
    productsInCart = JSON.parse(productsInCartLocalStorage) //Se asigna a la variable
  }
  if (cartItemAmountLocalStorage == 0) { //Si todavia no se agregaron elementos al carrito
    document.querySelector(".basket__numberContainer").style.display = "none"; //Esconde el display de cantidad
  }
  cartAmount = cartItemAmountLocalStorage //Asigna la cantidad actual a la que viene del localStorage
  products = productsLocalStorage //Los productos se actualizan con lo que viene del local storage
}

function getRandomInt(min, max) { //Pequeña funcion para obtener un numero ranodom en un rango
  return Math.floor(Math.random() * (max - min)) + min;
}

function addProductToCart(id) { //Agregar el id de un producto al arreglo de productos en carrito
  productsInCart.push(id)
}

function setFeaturedProduct() {
  let productId = getRandomInt(0, products.length) //Obtengo el indice de un producto aleatorio para destacarlo
  document.querySelector('.homeScreen_featuredProductContainer').id = productId;
  document.querySelector('.homeScreen__featuredProduct img').src = products[productId].image;
  document.querySelector('.homeScreen__featuredProduct h2').innerHTML = products[productId].title;
  document.querySelector('.homeScreen__featuredProduct p:nth-of-type(1)').innerHTML = products[productId].description;
  document.querySelector('.homeScreen__featuredProduct p:nth-of-type(2)').innerHTML = '$' + products[productId].price;
}

function showCartNumber() {
  document.querySelector(".basket__numberContainer").style.display = "block"; //Mostar el numero del carrito
}

function setAddCartListener() {
  document.querySelectorAll(".addToBasketButton").forEach((elem) => {
    elem.addEventListener("click", () => {
      parentNode = elem.parentNode;
      productId = parentNode.id; //Obtengo el id del nodo padre, donde almaeno el id del producto
      if (cartAmount == 0) { //Si todavia no se agrego ninguno se muestra el numero del carrito, podria no estar el condicional pero se puede evaluar solo una vez
        showCartNumber()
      }
      cartAmount++;
      document.querySelector('.basket__number').innerHTML = cartAmount; //Poner el numero al carrito
      addProductToCart(productId); //Agregar al carrito
    });
  });
}

function setProductList() {
  const parentList = document.querySelector("#homeScreen__productList"); //Obtener padre de la lista de productos
  for (product of products) { //Para cada producto en la lista de productos traida desde localStorage
    const item = `
        <div id="${product.id - 1}" class="productListItemContainer">
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
    parentList.innerHTML += item; //Se concatena el nuevo html
  }
}

function setCartNumber() {
  document.querySelector('.basket__number').innerHTML = cartAmount;
}

function setModalListener() {
  document.querySelectorAll(".productList__item, .homeScreen__featuredProduct").forEach((elem) => {
    elem.addEventListener("click", function () {
      const parentNode = elem.parentNode;
      const modalProductId = parentNode.id;
      document.querySelector(".modal-body").id = modalProductId;
      document.querySelector(".modalItem__img").src = products[modalProductId].image;
      document.querySelector(".modalItem__title").innerHTML = products[modalProductId].title;
      document.querySelector(".modalItem__description").innerHTML = products[modalProductId].description;
      document.querySelector(".modalItem__prize").innerHTML = '$' + products[modalProductId].price;
      myModal.show();
    });
  })
}

function setupHome() {
  getLocalStorage() //Obtener datos de local Storage
  setCartNumber() //Actualizar numero del carrito
  setFeaturedProduct() //Setear el producto destacado
  setProductList() //Setear la lista de productos
  setModalListener() //Setear el listener del modal para asi activarse
  setAddCartListener() //Setear todos los botones agregar al carrito
}

setupHome()