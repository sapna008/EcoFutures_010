import scientificCalData from "../../data/scientificCalculatorData.mjs";

const menuBtn = document.getElementById("prod-nav-menu");
const crossBtn = document.getElementById("cross");
const mobileNav = document.getElementById("prod-nav-mobile");

menuBtn.addEventListener("click", () => {
  mobileNav.style.display = "block";
});
crossBtn.addEventListener("click", () => {
  mobileNav.style.display = "none";
});

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
      sortedItems = products;
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

  // Apply filters
  sortedItems = applyFilters(sortedItems);

  displayCards(sortedItems);
}
// Initialize filters
let filters = {
  power: [],
  digits: [],
  priceRange: [],
  color: [],
  series: [],
  type: [],
};
// Apply all active filters
// function applyFilters(products) {
//   return products.filter((product) => {
//     // console.log(filters);

//     return (
//       (filters.power.length === 0 || filters.power.includes(product.power)) &&
//       (filters.digits.length === 0 ||
//         filters.digits.includes(product.digits)) &&
//       (filters.priceRange.length === 0 ||
//         filters.priceRange.some((range) => {
//           // Example logic for price range filter
//           if (range === "Below ₹500")
//             return parseFloat(product.listPrice) < 500;
//           if (range === "₹500 - ₹1000")
//             return (
//               parseFloat(product.listPrice) >= 500 &&
//               parseFloat(product.listPrice) <= 1000
//             );
//           if (range === "₹1000 - ₹2000")
//             return (
//               parseFloat(product.listPrice) >= 1000 &&
//               parseFloat(product.listPrice) <= 2000
//             );
//           if (range === "Above ₹2000")
//             return parseFloat(product.listPrice) > 2000;
//         })) &&
//       (filters.color.length === 0 || filters.color.includes(product.color)) &&
//       (filters.series.length === 0 ||
//         filters.series.includes(product.series)) &&
//       (filters.type.length === 0 || filters.type.includes(product.type))
//     );
//   });
// }
function applyFilters(products) {
  return products.filter((product) => {
    return (
      // Power filter
      (filters.power.length === 0 ||
        filters.power.some((power) =>
          product.additionalAttributions.powerSupply.some((p) =>
            p.includes(power)
          )
        )) &&
      // Digits filter
      (filters.digits.length === 0 ||
        filters.digits.some((digit) =>
          product.additionalAttributions.digitNumber.some((d) =>
            d.includes(digit)
          )
        )) &&
      // Price range filter
      (filters.priceRange.length === 0 ||
        filters.priceRange.some((range) => {
          if (range === "Below ₹500")
            return parseFloat(product.listPrice) < 500;
          if (range === "₹500 - ₹1000")
            return (
              parseFloat(product.listPrice) >= 500 &&
              parseFloat(product.listPrice) <= 1000
            );
          if (range === "₹1000 - ₹2000")
            return (
              parseFloat(product.listPrice) >= 1000 &&
              parseFloat(product.listPrice) <= 2000
            );
          if (range === "Above ₹2000")
            return parseFloat(product.listPrice) > 2000;
        })) &&
      // Color filter
      (filters.color.length === 0 ||
        filters.color.some((color) =>
          product.additionalAttributions.color.includes(color)
        )) &&
      // Series filter
      (filters.series.length === 0 ||
        filters.series.some((series) => product.series.includes(series))) &&
      // Type filter
      (filters.type.length === 0 ||
        filters.type.some((type) =>
          product.additionalAttributions.productType.some((t) =>
            t.includes(type)
          )
        ))
    );
  });
}

// Display products in cards
async function displayCards(products) {
  displayProducts.innerHTML = "";
  console.log(products);

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
    // If no products are available, show the "No products available" message
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
  button.addEventListener("change", () => sortItems(scientificCalData));
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

    sortItems(scientificCalData);
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
  sortItems(scientificCalData);
});

// Initial display
displayCards(scientificCalData);
