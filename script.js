const dropdown = document.getElementById("hoverDropdown");
const item = document.getElementById("hoverContent");
let currentPage = "men"
let previousPage = null

function changePage(pageName){
  previousPage = currentPage
  currentPage = pageName
}

function backPreviousPage(){
  console.log("called")
}

function showDropdown(category) {
  let dropdownContent;
  let dropdownWidth;
  let translateValue;

  switch (category) {
    case "watches":
      dropdownContent = watches;
      dropdownWidth = "w-[70rem]";
      translateValue = "-translate-x-[5rem]";
      break;
    case "instruments":
      dropdownContent = calculator;
      dropdownWidth = "w-[70rem]";
      translateValue = "-translate-x-[5rem]";
      break;
    case "calculator":
      dropdownContent = instruments;
      dropdownWidth = "w-[70rem]";
      translateValue = "-translate-x-[5rem]";
      break;
    case "other":
      dropdownContent = other;
      dropdownWidth = "w-[70rem]";
      translateValue = "-translate-x-[5rem]";
      break;

    default:
      return;
  }

  item.innerHTML = `${dropdownContent}`;

  dropdown.classList.remove("w-[70rem]", "w-[30rem]");
  dropdown.classList.add(dropdownWidth);

  dropdown.classList.remove("-translate-x-[5rem]", "translate-x-[10rem]");
  dropdown.classList.add(translateValue);

  dropdown.classList.remove("hidden");
  dropdown.classList.add("opacity-100", "translate-y-1");
}

function hideDropdown() {
  dropdown.classList.add("hidden");
  dropdown.classList.remove("opacity-100", "translate-y-1");
}

document.querySelectorAll(".group").forEach((group) => {
  group.addEventListener("mouseenter", function () {
    showDropdown(this.querySelector("a").innerText);
  });

  group.addEventListener("mouseleave", function () {
    hideDropdown();
  });
});

dropdown.addEventListener("mouseenter", function () {
  dropdown.classList.remove("hidden");
  dropdown.classList.add("opacity-100", "translate-y-1");
});

dropdown.addEventListener("mouseleave", function () {
  hideDropdown();
});


const watches = `<div class="watch-dropdown">
<ul class="flex justify-between list-none p-0 overflow-hidden">
   <li class="font-semibold text-sm my-2 ease-in-out border-b-2 border-transparent  hover:font-bold  cursor-pointer">G-SHOCK</li>
   <ul class="dropdown-items container mx-auto py-8 flex space-x-4">
      <div class="text-center">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem1/tab/item_1719898572045/content_panel_list/content_panel_202407021439276070/image.casiocoreimg.png/1726653913673/02.png" alt="Image 1" class="h-40 w-40 object-cover"> 
         <p>hello</p>
      </div>
      <div class="text-center">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem1/tab/item_1719898572045/content_panel_list/content_panel_202407021439276084/image.casiocoreimg.png/1723444951740/gm-110gc-1a.png" alt="Image 2" class="h-40 w-40 object-cover"> 
         <p>hello</p>
      </div>
      <div class="text-center">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem1/tab/item_1719898572045/content_panel_list/content_panel_2024070215025143411/image.casiocoreimg.png/1722235011028/gr-b300-1a.png" alt="Image 3" class="h-40 w-40 object-cover"> 
         <p>hello</p>
      </div>
   </ul>
</ul >
    </div>
    <div> 
      <li class=" list-none font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500 hover:font-bold  cursor-pointer"">BABY-G</li>
      <ul class="dropdown-items" >

      </ul>
    </div>
    <div> 
      <li class=" list-none font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500 hover:font-bold  cursor-pointer"">EDIFICE</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div> 
      <li class=" list-none font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500 hover:font-bold  cursor-pointer"">PRO TREK</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div>
      <li class="list-none font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500  hover:font-bold cursor-pointer"">SHEEN</li>
      <ul class="dropdown-items">

      </ul>
    </div>
  </ul>
</div>
`;

const calculator = `
<div class="calculator-dropdown">
<ul class="flex justify-between list-none p-0 overflow-hidden">
   <li class="font-semibold text-sm my-2 ease-in-out border-b-2 border-transparent  hover:font-bold  cursor-pointer"></li>
   <ul class="dropdown-items container mx-auto py-8 flex space-x-4">
      <div class="text-center p-2">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem3/tab/nav_tab_item/content_panel_list/content_panel_202406272033571941/image.casiocoreimg.png/1719837870011/fx-991cw-f.png" alt="Image 1" class="h-40 w-40 object-cover"> 
         <div class="pt-4"><a href="./pages/calculator/basicCalculator.html">All Basic Calculators</a></div>
      </div>
      <div class="text-center p-2">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem3/tab/item_1718770052010/content_panel_list/content_panel_202406191336410036/image.casiocoreimg.jpeg/1719839046947/wd-320mt-seq1.jpeg" alt="Image 2" class="h-40 w-40 object-cover"> 
         <div class="pt-4"><a href="./pages/calculator/basicCalculator.html?subpath=practical">Practical Calculators</a></div>
      </div>
      <div class="text-center p-2">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem3/tab/item_1718770052010/content_panel_list/content_panel_202406191310503991/image.casiocoreimg.jpeg/1719838641098/mj-120gst.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
         <div class="pt-4"><a href="./pages/calculator/basicCalculator.html?subpath=check">Check Calculators</a></div>
      </div>
      <div class="text-center p-2">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem3/tab/nav_tab_item/content_panel_list/content_panel_202406272052230743/image.casiocoreimg.jpeg/1730966356628/fx-cg50-seq1.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
         <div class="pt-4"><a href="../EcoFuture_010/pages/calculator/basicCalculatorCategory.html?subpath=waterprotected-dustproof">Water-Protected & Dust-Proof Calculators</a></div>
      </div>
      <div class="text-center p-2">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem3/tab/item_1718770052010/content_panel_list/content_panel_202406191316482854/image.casiocoreimg.jpeg/1730174204679/jw-200sc-pk-seq1.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
         <div class="pt-4"><a href="../EcoFuture_010/pages/calculator/basicCalculatorCategory.html?subpath=colorful">Colorful Calculators</a></div>
      </div>
      <div class="text-center p-2">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem3/tab/item_1718770052010/content_panel_list/content_panel_202406191336410037/image.casiocoreimg.jpeg/1730174212882/dr-140r-we-seq1.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
         <div class="pt-4"><a href="../EcoFuture_010/pages/calculator/basicCalculatorCategory.html?subpath=printer">Printing Calculators</a></div>
      </div>
   </ul>
</ul >

</div>
`;

