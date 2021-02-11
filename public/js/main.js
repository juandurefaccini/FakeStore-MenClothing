// var myModal = new bootstrap.Modal(document.getElementById("myModal"));
var productsInfo = [];

fetch("https://fakestoreapi.com/products/category/men clothing")
  .then((res) => res.json())
  .then((json) => {
    //Agregar elementos cargados
    console.log("Datos cargados correctamente");
    // const parentList = document.querySelector("#homeScreen__productList");
    for (product of json) {
      productsInfo.push(product);
    }
    localStorage.setItem("products",JSON.stringify(productsInfo))
    localStorage.setItem("cartItemAmount",0)
    window.location.pathname = 'home.html'
  })
