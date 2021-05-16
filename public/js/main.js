var productsInfo = [];

category = "men's clothing"

url = 'https://fakestoreapi.com/products/category/' + category;

fetch(url)
  .then((res) => res.json())
  .then((json) => {
    console.log("Datos cargados correctamente");
    console.log(json);
    for (product of json) {
      productsInfo.push(product);
      console.log(product);
    }
    localStorage.setItem("products", JSON.stringify(productsInfo))
    localStorage.setItem("cartItemAmount", 0) //Inicializo la cantidad de productos en cero

    window.location.pathname = 'home.html' //Voy al home
  }).catch((error) => {
    console.log('API Error')
  })