const instruments = `<div class="instrument-dropdown">
<ul class="flex justify-between list-none p-0 overflow-hidden">
   <li class="font-semibold text-sm my-2 ease-in-out border-b-2 border-transparent  hover:font-bold  cursor-pointer"></li>
   <ul class="dropdown-items container mx-auto py-8 flex space-x-4">
      <div class="text-center p-2">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem2/tab/item_1718778020716/content_panel_list/content_panel_202406191523288730/image.casiocoreimg.jpeg/1731583199682/mini.jpeg" alt="Image 1" class="h-40 w-40 object-cover"> 
         <div class="pt-4"><a href="../music/music.html">All</a></div>
      </div>
      <div class="text-center p-2">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem2/tab/item_1718778020716/content_panel_list/content_panel_202406191523288742/image.casiocoreimg.jpeg/1731583024652/ct-x.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
         <div class="pt-4"><a href="./pages/calculator/basicCalculator.html?subpath=check">CT-X</a></div>
      </div>
      <div class="text-center p-2">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem2/tab/item_1718778020716/content_panel_list/content_panel_202406191523288743/image.casiocoreimg.jpeg/1731583153016/cdp-s.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
         <div class="pt-4"><a href="../EcoFuture_010/pages/calculator/basicCalculatorCategory.html?subpath=waterprotected-dustproof">CDP</a></div>
      </div>
      <div class="text-center p-2">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem2/tab/item_1718778020716/content_panel_list/content_panel_202406191605578885/image.casiocoreimg.jpeg/1731583810079/piano.jpeg" alt="Image 3" class="h-40 w-40 object-cover"> 
         <div class="pt-4"><a href="../EcoFuture_010/pages/calculator/basicCalculatorCategory.html?subpath=colorful">CALVIANO</a></div>
      </div>
      <div class="text-center p-2">
         <img src="https://www.casio.com/content/experience-fragments/casio/locales/in/en/common/header/master/_jcr_content/root/responsivegrid/visual_header_copy_c/globalContainer/globalItem2/tab/item_1718778020716/content_panel_list/content_panel_202406191605578886/image.casiocoreimg.png/1731567559962/ap-750-1.png" alt="Image 3" class="h-40 w-40 object-cover"> 
         <div class="pt-4"><a href="../EcoFuture_010/pages/calculator/basicCalculatorCategory.html?subpath=printer">Casiotone Mini</a></div>
      </div>
   </ul>
</ul >
</div>
`;

const other = `<div class="other-dropdown">

    <div> 
      <li class=" list-none font-semibold  text-xl my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500 hover:font-bold  cursor-pointer"">Label Printers & Tapes</li>
      <ul class="dropdown-items" >

      </ul>
    </div>
    <div> 
      <li class=" list-none font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500 hover:font-bold  cursor-pointer"">Label Printers</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div> 
      <li class=" list-none font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:text-gray-500 hover:font-bold  cursor-pointer"">Label Tapes</li>
      <ul class="dropdown-items">

      </ul>
    </div>

  </ul>
</div>`;


// Open and close side drawer

const hamburger = document.querySelector(".hamburger");
const drawer = document.getElementById("drawer-navigation");

hamburger.addEventListener("click", () => {
  drawer.style.transform = "translateX(0)";
});

document.addEventListener("click", function (event) {
  if (!drawer.contains(event.target) && !hamburger.contains(event.target)) {
    drawer.style.transform = "translateX(-100%)";
  }
});

let touchStartX = 0;

drawer.addEventListener("touchstart", function (e) {
  touchStartX = e.changedTouches[0].screenX;
});

drawer.addEventListener("touchend", function (e) {
  const touchEndX = e.changedTouches[0].screenX;

  if (touchStartX - touchEndX > 50) {
    drawer.style.transform = "translateX(-100%)";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdownButtons = document.querySelectorAll("[data-collapse-toggle]");

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const dropdownId = button.getAttribute("aria-controls");
      const dropdown = document.getElementById(dropdownId);
      dropdown.classList.toggle("hidden");
    });
  });
});

function handleProfileDropdown(isHover) {
  const dropdown2 = document.getElementById("hoverDropdown2");

  if (isHover) {
    dropdown2.classList.remove("hidden");
    dropdown2.classList.remove("opacity-0");
    dropdown2.classList.add("block");
    setTimeout(() => {
      dropdown2.classList.remove("opacity-0");
    }, 0);
  } else {
    dropdown2.classList.add("opacity-0");
    setTimeout(() => {
      dropdown2.classList.add("hidden");
    }, 300);
  }
}
function viewallitem(){
  window.location.href = "pages/viewall.html";
}

function wishlist(){
  window.location.href = "./pages/wishlist.html";
}