function toggleSection() {
  const section = document.getElementById("basic-info");
  if (section.style.display === "none") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}

document.getElementById("add-to-cart-btn").addEventListener("click", () => {
  const item = {
    name: "GM-700P-6A",
    price: "₹ 16,995",
  };

  localStorage.setItem("cartItem", JSON.stringify(item));
  window.location.href = "./cart.html";
});

document.getElementById("favorite-btn").addEventListener("click", () => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const item = {
    name: "GM-700P-6A",
    price: "₹ 16,995",
  };

  if (!wishlist.find((wishlistItem) => wishlistItem.name === item.name)) {
    wishlist.push(item);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Item added to wishlist!");
  } else {
    alert("Item is already in your wishlist.");
  }
});
