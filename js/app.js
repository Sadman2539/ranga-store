// controlSpinner function call 
const controlSpinner = (isTrue) => {
  if (isTrue) {
    document.getElementById('spinner').style.display = 'block';
  }
  else {
    document.getElementById('spinner').style.display = 'none';
  }
}

// loadProducts function declaration 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
// loadProducts function call 
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  // const allProducts = products.map((pd) => pd);
  for (const product of products) {
    // starsPercentage function call 
    const starsPercentage = getRatingStars(product.rating.rate);

    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <p class="fw-bold text-center">${product.title.slice(0, 50)}</p>
      <p>Category: ${product.category}</p>
      <h5 id="product-price">Price: $${product.price}</h5>
      <div class="stars-outer">
          <div class="stars-inner" style="width:${starsPercentage};"></div>
          </div>
      <p>${product.rating.rate} (${product.rating.count} Ratings)</p>
      <div>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button type="button" onclick="loadProductDetails(${product.id})"  class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);

    // controlSpinner function call 
    controlSpinner(false);
  }
};


let count = 0;
//--------------------- addToCart function declaration --------------------//
const addToCart = (id, price) => {
  // products count update 
  count = count + 1;
  document.getElementById("total-Products").innerText = count;

  // updatePrice function call 
  updatePrice("price", price);
  // delivery-charge and tax update function call 
  updateTaxAndCharge();
  // total price update function call 
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  setInnerText(id, total);
  // document.getElementById(id).innerText = total.toFixed(2);
};


// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  setInnerText("total", grandTotal);
  // document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// showProductDetails function call 
const showProductDetails = product => {
  // starsPercentage function call 
  const starsPercentage = getRatingStars(product.rating.rate);
  document.getElementById('product-details-area').innerHTML = `
  <div class="modal-content container-fluid">
 <div class="modal-header">
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<div class="card text-center" >
        <img src="${product.image}" class="card-img-top img-fluid w-50 mx-auto" alt="...">
        <h5 class="modal-title" id="staticBackdropLabel">${product.title}</h5>
        <div class="card-body mt-0">
          <p class="card-text">Price: $${product.price}</p>
          <div class="stars-outer">
          <div class="stars-inner" style="width:${starsPercentage};"></div>
          </div>
          <p>${product.rating.rate} (${product.rating.count} Ratings)</p>
          <p class="card-text"> ${product.description}</p>
        </div>
      </div>
</div>
</div>
`
}
// showDetails  function declaration 
const loadProductDetails = productId => {
  const url = `https://fakestoreapi.com/products/${productId}`
  fetch(url)
    .then(res => res.json())
    .then(data => showProductDetails(data));
}

// clearCart function call 
const clearCart = () => {
  document.getElementById('total-Products').innerText = 0;
  setInnerText('price', 0);
  setInnerText('delivery-charge', 0);
  setInnerText('total-tax', 0);
  setInnerText('total', 0);
}

// getRatings function call 
const getRatingStars = (rating) => {
  const starsTotal = 5;
  // get stars percentage 
  const starsPercentage = (rating / starsTotal) * 100;
  // round to nearest 10 
  const starsPercentageRound = `${Math.round(starsPercentage / 10) * 10}%`;
  return starsPercentageRound;

}