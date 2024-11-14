const baseUrl = "https://www.casio.com";
const productContainer = document.getElementById('product-cards');

// Fetch data from utils/data.json
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
          <div class="top-right absolute top-0 right-0 text-gray-400 hover:text-black p-1 rounded-full text-2xl transition-colors duration-300">&#9825;</div>
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