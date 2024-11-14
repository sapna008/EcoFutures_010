import basicCalData from "../../data/basicCalculatorData.mjs";

const displayProducts = document.getElementById("right-products-cont");
console.log(displayProducts);

const categoryPath = {
  practical: "Basic calculators",
  check: "Check Calculators",
  "waterprotected-dustproof": "Water-Protected & Dust-Proof Calculators",
  colorful: "Colorful Calculators",
  printer: "Printing Calculators",
};

function filterProducts(products) {
  const params = new URLSearchParams(window.location.search);
  let path = params.get("subpath");
  const category = categoryPath[path] || "";
  console.log(category);

  if (category) {
    const filteredData = products.filter(
      (product) => product.brandDisp == category
    );
    displayCards(filteredData);
  } else {
    displayCards(basicCalData);
  }
}
filterProducts(basicCalData);

function displayCards(products) {
  displayProducts.innerHTML = "";

  products.forEach((product) => {
    const card = createCard(product);
    displayProducts.append(card);
  });
}

function createCard({
  productLabel,
  productAssetList: [{ path }],
  productName,
  brandDisp,
  dispPrice,
  priceLabel,
}) {
  let card = document.createElement("div");
  card.innerHTML = `
     <div class="card">
          <div class="card-top">
            <span class="product-label">${productLabel}</span>
            <div class="card-wishlist">
              <i class="fa-regular fa-heart"></i>
            </div>
          </div>
          <div class="img-cont">
            <img
              src="https://www.casio.com/${path}"
              alt=""
            />
          </div>
          <div class="card-desc-cont">
            <div class="brand-disp">${brandDisp}</div>
            <div class="data-product-name">${productName}</div>
            <div>
              <div class="price-label">${priceLabel}</div>
              <div class="disp-price">${dispPrice}</div>
            </div>
          </div>
        </div>
    `;
  return card;
}
