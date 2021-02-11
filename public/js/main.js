var productsInfo = [];

fetch("https://fakestoreapi.com/products/category/men clothing")
  .then((res) => res.json())
  .then((json) => {
    console.log("Datos cargados correctamente");
    for (product of json) {
      productsInfo.push(product);
    }
    localStorage.setItem("products",JSON.stringify(productsInfo))
    localStorage.setItem("cartItemAmount",0) //Inicializo la cantidad de productos en cero
    window.location.pathname = 'home.html' //Voy al home
  })
