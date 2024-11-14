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
    <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer" >G-SHOCK</li>
      <ul class="dropdown-items">
       
      </ul>
    </div>
    <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000] hover:font-bold hover:scale-105 cursor-pointer"">BABY-G</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000] hover:font-bold hover:scale-105 cursor-pointer"">EDIFICE</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000] hover:font-bold hover:scale-105 cursor-pointer"">PRO TREK</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div>
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer"">SHEEN</li>
      <ul class="dropdown-items">

      </ul>
    </div>
  </ul>
</div>
`;

const calculator = `
<div class="calculator-dropdown">
  <ul class="flex justify-between list-none gap-2 overflow-hidden">
    <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer" >G-SHOCK</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer"">BABY-G</li>
      <ul class="dropdown-items"> 
 
      </ul> 
    </div> 
    <div>  
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer"">EDIFICE</li>
      <ul class="dropdown-items"> 
 
      </ul> 
    </div> 
    <div>  
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer"">PRO TREK</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div>
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer"">SHEEN</li>
      <ul class="dropdown-items">

      </ul>
    </div>
  </ul>
</div>
`;

const instruments = `<div class="instrument-dropdown">
  <ul class="flex justify-between list-none p-0 overflow-hidden">
      <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer" >G-SHOCK</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer"">BABY-G</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer"">EDIFICE</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer"">PRO TREK</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div>
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer"">SHEEN</li>
      <ul class="dropdown-items">

      </ul>
    </div>
  </ul>
</div>
`;

const other = `<div class="other-dropdown">
  <ul class="flex justify-between list-none p-0 overflow-hidden">
    <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer" >G-SHOCK</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer"">BABY-G</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer"">EDIFICE</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div> 
      <li class="font-semibold  text-sm my-2 ease-in-out border-b-2 border-transparent hover:border-[#000000]  hover:font-bold hover:scale-105 cursor-pointer"">PRO TREK</li>
      <ul class="dropdown-items">

      </ul>
    </div>
    <div>
      <li class="font-semibold  text-sm my-2 ease-in-out hover:font-bold hover:scale-105 cursor-pointer"">SHEEN</li>
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
