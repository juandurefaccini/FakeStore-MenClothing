var myModal = new bootstrap.Modal(document.getElementById("myModal"));
var modal = document.getElementById("myModal");
var productsInfo = [];

// (4) ["electronics", "jewelery", "men clothing", "women clothing"]0: "electronics"1: "jewelery"2: "men clothing"3: "women clothing"length: 4__proto__: Array(0)

// var category = "men clothing";

var modalImg;
var modalTitle;
var modalDescription;
var modalPrize;

document.querySelector("#cartSum").style.display = "none";
document.querySelector(".basket__numberContainer").style.display = "none";

var priceSum = 0;
var cartAmount = 0;

function addProductToCart(productId) {
  const cart = document.querySelector("#cartList");
  console.log('Producto solicitado para carrito'+ productId)
  const newItem = `<li class="list-group-item container">
      <div class="row productList__cartItem">
        <div class="col-4">
          <img
            class="cartItem__img"
            src="${productsInfo[productId].image}"
            alt=""
          />
        </div>
        <div class="col-5">
          <span class="cartItem__name"
            >${productsInfo[productId].title}</span>
        </div>
        <div class="col-3">
          <span class="cartItem__prize">$${
            productsInfo[productId].price
          }</span>
        </div>
      </div>
    </li>`;
  cart.innerHTML += newItem;
  
  priceSum += productsInfo[productId].price;
  updatePrice();
}

function updatePrice() {
  document.querySelector(".cartSum__prizeSum").innerHTML = "$" + priceSum;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function setModalListener() {
  //Agregar los listeners para activar el modal
  document.querySelectorAll(".productList__item, .homeScreen__featuredProduct").forEach((elem) => {
    elem.addEventListener("click", function () {
      const parentNode = elem.parentNode;
      // parentElement = elem.parentElement;
      const modalProductId = parentNode.id;
      console.log('productId para modal' + modalProductId)
      productImg = productsInfo[modalProductId].image;
      productTitle = productsInfo[modalProductId].title;
      productDescription = productsInfo[modalProductId].description;
      productPrize = productsInfo[modalProductId].price;
      myModal.show();
    });
  })
}

function setAddCartListener(){
  //Agregar los listeners para agregar al carrito
  document.querySelectorAll(".addToBasketButton").forEach((elem) => {
    console.log(elem.parentNode)
    elem.addEventListener("click", () => {
      parentNode = elem.parentNode;
      // parentElement = elem.parentElement;
      productId = parentNode.id;
      console.log('productId: '+productId)
      //Si todavia no se agregaron productos se borra el mensaje de queno hay productos y se muestra el numero de elementos
      cartAmount++;
      if (cartAmount > 0) {
        document.querySelector(".basket__numberContainer").style.display = "block";
        document.querySelector("#cartSum").style.display = "block";
        document.querySelector("#cartScreen__emptyCartMessage").style.display =
          "none";
      }
      //se actualiza el numero de elementos
      document.querySelector('.basket__number').innerHTML = cartAmount;
      addProductToCart(productId);
    });
  });
}

function setFeaturedProduct() {
  //Generar numero random, se incrementa en 1 porque cuando queres agregar al carrito trabaja asi
  productId = getRandomInt(0,productsInfo.length)
  console.log('Producto elegido como destacado '+productId)
  document.querySelector('.homeScreen_featuredProductContainer').id = productId;

  console.log('despues del set ' + document.querySelector('.homeScreen__featuredProduct').product_id)

  document.querySelector('.homeScreen__featuredProduct img').src = productsInfo[productId].image;

  document.querySelector('.homeScreen__featuredProduct h2').innerHTML = productsInfo[productId].title;

  document.querySelector('.homeScreen__featuredProduct p:nth-of-type(1)').innerHTML = productsInfo[productId].description;

  document.querySelector('.homeScreen__featuredProduct p:nth-of-type(2)').innerHTML = '$' + productsInfo[productId].price;
}



fetch("https://fakestoreapi.com/products/category/men clothing")
  .then((res) => res.json())
  .then((json) => {
    //Agregar elementos cargados
    console.log("Datos cargados correctamente");
    const parentList = document.querySelector("#homeScreen__productList");
    for (product of json) {
      productsInfo.push(product);
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
    setFeaturedProduct();
    setModalListener();
    setAddCartListener();
  })

modal.addEventListener("show.bs.modal", () => {
  document.querySelector(".modalItem__img").src = productImg;
  document.querySelector(".modalItem__title").innerHTML = productTitle;
  document.querySelector(
    ".modalItem__description"
  ).innerHTML = productDescription;
  document.querySelector(".modalItem__prize").innerHTML = "$ " + productPrize;
});

document.querySelector("#navBar__basket").addEventListener("click", (elem) => {
  if (document.querySelector("#cartScreen").style.display === "block") {
    document.querySelector("#cartScreen").style.display = "none";
    document.querySelector("#homeScreen").style.display = "block";
  } else {
    document.querySelector("#cartScreen").style.display = "block";
    document.querySelector("#homeScreen").style.display = "none";
  }
});
