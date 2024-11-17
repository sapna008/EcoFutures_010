import basicCalData from "../../data/basicCalculatorData.mjs";

const displayProducts = document.getElementById("right-products-cont");

const menuBtn = document.getElementById("prod-nav-menu");
const crossBtn = document.getElementById("cross");
const mobileNav = document.getElementById("prod-nav-mobile");

menuBtn.addEventListener("click", () => {
  mobileNav.style.display = "block";
});
crossBtn.addEventListener("click", () => {
  mobileNav.style.display = "none";
});

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

const categoryNavList = document.querySelectorAll(".category-nav-item");
categoryNavList.forEach((navItem) => {
  if (categoryPath[path] == navItem.textContent.trim()) {
    navItem.style.fontWeight = 700;
    navItem.style.borderBottom = "4px solid black";
  } else if (
    path == "practical" &&
    navItem.textContent.trim() == "Practical Calculators"
  ) {
    navItem.style.fontWeight = 700;
    navItem.style.borderBottom = "4px solid black";
  }
});

// const radioButtons = document.querySelectorAll('input[name="sortBy"]');
// radioButtons.forEach((button) => {
//   button.addEventListener("change", () => sortItems(filteredData));
// });

const radioButtons = document.querySelectorAll('input[name="sortBy"]');
radioButtons.forEach((button) => {
  button.addEventListener("change", () => filterProducts(basicCalData));
});
function filterProducts(products) {
  const params = new URLSearchParams(window.location.search);
  let path = params.get("subpath");
  const category = categoryPath[path] || "";

  if (category) {
    const filteredData = products.filter(
      (product) => product.brandDisp == category
    );
    //
    sortItems(filteredData);
    // displayCards(filteredData);
  } else {
    displayCards(basicCalData);
  }
}
filterProducts(basicCalData);
function sortItems([...products]) {
  displayProducts.innerHTML = "";
  const selectedValue = document.querySelector(
    'input[name="sortBy"]:checked'
  )?.value;

  let sortedItems;

  switch (selectedValue) {
    case "newest":
      sortedItems = products;
      break;
    case "priceHighLow":
      sortedItems = products.sort((a, b) => {
        return parseFloat(b.listPrice) - parseFloat(a.listPrice);
      });
      break;
    case "priceLowHigh":
      sortedItems = products.sort((a, b) => {
        return parseFloat(a.listPrice) - parseFloat(b.listPrice);
      });
      break;
    case "weightHeavyLight":
      sortedItems = products.sort((a, b) => {
        return parseFloat(b.weight) - parseFloat(a.weight);
      });
      break;
    case "weightLightHeavy":
      sortedItems = products.sort((a, b) => {
        return parseFloat(a.weight) - parseFloat(b.weight);
      });
      break;
    default:
      sortedItems = products;
  }

  displayCards(sortedItems);
}

function displayCards(products) {
  displayProducts.innerHTML = "";

  if (products && products.length != 0) {
    displayProducts.style.display = "grid";
    products.forEach((product) => {
      const card = createCard(product);
      card.addEventListener("click", () => {
        // Navigate to details page with product information
        const productDetailsURL = `${product.url}`;
        window.location.href = productDetailsURL;
      });
      displayProducts.append(card);
    });
  } else {
    displayProducts.innerHTML = `<div class="no-products-message" >No Products found! 🥲</div>`;
    displayProducts.style.display = "flex";
  }
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
