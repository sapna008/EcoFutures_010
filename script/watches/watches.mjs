import watchesAllData from "../../data/watchesData.mjs";
const menuBtn = document.getElementById("prod-nav-menu");
const crossBtn = document.getElementById("cross");
const mobileNav = document.getElementById("prod-nav-mobile");

menuBtn.addEventListener("click", () => {
  mobileNav.style.display = "block";
});
crossBtn.addEventListener("click", () => {
  mobileNav.style.display = "none";
});
const heroImages = [
  "https://www.casio.com/content/casio/locales/in/en/products/watches/_jcr_content/root/responsivegrid/carousel_583184570/item_1716869113009.casiocoreimg.jpeg/1729491294107/vk-casio-homepage-1920x816-vk.jpeg",
  "https://www.casio.com/content/casio/locales/in/en/products/watches/_jcr_content/root/responsivegrid/carousel_583184570/item_1716869114423.casiocoreimg.jpeg/1729491321926/casio-homepage-1920x816-sg-1.jpeg",
];

const heroImg = document.getElementById("hero-img");
let index = 0;

// Initialize the image with style
heroImg.src = heroImages[0];
heroImg.style.transition = "opacity 1s ease-in-out";
heroImg.style.opacity = 1;

const fadeImage = () => {
  heroImg.style.opacity = 0;

  setTimeout(() => {
    index = (index + 1) % heroImages.length;
    heroImg.src = heroImages[index];
    heroImg.style.opacity = 1;
  }, 400);
};

setInterval(fadeImage, 4000);

const displayProducts = document.getElementById("right-products-cont");

const radioButtons = document.querySelectorAll('input[name="sortBy"]');
const clearButton = document.querySelector(".clear-button button");

// Sort products
function sortItems([...products]) {
  displayProducts.innerHTML = "";
  const selectedValue = document.querySelector(
    'input[name="sortBy"]:checked'
  )?.value;

  let sortedItems;

  switch (selectedValue) {
    case "newest":
      sortedItems = products.sort((a, b) => {
        if (a.label === "new" && b.label !== "new") {
          return -1;
        }
        if (b.label === "new" && a.label !== "new") {
          return 1;
        }
        return 0;
      });
      break;
    case "priceHighLow":
      sortedItems = products.sort(
        (a, b) => parseFloat(b.listPrice) - parseFloat(a.listPrice)
      );
      break;
    case "priceLowHigh":
      sortedItems = products.sort(
        (a, b) => parseFloat(a.listPrice) - parseFloat(b.listPrice)
      );
      break;
    case "weightHeavyLight":
      sortedItems = products.sort(
        (a, b) => parseFloat(b.weight) - parseFloat(a.weight)
      );
      break;
    case "weightLightHeavy":
      sortedItems = products.sort(
        (a, b) => parseFloat(a.weight) - parseFloat(b.weight)
      );
      break;
    default:
      sortedItems = products;
  }

  displayCards(sortedItems);
}

// Display products in cards
async function displayCards(products) {
  displayProducts.innerHTML = "";

  if (products && products.length != 0) {
    displayProducts.style.display = "grid";
    products.forEach((product) => {
      if (
        product.productLabel.trim() !=
          "SURFRIDER FOUNDATION collaboration model" ||
        product.productLabel.trim() != "RUI HACHIMURA SIGNATURE MODEL"
      ) {
        const card = createCard(product);
        card.addEventListener("click", () => {
          // Navigate to details page with product information
          const productDetailsURL = `${product.url}`;
          window.location.href = productDetailsURL;
        });
        displayProducts.append(card);
      }
    });
  } else {
    displayProducts.innerHTML = `<div class="no-products-message" >No Products found! 🥲</div>`;
    displayProducts.style.display = "flex";
  }
}

// Create a product card
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
        <img src="https://www.casio.com/${path}" alt="" />
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

// Add event listeners for sorting and filters
radioButtons.forEach((button) => {
  button.addEventListener("change", () => sortItems(watchesAllData));
});

// Handle filter button clicks
document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const { innerText: filterValue, parentElement: filterCategory } = e.target;

    // Get the filter category
    const category = filterCategory
      .closest(".filter-category")
      .querySelector(".filter-header")
      .innerText.toLowerCase();

    if (filters[category].includes(filterValue)) {
      filters[category] = filters[category].filter(
        (value) => value !== filterValue
      );
    } else {
      filters[category].push(filterValue);
    }

    sortItems(watchesAllData);
  });
});

// Clear all filters and sorting
clearButton.addEventListener("click", () => {
  // Reset filters
  filters = {
    power: [],
    digits: [],
    priceRange: [],
    color: [],
    series: [],
    type: [],
  };

  // Uncheck all radio buttons
  radioButtons.forEach((button) => (button.checked = false));

  // Reset filter UI
  document
    .querySelectorAll(".filter-button")
    .forEach((button) => button.classList.remove("active"));

  // Reset the product display
  sortItems(watchesAllData);
});

// Initial display
displayCards(watchesAllData);
