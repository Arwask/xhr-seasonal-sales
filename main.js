
let products = null;
let categories = null;

function buildDOMObj()
{
	let productArr = products.map( function(currentProduct)
	{
		// inside this loop we need to loop again through categories to find the category whose id matched cat_id of current prod. may be a filter. Returned array will contain one object. we can set dept on new obj we are making with the "name " property.
		let catItem = categories.filter( function(category)
		{
			return category.id === currentProduct.category_id;
		})
		let prodObj ={
					dept: catItem[0].name, 
					name: currentProduct.name, 
					price: currentProduct.price, 
					category_id: currentProduct.category_id, 
					discount: catItem[0].discount
					};
		prodObj.discountedPrice = calculateDiscount(prodObj);
		return prodObj; 
	})
	console.log("product array", productArr);
	displayProducts(productArr);
}

function calculateDiscount(productArray)
{
	let discount = productArray.price -(productArray.discount * productArray.price);
	return +discount.toFixed(2);
}

function buildCard(prodObj)
{
	let card = `<div class="prodCard" data-catId= ${prodObj.category_id}>
					<h2>${prodObj.name}</h2>
					<h3>${prodObj.dept}</h3>
					<p>${prodObj.price}</p>
					<p class = "isHidden">${prodObj.discountedPrice}</p>
				</div>`;
	return card;
}

let container = document.getElementById('product-container');
function displayProducts(productArr)
{
	let cardArray = productArr.map( function(product)
	{
		return buildCard(product);
	});
	console.log("cardArray",cardArray);
	cardArray.forEach( function(card)
	{
		let cardWrapper = document.createElement('article');
		cardWrapper.innerHTML = card;
		container.appendChild(cardWrapper);
	});
}


document.getElementById('dropdown').addEventListener("change", function()
{
	//grab the value lowercase it and compare it to the categories data to find correct discount.
	let selectedSeason = event.target.value;
	let seasonCategory = categories.filter( function(category)
	{
		return category.season_discount.toLowerCase() === selectedSeason.toLowerCase();
	});
	let catId = seasonCategory[0].id;
	let prodCards = document.getElementsByClassName('prodCard');
	for(let i=0; i<prodCards.length; i++)
	{
		if(parseInt(prodCards[i].getAttribute("data-catId")) === catId)
		{
			console.log("product card", prodCards[i]);
			let pTags = prodCards[i].getElementsByTagName('p');
			for(let i=0; i<pTags.length; i++)
			{
				pTags[i].classList.toggle('isHidden');
			}
		}
	}
})

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