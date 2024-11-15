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

const categoryImgPath = {
  practical:
    "https://www.casio.com/content/casio/locales/in/en/products/basic-calculators/practical/_jcr_content/root/responsivegrid/teaser.casiocoreimg.jpeg/1661234220008/8-practical-cal-1920-612.jpeg",
  check:
    "https://www.casio.com/content/casio/locales/in/en/products/basic-calculators/check/_jcr_content/root/responsivegrid/teaser.casiocoreimg.jpeg/1661234220492/9-check-calculators-.jpeg",
  "waterprotected-dustproof":
    "https://www.casio.com/content/casio/locales/in/en/products/basic-calculators/waterprotected-dustproof/_jcr_content/root/responsivegrid/teaser.casiocoreimg.jpeg/1661234221801/13-water-protected-dust-proof-calculators.jpeg",
  colorful:
    "https://www.casio.com/content/casio/locales/in/en/products/basic-calculators/colorful/_jcr_content/root/responsivegrid/teaser.casiocoreimg.jpeg/1661234221291/11-my-style-banner-1920-612.jpeg",
  printer:
    "https://www.casio.com/content/casio/locales/in/en/products/basic-calculators/printer/_jcr_content/root/responsivegrid/teaser_copy.casiocoreimg.jpeg/1657607413592/2109-printer-cal-banner.jpeg",
};

const heroImg = document.getElementById("hero-img");
const params = new URLSearchParams(window.location.search);
let path = params.get("subpath");

if (path in categoryImgPath) {
  heroImg.src = categoryImgPath[path];
}

function filterProducts(products) {
  const params = new URLSearchParams(window.location.search);
  let path = params.get("subpath");
  const category = categoryPath[path] || "";

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
