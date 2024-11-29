// Dark Mode Toggle Script
const toggleButton = document.getElementById('darkModeToggle');

// Check localStorage for user's preference
if (localStorage.getItem('🌙') === 'enabled') {
    document.body.classList.add('dark-mode');
    toggleButton.textContent = '☀️ '; // Update button text
}

// Toggle dark mode on button click
toggleButton.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    toggleButton.textContent = isDarkMode ? '☀️' : '🌙';

    // Save preference in localStorage
    if (isDarkMode) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
});

let cart = [];

// Add product to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productId = this.getAttribute('data-id');
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));
        const image = this.getAttribute('data-image');

        // Load cart from localStorage
        cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if the product is already in the cart
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1, image: image });
        }

        // Save the cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Redirect to the budget page
        window.location.href = "budget.html";
    });
});

// Load cart data from localStorage (for budget.html or any page)
function loadCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();
}

// Update cart display on budget.html
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalCostElement = document.getElementById('total-cost');
    const budget = 500; // Set your budget limit here

    cartItemsContainer.innerHTML = ''; // Clear existing items
    let totalCost = 0;

    cart.forEach(item => {
        totalCost += item.price * item.quantity;

        // Create a cart item element
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <p><strong>${item.name}</strong></p>
                <p>Price: ₹${item.price.toFixed(2)}</p>
                <p>Quantity: 
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </p>
                <button class="delete-btn" data-id="${item.id}">🗑️ Delete</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Update the total cost
    totalCostElement.textContent = `₹${totalCost.toFixed(2)}`;

    // Check if the budget is exceeded
    if (totalCost > budget) {
        alert('You have exceeded your budget!');
    }
}

// Event listener for quantity and delete buttons
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('quantity-btn')) {
        const productId = e.target.getAttribute('data-id');
        const product = cart.find(item => item.id === productId);

        if (e.target.classList.contains('increase')) {
            product.quantity++;
        } else if (e.target.classList.contains('decrease') && product.quantity > 1) {
            product.quantity--;
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    if (e.target.classList.contains('delete-btn')) {
        const productId = e.target.getAttribute('data-id');
        cart = cart.filter(item => item.id !== productId);

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
});

// Load the cart when on budget.html
if (window.location.pathname.includes('budget.html')) {
    loadCart();
}
// Add click event listeners to category cards in index.html
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.getAttribute('data-category'); // Get the category
        window.location.href = `categories.html?category=${category}`; // Redirect with category parameter
    });
});
  function toggleMenu() {
    const navbar = document.querySelector('.navibar');
    navbar.classList.toggle('active'); // Toggle the 'show' class
  }
