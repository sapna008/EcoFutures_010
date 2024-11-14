
    let productdata;

    async function fetchCourses() {
        const response = await fetch(`https://new-project-cc086-default-rtdb.firebaseio.com/products.json`);
        let products = await response.json();

        if (products && Array.isArray(products)) {
            productdata = products.filter(item => item !== null);
            displayProducts(productdata);
        } else {
            console.error('Products data not found or invalid structure');
        }
    }

    fetchCourses();

    function displayProducts(data) {
        const cardsContainer = document.getElementById("cards-container");
        cardsContainer.innerHTML = "";

        data.forEach(function(product) {
            if (product) {
                const productLabel= product.productLabel || 'No Label';
                const imageUrl = product.productAssets && product.productAssets.imageUrl ? product.productAssets.imageUrl : 'default.jpg';
                const productName = product.productName || 'No Name';
                const brandDisp = product.brandDisp || 'No Brand';
                const dispPrice = product.dispPrice || 'Price Not Available';
                const productUrl = product.productUrl || '#';

                const card = document.createElement("div");
                card.classList.add("card");

                card.innerHTML = `
                    <p class="card-label">${productLabel}</p>
                    <div class="card1">
                        <img src="${imageUrl}" alt="${productName}" class="card-image">
                    </div>
                    <p class="card-brand">${brandDisp}</p>
                    <h3 class="card-title">${productName}</h3>
                    <p class="mrp-label">MRP</p>
                    <p class="card-price">${dispPrice}</p>
                    <a href="${productUrl}" target="_blank" class="card-link">View Product</a>
                `;

                cardsContainer.appendChild(card);
            }
        });
    }

    function toggleSection(section) {
        const options = document.getElementById(`${section}-options`);
        const icon = document.getElementById(`${section}-icon`);
        options.classList.toggle("hidden");
        if (options.classList.contains("hidden")) {
            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");
        } else {
            icon.classList.remove("fa-plus");
            icon.classList.add("fa-minus");
        }
    }

    document.querySelectorAll('input[name="sort"]').forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.id === 'price-high-low') {
            sortProducts('high-low');
        } else if (this.id === 'price-low-high') {
            sortProducts('low-high');
        }
    });
});

function sortProducts(order) {
    const cardsContainer = document.querySelector('.cards-container');
    const cards = Array.from(cardsContainer.children);
    cards.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.card-price').textContent.replace('$', ''));
        const priceB = parseFloat(b.querySelector('.card-price').textContent.replace('$', ''));
        return order === 'high-low' ? priceB - priceA : priceA - priceB;
    });
    cards.forEach(card => cardsContainer.appendChild(card));
}

