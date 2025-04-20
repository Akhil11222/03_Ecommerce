// Wait until the webpage fully loads
document.addEventListener("DOMContentLoaded", () => {
  // Our store's products (3 sample products)
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.999 },
  ];

  const cart = []; // Empty shopping cart

  // Get all HTML elements we need to work with
  const productList = document.getElementById("product-list"); // Where products show
  const cartItems = document.getElementById("cart-items"); // Cart items list
  const emptyCartMessage = document.getElementById("empty-cart"); // "Cart is empty" message
  const cartTotalMessage = document.getElementById("cart-total"); // "Total" message
  const totalPriceDisplay = document.getElementById("total-price"); // Total price display
  const checkOutBtn = document.getElementById("checkout-btn"); // Checkout button

  // Show all products on the page
  products.forEach((product) => {
    // Create a product card for each product
    const productDiv = document.createElement("div");
    productDiv.classList.add("product"); // Add CSS styling class

    // Product card content: name, price, and add-to-cart button
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button data-id="${product.id}">Add to cart</button>
    `;

    productList.appendChild(productDiv); // Add to product list
  });

  // Handle clicks on product buttons
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      // Only handle button clicks
      // Get product ID from button's data-id attribute
      const productId = parseInt(e.target.getAttribute("data-id"));

      // Find the clicked product in products array
      const product = products.find((p) => p.id === productId);

      addToCart(product); // Add to shopping cart
    }
  });

  // Add product to cart function
  function addToCart(product) {
    cart.push(product); // Put product in cart array
    renderCart(); // Update cart display
  }

  // Update cart display function
  function renderCart() {
    cartItems.innerText = ""; // Clear current cart items
    let totalPrice = 0; // Reset total price

    if (cart.length > 0) {
      // If cart has items
      emptyCartMessage.classList.add("hidden"); // Hide "empty cart" message
      cartTotalMessage.classList.remove("hidden"); // Show total price

      cart.forEach((item) => {
        // For each item in cart
        totalPrice += item.price; // Add price to total
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(cartItem); // Add to cart display
      });

      totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`; // Update total
    } else {
      // If cart is empty
      emptyCartMessage.classList.remove("hidden"); // Show empty message
      cartTotalMessage.classList.add("hidden"); // Hide total
      totalPriceDisplay.textContent = `$0.00`; // Reset total display
    }
  }

  // Checkout button click handler
  checkOutBtn.addEventListener("click", () => {
    cart.length = 0; // Empty the cart
    alert("Checkout successfully"); // Show success message
    renderCart(); // Update cart display (will show empty)
  });
});
