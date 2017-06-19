let reqProduct = new XMLHttpRequest();
let reqCategories = new XMLHttpRequest();

function displayProducts()
{
	let productArray = JSON.parse(event.target.responseText).products;
	console.log(productArray);
}


reqProduct.addEventListener("load", displayProducts)

reqProduct.open("GET","data/products.json");
reqProduct.send();
reqCategories.open("GET","data/categories.json");
reqCategories.send();
