import scientificCalData from "../../data/scientificCalculatorData.mjs";

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
  standard: "Standard Scientific Calculators",
  programmable: "Programmable Calculators",
  graphic: "Graphing Calculators",
  financial: "Financial Calculators",
};
const categoryLine = {
  standard: "Standard Calculators",
  programmable: "Programmable Calculators",
  graphic: "Graphic Calculators",
  financial: "Financial Calculators",
};

const categoryImgPath = {
  standard:
    "https://www.casio.com/content/casio/locales/in/en/products/scientific-calculators/standard-models/_jcr_content/root/responsivegrid/teaser_copy.casiocoreimg.jpeg/1722237146947/desktop-category-banner-1920x816-1.jpeg",
  programmable:
    "https://www.casio.com/content/casio/locales/in/en/products/scientific-calculators/programmable-models/_jcr_content/root/responsivegrid/teaser.casiocoreimg.jpeg/1649049542160/program-cal-banner-kai.jpeg",
  graphic:
    "https://www.casio.com/content/casio/locales/in/en/products/scientific-calculators/graphic-models/_jcr_content/root/responsivegrid/teaser.casiocoreimg.jpeg/1649049540851/graph-cal-banner-kai.jpeg",
  financial:
    "https://www.casio.com/content/casio/locales/in/en/products/scientific-calculators/financial-models/_jcr_content/root/responsivegrid/teaser.casiocoreimg.jpeg/1661234217491/financial-cal-banner-kai.jpeg",
};
const heroImg = document.getElementById("hero-img");
const params = new URLSearchParams(window.location.search);
let path = params.get("subpath");

if (path in categoryImgPath) {
  heroImg.src = categoryImgPath[path];
}

const categoryNavList = document.querySelectorAll(".category-nav-item");
categoryNavList.forEach((navItem) => {
  if (categoryLine[path] == navItem.textContent.trim()) {
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
  button.addEventListener("change", () => filterProducts(scientificCalData));
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
    displayCards(scientificCalData);
  }
}
filterProducts(scientificCalData);
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
