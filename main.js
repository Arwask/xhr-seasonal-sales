

//get products
function displayProducts()
{
	let productArray = JSON.parse(event.target.responseText).products;
	console.log(productArray);
}

function displayCategories()
{
	let catArray = JSON.parse(event.target.responseText).categories;
	console.log(catArray);
}

function getCategories()
{
	let reqCategories = new XMLHttpRequest();
	reqCategories.addEventListener("load", displayCategories)
	reqCategories.open("GET","data/categories.json");
	reqCategories.send();	
}

function getProducts()
{
	let reqProduct = new XMLHttpRequest();
	reqProduct.addEventListener("load",displayProducts )
	reqProduct.open("GET","data/products.json");
	reqProduct.send();
}

getProducts();
getCategories();
//get categories