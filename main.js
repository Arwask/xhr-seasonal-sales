
let products = null;
let categories = null;
//get products

function buildDOMObj()
{
	//TODO: loop through products and categories to grab Prod name, Dept, Price and Category ID
	let productArr = products.map( function(prod)
	{
		// inside this loop we need to loop again through categories to find the category whose id matched cat_id of current prod. may be a filter. Returned array will contain one object. we can set dept on new obj we are making with the "name " property.
		let catItem = categories.filter( function(category)
		{
			return category.id === prod.category_id;
		})
		let prodObj = {dept : catItem[0].name};
		return prodObj; 
	})
	console.log("product array", productArr);
}
function buildCard(prodObj)
{
	let card = `<div class="prodCard">
					<h2>${prodObj.name}</h2>
					<h3>${prodObj.dept}</h3>
					<p>${prodObj.price}</p>
				</div>`;
	return card;
}

function setProducts()
{
	products = JSON.parse(event.target.responseText).products;
	getCategories();
}
function setCategories()
{
	categories = JSON.parse(event.target.responseText).categories;
	buildDOMObj();
}

function getCategories()
{
	let reqCategories = new XMLHttpRequest();
	reqCategories.addEventListener("load", setCategories)
	reqCategories.open("GET","data/categories.json");
	reqCategories.send();	
}

function getProducts()
{
	let reqProduct = new XMLHttpRequest();
	reqProduct.addEventListener("load",setProducts )
	reqProduct.open("GET","data/products.json");
	reqProduct.send();
}

getProducts();