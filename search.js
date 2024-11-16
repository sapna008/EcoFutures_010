// Debounce Function
function debounce(func, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

// Fetch JSON Data
async function fetchData() {
    const response = await fetch('utils/data.json'); // Change the URL if needed
    const jsonData = await response.json();
    return jsonData.data; // Assumes 'data' key holds the product list
}

// Display Suggestions
function showSuggestions(input, data) {
    const suggestionsBox = document.getElementById('suggestions');
    suggestionsBox.innerHTML = ''; // Clear previous suggestions
    if (!input) {
        suggestionsBox.classList.add('hidden');
        return;
    }
    suggestionsBox.classList.remove('hidden');

    const filteredData = data.filter(item => 
        item.productName.toLowerCase().includes(input.toLowerCase())
    );

    filteredData.slice(0, 5).forEach(product => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = product.productName;
        suggestionItem.className = 'py-2 border-b border-gray-500 hover:bg-gray-700 cursor-pointer rounded-lg';
        suggestionItem.onclick = () => redirectToSearch(product);

        suggestionsBox.appendChild(suggestionItem);
    });
}

// Redirect to Search Page with Product Data
function redirectToSearch(product) {
    const { productName, productAssets, brandDisp, productCategory, salePrice, productAssetList } = product;
    const imagePath = `https://www.casio.com${productAssets.path}`;
    const secondImagePath = `https://www.casio.com${productAssetList[1].path}`;
    const queryString = new URLSearchParams({
        productName,
        imagePath,
        brandDisp,
        productCategory,
        salePrice,
        secondImagePath
    }).toString();

    window.location.href = `./searching.html?${queryString}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('search');
    const data = await fetchData();

    const debouncedSearch = debounce((e) => {
        showSuggestions(e.target.value, data);
    }, 300);

    searchInput.addEventListener('input', debouncedSearch);
});
