import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, set, get, ref, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxdyyL_TF-A_99KRxlDdRgzRc6_mkDL-0",
  authDomain: "casio-4ac93.firebaseapp.com",
  projectId: "casio-4ac93",
  storageBucket: "casio-4ac93.appspot.com",
  messagingSenderId: "115949092498",
  appId: "1:115949092498:web:d470d2d4a619c00f3eb04b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Global Variables
let skuArray = [];
const baseUrl = "https://www.casio.com";
const productContainer = document.getElementById('product-cards');

// Utility Functions
function sanitizeObjectKeys(obj) {
  const sanitizedObj = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      sanitizedObj[key.replace(/[.#$/[\]]/g, "_")] = obj[key];
    }
  }
  return sanitizedObj;
}

function showAlert(message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = `
    fixed top-5 left-1/2 transform -translate-x-1/2 
    z-50 bg-gray-700 text-white 
    px-6 py-3 shadow-lg opacity-0 
    rounded-[5px] 
    translate-y-[-20px] transition-all duration-300
  `;
  alertDiv.textContent = message;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.classList.remove('opacity-0', 'translate-y-[-20px]');
    alertDiv.classList.add('opacity-100', 'translate-y-0');
  }, 100);

  setTimeout(() => {
    alertDiv.classList.remove('opacity-100', 'translate-y-0');
    alertDiv.classList.add('opacity-0', 'translate-y-[-20px]');
    setTimeout(() => {
      document.body.removeChild(alertDiv);
    }, 300);
  }, 3000);
}

// Firebase Functions
async function getWishlist() {
  try {
    const usersRef = ref(db, "wishlist/");
    const snapshot = await get(usersRef);
    if (snapshot.exists()) {
      skuArray = Object.keys(snapshot.val());
    } else {
      console.log("No data available in wishlist.");
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error.message);
  }
}

async function addToWishlist(product) {
  const sanitizedProduct = sanitizeObjectKeys(product);
  try {
    await set(ref(db, `wishlist/${sanitizedProduct.sku}`), sanitizedProduct);
    console.log(`Product with SKU ${sanitizedProduct.sku} added to wishlist.`);
  } catch (error) {
    console.error("Error adding to wishlist:", error.message);
    throw error;
  }
}

async function deleteWishlistItem(productId) {
  try {
    const productRef = ref(db, `wishlist/${productId}`);
    await remove(productRef);
    console.log(`Product with ID ${productId} removed from wishlist.`);
  } catch (error) {
    console.error("Error removing product from wishlist:", error.message);
    throw error;
  }
}

// Fetch and Render Products
async function fetchAndRenderProducts() {
  try {
    const response = await fetch('utils/data.json');
    const data = await response.json();

    data.data.forEach((product) => {
      const card = document.createElement('div');
      card.classList.add('card', 'snap-start', 'flex-shrink-0', 'w-1/2', 'md:w-1/3', 'lg:w-1/4', 'p-0', 'bg-white', 'shadow-lg', 'rounded-lg', 'border', 'border-transparent', 'hover:border-black', 'transition-all', 'duration-300', 'h-[450px]');

      const productImageUrl = `${baseUrl}${product.productAssets.path}`;
      const hoverImageUrl = `${baseUrl}${product.productAssetList[1]?.path || product.productAssets.path}`;
      const detailPageUrl = `/pages/productDetailPage/product_detail.html?productId=${product.sku}`;

      const isWishlisted = skuArray.includes(product.sku);

      card.innerHTML = `
        <a href="${detailPageUrl}" class="card-link">
          <div class="image-container relative overflow-hidden h-3/5">
            <img src="${productImageUrl}" alt="${product.dataProductName}" class="product-img transition-all duration-300 ease-in-out w-full h-full object-cover rounded-t-lg">
            <div class="top-left absolute top-0 left-0 bg-black bg-opacity-50 text-white p-1 text-sm hover:opacity-0 transition-opacity duration-300">${product.productCategory}</div>
            <div class="top-right absolute top-0 right-0 text-${isWishlisted ? 'red-400 wish-icon-colored' : 'gray-400 wish-icon'} hover:text-black p-1 rounded-full text-2xl transition-colors duration-300">
              ${isWishlisted ? '&#10084;' : '&#9825;'}
            </div>
          </div>
          <div class="card-details h-2/5 mt-2 text-left p-4">
            <div class="brand font-semibold">${product.brandDisp}</div>
            <div class="name text-gray-700">${product.dataProductName}</div>
            <div class="price-label text-gray-500 text-xs pt-4">MRP:</div>
            <div class="price text-xl font-bold">${product.dispPrice}</div>
          </div>
        </a>
      `;

      card.querySelector('.product-img').addEventListener('mouseover', () => {
        card.querySelector('.product-img').src = hoverImageUrl;
      });

      card.querySelector('.product-img').addEventListener('mouseout', () => {
        card.querySelector('.product-img').src = productImageUrl;
      });

      card.querySelector('.wish-icon, .wish-icon-colored')?.addEventListener('click', async (event) => {
        event.preventDefault();
        const icon = event.currentTarget;
        try {
          if (icon.classList.contains('wish-icon')) {
              // Add to wishlist
              await addToWishlist(product);
              icon.classList.remove('wish-icon', 'text-gray-400');
              icon.classList.add('wish-icon-colored', 'text-red-400');
              icon.innerHTML = '&#10084;'; // Filled heart
              showAlert(`"${product.dataProductName}" added to your wishlist.`);
          } else if (icon.classList.contains('wish-icon-colored')) {
              // Remove from wishlist
              await deleteWishlistItem(product.sku);
              icon.classList.remove('wish-icon-colored', 'text-red-400');
              icon.classList.add('wish-icon', 'text-gray-400');
              icon.innerHTML = '&#9825;'; // Empty heart
              showAlert(`"${product.dataProductName}" removed from your wishlist.`);
          }
        } catch (error) {
            showAlert(`Failed to update wishlist for "${product.dataProductName}".`);
        }
      });
    

      productContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading products:", error.message);
  }
}

// Slider Functionality
function setupSlider() {
  const leftArrow = document.getElementById('left-arrow');
  const rightArrow = document.getElementById('right-arrow');

  leftArrow.addEventListener('click', () => {
    productContainer.scrollBy({ left: -productContainer.clientWidth, behavior: 'smooth' });
  });

  rightArrow.addEventListener('click', () => {
    productContainer.scrollBy({ left: productContainer.clientWidth, behavior: 'smooth' });
  });
}

// Initialize
(async () => {
  await getWishlist();
  await fetchAndRenderProducts();
  setupSlider();
})();
