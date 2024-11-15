import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, set, get, ref } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDxdyyL_TF-A_99KRxlDdRgzRc6_mkDL-0",
  authDomain: "casio-4ac93.firebaseapp.com",
  projectId: "casio-4ac93",
  storageBucket: "casio-4ac93.appspot.com",
  messagingSenderId: "115949092498",
  appId: "1:115949092498:web:d470d2d4a619c00f3eb04b"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const baseUrl = "https://www.casio.com";
const productContainer = document.getElementById('product-cards');

function sanitizeObjectKeys(obj) {
  const sanitizedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const sanitizedKey = key.replace(/[.#$/[\]]/g, "_");
      sanitizedObj[sanitizedKey] = obj[key];
    }
  }
  return sanitizedObj;
}

function addToWishlist(product) {
  const correctObj = sanitizeObjectKeys(product)
  set(ref(db, 'product/' + correctObj.sku), correctObj)
    .then(() => {
      console.log("Object written successfully for user ID:", userID);
    })
    .catch((error) => {
      console.error("Error writing data:", error);
    });
}

fetch('utils/data.json')
  .then(response => response.json())
  .then(data => {
    data.data.forEach((product) => {
      const card = document.createElement('div');
      card.classList.add('card', 'snap-start', 'flex-shrink-0', 'w-1/2', 'md:w-1/3', 'lg:w-1/4', 'p-0', 'bg-white', 'shadow-lg', 'rounded-lg', 'border', 'border-transparent', 'hover:border-black', 'transition-all', 'duration-300', 'h-[450px]');

      const productImageUrl = `${baseUrl}${product.productAssets.path}`;
      const hoverImageUrl = `${baseUrl}${product.productAssetList[1].path}`;

      card.innerHTML = `
        <div class="image-container relative overflow-hidden h-3/5">
          <img src="${productImageUrl}" alt="${product.dataProductName}" class="product-img transition-all duration-300 ease-in-out w-full h-full object-cover rounded-t-lg">
          <div class="top-left absolute top-0 left-0 bg-black bg-opacity-50 text-white p-1 text-sm hover:opacity-0 transition-opacity duration-300">${product.productCategory}</div>
          <div class="top-right absolute top-0 right-0 text-gray-400 hover:text-black p-1 rounded-full text-2xl transition-colors duration-300 wish-icon">&#9825;</div>
        </div>
        <div class="card-details h-2/5 mt-2 text-left p-4">
          <div class="brand font-semibold">${product.brandDisp}</div>
          <div class="name text-gray-700">${product.dataProductName}</div>
          <div class="price-label text-gray-500 text-xs pt-4">MRP:</div>
          <div class="price text-xl font-bold">${product.dispPrice}</div>
        </div>
      `;

      // Add hover effect for the product image
      card.querySelector('.product-img').addEventListener('mouseover', function() {
        this.src = hoverImageUrl;
      });
      card.querySelector('.product-img').addEventListener('mouseout', function() {
        this.src = productImageUrl;
      });

      //alert
      function showAlert(message) {
        // Create alert container
        const alertDiv = document.createElement('div');
        alertDiv.className = `
          fixed top-5 left-1/2 transform -translate-x-1/2 
          z-50 bg-gray-700 text-white 
          px-6 py-3 shadow-lg opacity-0 
          rounded-[5px] 
          translate-y-[-20px] transition-all duration-300
        `;
        alertDiv.textContent = message;
      
        // Append to body
        document.body.appendChild(alertDiv);
      
        // Show alert with animation
        setTimeout(() => {
          alertDiv.classList.remove('opacity-0', 'translate-y-[-20px]');
          alertDiv.classList.add('opacity-100', 'translate-y-0');
        }, 100);
      
        // Hide alert after 3 seconds
        setTimeout(() => {
          alertDiv.classList.remove('opacity-100', 'translate-y-0');
          alertDiv.classList.add('opacity-0', 'translate-y-[-20px]');
          setTimeout(() => {
            document.body.removeChild(alertDiv);
          }, 300); // Wait for fade-out animation
        }, 3000);
      }
      //alert ended

      // Add click listener for the wishlist icon
      card.querySelector(".wish-icon").addEventListener("click", async () => {
        console.log("user object : ",product);
        try {
          await addToWishlist(product);
          showAlert(`"${product.dataProductName}" added to your wishlist.`);
          
        } catch (error) {
          console.error("Failed to add to wishlist:", error.message);
          showAlert(`"${product.dataProductName}" added to your wishlist.`);

        }
      });

      productContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading data:', error));

// JavaScript for slider functionality
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

leftArrow.addEventListener('click', () => {
  productContainer.scrollBy({
    left: -productContainer.clientWidth,
    behavior: 'smooth'
  });
});

rightArrow.addEventListener('click', () => {
  productContainer.scrollBy({
    left: productContainer.clientWidth,
    behavior: 'smooth'
  });
});
