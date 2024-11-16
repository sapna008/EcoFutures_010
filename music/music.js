
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
// let displayedProducts = [];

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
            const sku = product.sku || 'No SKU';
            const category = product.category || 'No Category';
            const numKeys = product.NumKeys || 'No Keys Information';
            const rhythms = product.Rhythms || 'No Rhythms Information';
            const polyphony = product.polyphony || 'No Polyphony Information';
            const functionDesc = product.function || 'No Function Information';
            const color = product.color || 'No Color Information';

            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
            
            

                <div id="labeldiv">
                    <p class="card-label">${productLabel}</p>
                    <i class="far fa-heart" onclick="heartFilled(this)"> </i>
                </div>


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

    displayedProducts = [...data];
}


  
function heartFilled(element) {
    if (element.classList.contains('far')) {
      element.classList.remove('far'); // Removes outline heart
      element.classList.add('fas');   // Adds solid heart
    } else {
      element.classList.remove('fas'); // Removes solid heart
      element.classList.add('far');    // Adds outline heart
    }
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

// function sortProducts(order) {
//     const cardsContainer = document.querySelector('.cards-container');
//     const cards = Array.from(cardsContainer.children);
//     cards.sort((a, b) => {
//         const priceA = parseFloat(a.querySelector('.card-price').textContent.replace('$', ''));
//         const priceB = parseFloat(b.querySelector('.card-price').textContent.replace('$', ''));
//         return order === 'high-low' ? priceB - priceA : priceA - priceB;
//     });
//     cards.forEach(card => cardsContainer.appendChild(card));
// }


function filterCategory(category) {
const filteredProducts = productdata.filter(product => product.category === category);
displayProducts(filteredProducts);
}

document.getElementById('digital-piano').addEventListener('click', function() {
filterCategory('Digital Piano');
});

document.getElementById('digital-keyboard').addEventListener('click', function() {
filterCategory('Digital Keyboard');
});


// Function to filter products based on the number of keys
function filterByKeys(selectedKeys) {
const filteredData = productdata.filter(function(product) {
    return product.NumKeys === selectedKeys;
});

displayProducts(filteredData); 
}



function filterByPrice(event) {
const checkboxes = document.querySelectorAll('#price-options input[type="checkbox"]');

// Clear all checkboxes except the clicked one
checkboxes.forEach(function(checkbox) {
    if (checkbox !== event.target) {
        checkbox.checked = false;
    }
});

// Get the selected checkbox
const selectedCheckbox = event.target;

// If no checkbox is checked, show all products
if (!selectedCheckbox.checked) {
    displayProducts(productdata);
    return;
}

// Get the selected price range
const selectedRange = selectedCheckbox.parentNode.textContent.trim();

// Filter products based on the selected price range
const filteredData = productdata.filter(function(product) {
    // Parse and clean the product price
    let productPrice = parseFloat(product.dispPrice.replace(/[₹,]/g, ''));

    if (selectedRange.includes('Below ₹5000')) {
        return productPrice < 5000;
    } else if (selectedRange.includes('₹5000 - ₹10000')) {
        return productPrice >= 5000 && productPrice <= 10000;
    } else if (selectedRange.includes('₹10000 - ₹20000')) {
        return productPrice > 10000 && productPrice <= 20000;
    } else if (selectedRange.includes('₹20000 - ₹30000')) {
        return productPrice > 20000 && productPrice <= 30000;
    } else if (selectedRange.includes('₹30000 - ₹40000')) {
        return productPrice > 30000 && productPrice <= 40000;
    } else if (selectedRange.includes('₹40000 - ₹50000')) {
        return productPrice > 40000 && productPrice <= 50000;
    } else if (selectedRange.includes('Above ₹50000')) {
        return productPrice > 50000;
    }
    return false;
});

// Display the filtered products
displayProducts(filteredData);
}


function filterByRhythms(selectedRhythms) {
// Filter products based on the selected number of rhythms
const filteredData = productdata.filter(function(product) {
    // Parse and clean the rhythms value
    const productRhythms = parseInt(product.Rhythms, 10); // Ensure the property is numeric

    return productRhythms === selectedRhythms;
});

// Display the filtered products
displayProducts(filteredData);
}


function filterByPolyphony(selectedPolyphony) {
const filteredData = productdata.filter(product => parseInt(product.polyphony, 10) === selectedPolyphony);
displayProducts(filteredData);
}


function filterByFunction(selectedFunction) {
const filteredData = productdata.filter(product => product.function === selectedFunction);
displayProducts(filteredData);
}

function filterBrand(brand) {
const filteredProducts = productdata.filter(product => product.brandDisp === brand);
displayProducts(filteredProducts);
}

document.getElementById('celviano-grand-hybrid').addEventListener('click', function() {
filterBrand('CELVIANO Grand Hybrid');
});

document.getElementById('celviano').addEventListener('click', function() {
filterBrand('CELVIANO');
});

document.getElementById('privia').addEventListener('click', function() {
filterBrand('Privia');
});

document.getElementById('cdp').addEventListener('click', function() {
filterBrand('CDP');
});

document.getElementById('ct-x').addEventListener('click', function() {
filterBrand('CT-X');
});

document.getElementById('casiotone').addEventListener('click', function() {
filterBrand('Casiotone');
});

document.getElementById('mini-keyboard').addEventListener('click', function() {
filterBrand('Mini Keyboard');
});



function filterBrand(brand) {
const filteredProducts = productdata.filter(product => product.brandDisp === brand);

if (filteredProducts.length === 0) {
    displayEmptyBag(); // Display empty state if no products are found
} else {
    displayProducts(filteredProducts); // Display filtered products
}
}

function displayEmptyBag() {
const cardsContainer = document.getElementById("cards-container");
cardsContainer.innerHTML = `
    <div class="empty-bag">
        <i class="fa-solid fa-bag-shopping empty-bag-icon"></i>
        <p>No products available for this brand.</p>
    </div>
`;
}

// function filterColor(color) {
//     const filteredProducts = productdata.filter(product => product.color === color);

//     if (filteredProducts.length === 0) {
//         displayNoProductsFound('color');
//     } else {
//         displayProducts(filteredProducts);
//     }
// }

// function displayNoProductsFound(category) {
//     const cardsContainer = document.getElementById("cards-container");
//     cardsContainer.innerHTML = ""; // Clear current products

//     // Display message if no products are available
//     const noProductsMessage = document.createElement("div");
//     noProductsMessage.classList.add("no-products");
//     noProductsMessage.innerHTML = `<p>No products available for the selected ${category}.</p>`;
//     cardsContainer.appendChild(noProductsMessage);
// }



function filterColor(color) {
const filteredProducts = productdata.filter(product => product.color === color);

if (filteredProducts.length === 0) {
    displayNoProductsFound(color); // Pass the color to display the message
} else {
    displayProducts(filteredProducts);
}
}

function displayNoProductsFound(color) {
const cardsContainer = document.getElementById("cards-container");
cardsContainer.innerHTML = ""; // Clear current products

// Create the no products message container
const noProductsMessage = document.createElement("div");
noProductsMessage.classList.add("no-products");

// Add message text and icons
noProductsMessage.innerHTML = `
    
    <i class="fa-solid fa-fill-drip color-icon" style="color: ${color};"></i>
    <i class="fa-solid fa-bag-shopping" style=";"></i>
    <p>No products available for the selected color: <span style="color: ${color};">${color}</span></p>
`;

// Append the message to the cards container
cardsContainer.appendChild(noProductsMessage);
}


document.querySelectorAll('input[name="sort"]').forEach(radio => {
radio.addEventListener('change', function() {
    if (this.id === 'price-high-low') {
        sortProducts('price-high-low');
    } else if (this.id === 'price-low-high') {
        sortProducts('price-low-high');
    } else if (this.id === 'weight-heavy-light') {
        sortProducts('weight-heavy-light');
    } else if (this.id === 'weight-light-heavy') {
        sortProducts('weight-light-heavy');
    } else if (this.id === 'newest') {
        sortProducts('newest');
    }
});
});

function sortProducts(order) {
const cardsContainer = document.getElementById('cards-container');
const cards = Array.from(cardsContainer.children);

cards.sort((a, b) => {
    let comparison = 0;

    if (order === 'price-high-low') {
        const priceA = parseFloat(a.querySelector('.card-price').textContent.replace(/[₹,]/g, ''));
        const priceB = parseFloat(b.querySelector('.card-price').textContent.replace(/[₹,]/g, ''));
        comparison = priceB - priceA; // Sort descending by price
    } else if (order === 'price-low-high') {
        const priceA = parseFloat(a.querySelector('.card-price').textContent.replace(/[₹,]/g, ''));
        const priceB = parseFloat(b.querySelector('.card-price').textContent.replace(/[₹,]/g, ''));
        comparison = priceA - priceB; // Sort ascending by price
    } else if (order === 'weight-heavy-light' || order === 'weight-light-heavy') {
        const priceA = parseFloat(a.querySelector('.card-price').textContent.replace(/[₹,]/g, ''));
        const priceB = parseFloat(b.querySelector('.card-price').textContent.replace(/[₹,]/g, ''));

        // Set the weight based on price (if price > 20,000 -> light, else heavy)
        const weightA = priceA > 20000 ? 'light' : 'heavy';
        const weightB = priceB > 20000 ? 'light' : 'heavy';

        // Compare based on weight
        if (order === 'weight-heavy-light') {
            comparison = weightB === 'heavy' ? 1 : -1; // Sort heavy items before light items
        } else {
            comparison = weightA === 'light' ? 1 : -1; // Sort light items before heavy items
        }
    }

    return comparison;
});

// Re-append the sorted cards to the container
cards.forEach(card => cardsContainer.appendChild(card));
}


document.getElementById('clearButton').addEventListener('click', ()=>{
fetchCourses();
displayProducts();
});


let images = document.querySelectorAll('#top-img img');
let currentIndex = 0;

function changeImage() {
images[currentIndex].classList.remove('active');
currentIndex = (currentIndex + 1) % images.length; // Loop through images
images[currentIndex].classList.add('active');
}

// Initially show the first image
images[currentIndex].classList.add('active');

// Change images every 2 seconds
setInterval(changeImage, 2000);




// const dropdown = document.getElementById("hoverDropdown");
// const item = document.getElementById("hoverContent");
// let currentPage = "men"
// let previousPage = null

// function changePage(pageName){
//   previousPage = currentPage
//   currentPage = pageName
// }

// function backPreviousPage(){
//   console.log("called")
// }

// function showDropdown(category) {
//   let dropdownContent;
//   let dropdownWidth;
//   let translateValue;

//   switch (category) {
//     case "watches":
//       dropdownContent = watches;
//       dropdownWidth = "w-[70rem]";
//       translateValue = "-translate-x-[5rem]";
//       break;
//     case "instruments":
//       dropdownContent = calculator;
//       dropdownWidth = "w-[70rem]";
//       translateValue = "-translate-x-[5rem]";
//       break;
//     case "calculator":
//       dropdownContent = instruments;
//       dropdownWidth = "w-[70rem]";
//       translateValue = "-translate-x-[5rem]";
//       break;
//     case "other":
//       dropdownContent = other;
//       dropdownWidth = "w-[70rem]";
//       translateValue = "-translate-x-[5rem]";
//       break;

//     default:
//       return;
//   }

//   item.innerHTML = `${dropdownContent}`;

//   dropdown.classList.remove("w-[70rem]", "w-[30rem]");
//   dropdown.classList.add(dropdownWidth);

//   dropdown.classList.remove("-translate-x-[5rem]", "translate-x-[10rem]");
//   dropdown.classList.add(translateValue);

//   dropdown.classList.remove("hidden");
//   dropdown.classList.add("opacity-100", "translate-y-1");
// }

// function hideDropdown() {
//   dropdown.classList.add("hidden");
//   dropdown.classList.remove("opacity-100", "translate-y-1");
// }

// document.querySelectorAll(".group").forEach((group) => {
//   group.addEventListener("mouseenter", function () {
//     showDropdown(this.querySelector("a").innerText);
//   });

//   group.addEventListener("mouseleave", function () {
//     hideDropdown();
//   });
// });

// dropdown.addEventListener("mouseenter", function () {
//   dropdown.classList.remove("hidden");
//   dropdown.classList.add("opacity-100", "translate-y-1");
// });

// dropdown.addEventListener("mouseleave", function () {
//   hideDropdown();
// });


// const watches = `<div class="watch-dropdown">
// <ul class="flex justify-between list-none p-0 overflow-hidden">
//    <li class="font-semibold text-sm my-2 ease-in-out border-b-2 border-transparent  hover:font-bold  cursor-pointer">G-SHOCK</li>
//    <ul class="dropdown-items container mx-auto py-8 flex space-x-4">
//       <div class="text-center">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem1/tab/item_1719898572045/content_panel_list/content_panel_202407021439276070/image.casiocoreimg.png/1726653913673/02.png" alt="Image 1" class="h-40 w-40 object-cover"> 
//          <p>hello</p>
//       </div>
//       <div class="text-center">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem1/tab/item_1719898572045/content_panel_list/content_panel_202407021439276084/image.casiocoreimg.png/1723444951740/gm-110gc-1a.png" alt="Image 2" class="h-40 w-40 object-cover"> 
//          <p>hello</p>
//       </div>
//       <div class="text-center">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem1/tab/item_1719898572045/content_panel_list/content_panel_2024070215025143411/image.casiocoreimg.png/1722235011028/gr-b300-1a.png" alt="Image 3" class="h-40 w-40 object-cover"> 
//          <p>hello</p>
//       </div>
//    </ul>
// </ul >
//     </div>
//     <div> 
//       <li class=" list-none font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500 hover:font-bold  cursor-pointer"">BABY-G</li>
//       <ul class="dropdown-items" >

//       </ul>
//     </div>
//     <div> 
//       <li class=" list-none font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500 hover:font-bold  cursor-pointer"">EDIFICE</li>
//       <ul class="dropdown-items">

//       </ul>
//     </div>
//     <div> 
//       <li class=" list-none font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500 hover:font-bold  cursor-pointer"">PRO TREK</li>
//       <ul class="dropdown-items">

//       </ul>
//     </div>
//     <div>
//       <li class="list-none font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500  hover:font-bold cursor-pointer"">SHEEN</li>
//       <ul class="dropdown-items">

//       </ul>
//     </div>
//   </ul>
// </div>
// `;

// const calculator = `
// <div class="calculator-dropdown">
// <ul class="flex justify-between list-none p-0 overflow-hidden">
//    <li class="font-semibold text-sm my-2 ease-in-out border-b-2 border-transparent  hover:font-bold  cursor-pointer"></li>
//    <ul class="dropdown-items container mx-auto py-8 flex space-x-4">
//       <div class="text-center p-2">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem3/tab/nav_tab_item/content_panel_list/content_panel_202406272033571941/image.casiocoreimg.png/1719837870011/fx-991cw-f.png" alt="Image 1" class="h-40 w-40 object-cover"> 
//          <div class="pt-4"><a href="./pages/calculator/basicCalculator.html">All Basic Calculators</a></div>
//       </div>
//       <div class="text-center p-2">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem3/tab/item_1718770052010/content_panel_list/content_panel_202406191336410036/image.casiocoreimg.jpeg/1719839046947/wd-320mt-seq1.jpeg" alt="Image 2" class="h-40 w-40 object-cover"> 
//          <div class="pt-4"><a href="./pages/calculator/basicCalculator.html?subpath=practical">Practical Calculators</a></div>
//       </div>
//       <div class="text-center p-2">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem3/tab/item_1718770052010/content_panel_list/content_panel_202406191310503991/image.casiocoreimg.jpeg/1719838641098/mj-120gst.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
//          <div class="pt-4"><a href="./pages/calculator/basicCalculator.html?subpath=check">Check Calculators</a></div>
//       </div>
//       <div class="text-center p-2">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem3/tab/nav_tab_item/content_panel_list/content_panel_202406272052230743/image.casiocoreimg.jpeg/1730966356628/fx-cg50-seq1.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
//          <div class="pt-4"><a href="../EcoFuture_010/pages/calculator/basicCalculatorCategory.html?subpath=waterprotected-dustproof">Water-Protected & Dust-Proof Calculators</a></div>
//       </div>
//       <div class="text-center p-2">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem3/tab/item_1718770052010/content_panel_list/content_panel_202406191316482854/image.casiocoreimg.jpeg/1730174204679/jw-200sc-pk-seq1.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
//          <div class="pt-4"><a href="../EcoFuture_010/pages/calculator/basicCalculatorCategory.html?subpath=colorful">Colorful Calculators</a></div>
//       </div>
//       <div class="text-center p-2">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem3/tab/item_1718770052010/content_panel_list/content_panel_202406191336410037/image.casiocoreimg.jpeg/1730174212882/dr-140r-we-seq1.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
//          <div class="pt-4"><a href="../EcoFuture_010/pages/calculator/basicCalculatorCategory.html?subpath=printer">Printing Calculators</a></div>
//       </div>
//    </ul>
// </ul >

// </div>
// `;

// const instruments = `<div class="instrument-dropdown">
// <ul class="flex justify-between list-none p-0 overflow-hidden">
//    <li class="font-semibold text-sm my-2 ease-in-out border-b-2 border-transparent  hover:font-bold  cursor-pointer"></li>
//    <ul class="dropdown-items container mx-auto py-8 flex space-x-4">
//       <div class="text-center p-2">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem2/tab/item_1718778020716/content_panel_list/content_panel_202406191523288730/image.casiocoreimg.jpeg/1731583199682/mini.jpeg" alt="Image 1" class="h-40 w-40 object-cover"> 
//          <div class="pt-4"><a href="../music/music.html">All</a></div>
//       </div>
//       <div class="text-center p-2">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem2/tab/item_1718778020716/content_panel_list/content_panel_202406191523288742/image.casiocoreimg.jpeg/1731583024652/ct-x.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
//          <div class="pt-4"><a href="./pages/calculator/basicCalculator.html?subpath=check">CT-X</a></div>
//       </div>
//       <div class="text-center p-2">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem2/tab/item_1718778020716/content_panel_list/content_panel_202406191523288743/image.casiocoreimg.jpeg/1731583153016/cdp-s.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
//          <div class="pt-4"><a href="../EcoFuture_010/pages/calculator/basicCalculatorCategory.html?subpath=waterprotected-dustproof">CDP</a></div>
//       </div>
//       <div class="text-center p-2">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem2/tab/item_1718778020716/content_panel_list/content_panel_202406191605578885/image.casiocoreimg.jpeg/1731583810079/piano.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
//          <div class="pt-4"><a href="../EcoFuture_010/pages/calculator/basicCalculatorCategory.html?subpath=colorful">CALVIANO</a></div>
//       </div>
//       <div class="text-center p-2">
//          <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem2/tab/item_1718778020716/content_panel_list/content_panel_202406191605578886/image.casiocoreimg.png/1731567559962/ap-750-1.png" alt="Image 3" class="h-40 w-40 object-cover"> 
//          <div class="pt-4"><a href="../EcoFuture_010/pages/calculator/basicCalculatorCategory.html?subpath=printer">Casiotone Mini</a></div>
//       </div>
//    </ul>
// </ul >
// </div>
// `;

// const other = `<div class="other-dropdown">

//     <div> 
//       <li class=" list-none font-semibold  text-xl my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500 hover:font-bold  cursor-pointer"">Label Printers & Tapes</li>
//       <ul class="dropdown-items" >

//       </ul>
//     </div>
//     <div> 
//       <li class=" list-none font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500 hover:font-bold  cursor-pointer"">Label Printers</li>
//       <ul class="dropdown-items">

//       </ul>
//     </div>
//     <div> 
//       <li class=" list-none font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500 hover:font-bold  cursor-pointer"">Label Tapes</li>
//       <ul class="dropdown-items">

//       </ul>
//     </div>

//   </ul>
// </div>`;


// // Open and close side drawer

// const hamburger = document.querySelector(".hamburger");
// const drawer = document.getElementById("drawer-navigation");

// hamburger.addEventListener("click", () => {
//   drawer.style.transform = "translateX(0)";
// });

// document.addEventListener("click", function (event) {
//   if (!drawer.contains(event.target) && !hamburger.contains(event.target)) {
//     drawer.style.transform = "translateX(-100%)";
//   }
// });

// let touchStartX = 0;

// drawer.addEventListener("touchstart", function (e) {
//   touchStartX = e.changedTouches[0].screenX;
// });

// drawer.addEventListener("touchend", function (e) {
//   const touchEndX = e.changedTouches[0].screenX;

//   if (touchStartX - touchEndX > 50) {
//     drawer.style.transform = "translateX(-100%)";
//   }
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const dropdownButtons = document.querySelectorAll("[data-collapse-toggle]");

//   dropdownButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       const dropdownId = button.getAttribute("aria-controls");
//       const dropdown = document.getElementById(dropdownId);
//       dropdown.classList.toggle("hidden");
//     });
//   });
// });

// function handleProfileDropdown(isHover) {
//   const dropdown2 = document.getElementById("hoverDropdown2");

//   if (isHover) {
//     dropdown2.classList.remove("hidden");
//     dropdown2.classList.remove("opacity-0");
//     dropdown2.classList.add("block");
//     setTimeout(() => {
//       dropdown2.classList.remove("opacity-0");
//     }, 0);
//   } else {
//     dropdown2.classList.add("opacity-0");
//     setTimeout(() => {
//       dropdown2.classList.add("hidden");
//     }, 300);
//   }
// }
// function viewallitem(){
//   window.location.href = "pages/viewall.html";
// }

// function wishlist(){
//   window.location.href = "./pages/wishlist.html";
// }



// const scrollContainer = document.getElementById('scrollContainer');
//    const nextButton = document.getElementById('nextButton');
//    const prevButton = document.getElementById('prevButton');

//    nextButton.addEventListener('click', () => {
//     scrollContainer.scrollBy({ left: 400, behavior: 'smooth' });
//    });

//    prevButton.addEventListener('click', () => {
//     scrollContainer.scrollBy({ left: -400, behavior: 'smooth' });
//    });