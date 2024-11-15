const baseUrl = "https://www.casio.com";
const productContainer = document.getElementById('product-cards');

// Fetch data from utils/data.json
fetch('../utils/data.json')
  .then(response => response.json())
  .then(data => {
    data.data.forEach((product) => {
      const card = document.createElement('div');
      card.classList.add('card', 'p-2', 'bg-white', 'shadow-lg', 'rounded-lg', 'transition-all', 'duration-300', 'border', 'hover:border-black');

      const productImageUrl = `${baseUrl}${product.productAssets.path}`;
      const hoverImageUrl = `${baseUrl}${product.productAssetList[1].path}`;

      card.innerHTML = `
        <div class="image-container relative overflow-hidden">
          <img src="${productImageUrl}" alt="${product.dataProductName}" class="product-img transition-all duration-300 ease-in-out w-full h-40 object-cover rounded-t-lg">
          <div class="top-left absolute top-0 left-0 bg-black bg-opacity-50 text-white p-1 text-sm">${product.productCategory}</div>
          <div class="top-right absolute top-0 right-0 text-gray-400 hover:text-black p-1 rounded-full text-2xl transition-colors duration-300">&#9825;</div>
        </div>
        <div class="card-details mt-2 text-left">
          <div class="brand font-semibold">${product.brandDisp}</div>
          <div class="name text-gray-700">${product.dataProductName}</div>
          <div class="price-label text-gray-500 text-xs">MRP:</div>
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

      productContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error loading data:', error));
