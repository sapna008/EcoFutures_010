import watchesAllData from "../../data/watchesData.mjs";
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
  gshock: "G-SHOCK",
  vintage: "CASIO",
  edifice: "EDIFICE",
  casioCol: "CASIO",
  babyG: "BABY-G",
  protrek: "PRO TREK",
  sheen: "SHEEN",
};
const categoryLine = {
  gshock: "G-SHOCK",
  vintage: "Vintage",
  edifice: "EDIFICE",
  casioCol: "CASIO COLLECTION",
  babyG: "BABY-G",
  protrek: "PRO TREK",
  sheen: "SHEEN",
};
const params = new URLSearchParams(window.location.search);
let path = params.get("subpath");
const categoryNavList = document.querySelectorAll(".category-nav-item");
categoryNavList.forEach((navItem) => {
  if (categoryLine[path] == navItem.textContent.trim()) {
    navItem.style.fontWeight = 700;
    navItem.style.borderBottom = "4px solid black";
  }
});

const categoryImgPath = {
  gshock: [
    "https://www.casio.com/content/casio/locales/in/en/products/watches/gshock/_jcr_content/root/responsivegrid/carousel_copy/item_1721711027014.casiocoreimg.jpeg/1721711054880/desktop-icons.jpeg",
    "https://www.casio.com/content/casio/locales/in/en/products/watches/gshock/_jcr_content/root/responsivegrid/carousel_copy/item_1721711029269.casiocoreimg.jpeg/1721711114468/desktop-2100.jpeg",
    "https://i.ibb.co/BB2PLtR/carasole3.jpg",
    "https://i.ibb.co/XZ3XN26/carasole4.jpg",
  ],
  vintage: [
    "https://www.casio.com/content/casio/locales/in/en/products/watches/casio/collection/vintage-new/_jcr_content/root/responsivegrid/teaser.casiocoreimg.jpeg/1722314439633/casio.com-vintage-banner.jpeg",
    "https://i.ibb.co/Gt54Q54/descarasole1.jpg",
  ],
  edifice: [
    "https://www.casio.com/content/casio/locales/in/en/products/watches/edifice/_jcr_content/root/responsivegrid/carousel_1653277841/item_1722246585967.casiocoreimg.jpeg/1722246703063/desktop--edifice-windflow.jpeg",
    "https://www.casio.com/content/casio/locales/in/en/products/watches/edifice/_jcr_content/root/responsivegrid/carousel_1653277841/item_1722246589528.casiocoreimg.jpeg/1722246720891/desktop-edifice-ecb2000.jpeg",
    "https://www.casio.com/content/casio/locales/in/en/products/watches/edifice/_jcr_content/root/responsivegrid/carousel_1653277841/item_1722246114946.casiocoreimg.jpeg/1722246635049/desktop--edifice-night-time.jpeg",
  ],
  casioCol: [
    "https://www.casio.com/content/casio/locales/in/en/products/watches/casio-collection/_jcr_content/root/responsivegrid/carousel_copy/item_1721132321909.casiocoreimg.jpeg/1721132419913/desktop-ltp-e154mpg-4a.jpeg",
    "https://www.casio.com/content/casio/locales/in/en/products/watches/casio-collection/_jcr_content/root/responsivegrid/carousel_copy/item_1729516455570.casiocoreimg.jpeg/1731492499421/casio-digital-ae-1200whd-1920x816.jpeg",
    "https://www.casio.com/content/casio/locales/in/en/products/watches/casio-collection/_jcr_content/root/responsivegrid/carousel_copy/item_1721132318911.casiocoreimg.jpeg/1721132375844/desktop-casio-mtp-137hd-2a.jpeg",
    "https://www.casio.com/content/casio/locales/in/en/products/watches/casio-collection/_jcr_content/root/responsivegrid/carousel_copy/item_1721132320561.casiocoreimg.jpeg/1721132391280/desktop-casio-timeless-love.jpeg",
  ],
  babyG: [
    "https://www.casio.com/content/casio/locales/in/en/products/watches/babyg/_jcr_content/root/responsivegrid/teaser_413363908.casiocoreimg.jpeg/1677484650323/bgd-565-hero-pc.jpeg",
    "https://i.ibb.co/XZ3XN26/carasole4.jpg",
  ],
  protrek: [
    "https://www.casio.com/content/casio/locales/in/en/products/watches/protrek/_jcr_content/root/responsivegrid/carousel/item_1666859479775.casiocoreimg.jpeg/1666859708026/prg-340-hero-pc.jpeg",
    "https://www.casio.com/content/casio/locales/in/en/products/watches/protrek/_jcr_content/root/responsivegrid/carousel/teaser.casiocoreimg.jpeg/1661234181582/prt-b50-hero-pc-m.jpeg",
    "https://www.casio.com/content/casio/locales/in/en/products/watches/protrek/_jcr_content/root/responsivegrid/carousel/teaser_632447940.casiocoreimg.jpeg/1675939960001/hero-pc-prg-30.jpeg",
    "https://www.casio.com/content/casio/locales/in/en/products/watches/protrek/_jcr_content/root/responsivegrid/carousel/teaser_copy_copy_cop.casiocoreimg.jpeg/1653632923652/protrek-prt-b70-en.jpeg",
  ],
  sheen: [
    "https://www.casio.com/content/casio/locales/in/en/products/watches/sheen/_jcr_content/root/responsivegrid/carousel/teaser.casiocoreimg.jpeg/1675940232019/she-1600-679-2.jpeg",
    "https://www.casio.com/content/casio/locales/in/en/products/watches/sheen/_jcr_content/root/responsivegrid/carousel/teaser_copy_copy.casiocoreimg.jpeg/1650855137688/sheen-she-4547.jpeg",
  ],
};
const heroImg = document.getElementById("hero-img");

// if (path in categoryImgPath) {
//   heroImg.src = categoryImgPath[path];
// }

const Dskcarasolearray = [
  "https://i.ibb.co/Gt54Q54/descarasole1.jpg",
  "https://i.ibb.co/Gt54Q54/descarasole1.jpg",
  "https://i.ibb.co/BB2PLtR/carasole3.jpg",
  "https://i.ibb.co/XZ3XN26/carasole4.jpg",
];
const mobcarasolearray = [
  "https://i.ibb.co/F0FDKf3/mcarasole1.jpg",
  "https://i.ibb.co/gy0nnJy/mcarasole2.jpg",
  "https://i.ibb.co/qd3cNf9/mcarasole3.jpg",
  "https://i.ibb.co/7jvpPXk/mcarasole4.jpg",
];

let currentIndex = 0;
let isMobile = window.innerWidth <= 768;
let imageArray = isMobile
  ? categoryImgPath[path] || mobcarasolearray
  : categoryImgPath[path] || Dskcarasolearray;
let autoSlideInterval;
let activeImage = document.getElementById("carousel-image-1");
let inactiveImage = document.getElementById("carousel-image-2");

// Function to load the current image in the carousel
function loadImage() {
  activeImage.src = imageArray[currentIndex];
  inactiveImage.src = imageArray[(currentIndex + 1) % imageArray.length];
}

// Slide images in opposite directions
function slideImages(isNext) {
  if (isNext) {
    activeImage.classList.replace("active", "slide-out");
    inactiveImage.classList.replace("slide-in", "active");
  } else {
    activeImage.classList.replace("active", "slide-out");
    inactiveImage.classList.replace("slide-in", "active");
  }

  // Swap active and inactive references
  [activeImage, inactiveImage] = [inactiveImage, activeImage];

  // Reset classes for next slide
  setTimeout(() => {
    inactiveImage.classList.replace("slide-out", "slide-in");
  }, 700);
}

// Function to start auto sliding every 3 seconds
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    slideImages(true);
    currentIndex = (currentIndex + 1) % imageArray.length;
    setTimeout(() => loadImage(), 700); // Delay to allow for transition
  }, 3000); // Change interval to 3 seconds
}

// Function to stop auto sliding
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
  // Restart auto slide after a delay of 3 seconds of no interaction
  setTimeout(startAutoSlide, 3000);
}

// Event listener to detect screen resize and switch image arrays
window.addEventListener("resize", () => {
  const newIsMobile = window.innerWidth <= 768;
  if (newIsMobile !== isMobile) {
    isMobile = newIsMobile;
    const params = new URLSearchParams(window.location.search);
    let path = params.get("subpath");
    imageArray = isMobile
      ? categoryImgPath[path] || mobcarasolearray
      : categoryImgPath[path] || Dskcarasolearray;
    currentIndex = 0;
    loadImage();
  }
});

// Initialize the carousel
loadImage();
startAutoSlide();

const radioButtons = document.querySelectorAll('input[name="sortBy"]');
radioButtons.forEach((button) => {
  button.addEventListener("change", () => filterProducts(watchesAllData));
});
function filterProducts(products) {
  const params = new URLSearchParams(window.location.search);
  let path = params.get("subpath");
  const category = categoryPath[path] || "";

  if (path == "vintage") {
    const filteredData = products.filter((product) => {
      const val = String(product.subBrand[0]).split("/");
      return val[val.length - 1] == "vintage";
    });
    sortItems(filteredData);
  } else if (category) {
    const filteredData = products.filter(
      (product) => product.brandDisp == category
    );
    sortItems(filteredData);

    // displayCards(filteredData);
  } else {
    displayCards(watchesAllData);
  }
}
filterProducts(watchesAllData);
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
      if (
        product.productLabel.trim() !=
          "SURFRIDER FOUNDATION collaboration model" ||
        product.productLabel.trim() != "RUI HACHIMURA SIGNATURE MODEL"
      ) {
        const card = createCard(product);
        displayProducts.append(card);
      }
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
