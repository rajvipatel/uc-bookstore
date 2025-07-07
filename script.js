// Sample product data
const products = [
    {
        id: 1,
        name: "Chocolate Croissant",
        description: "Buttery, flaky pastry filled with rich dark chocolate",
        price: 4.50,
        emoji: "🥐"
    },
    {
        id: 2,
        name: "Blueberry Muffin",
        description: "Fresh blueberries in a tender, vanilla-scented muffin",
        price: 3.25,
        emoji: "🧁"
    },
    {
        id: 3,
        name: "Artisan Sourdough",
        description: "Traditional sourdough bread with a perfect crust",
        price: 6.00,
        emoji: "🍞"
    },
    {
        id: 4,
        name: "Red Velvet Cupcake",
        description: "Moist red velvet cake topped with cream cheese frosting",
        price: 4.75,
        emoji: "🧁"
    },
    {
        id: 5,
        name: "Apple Cinnamon Danish",
        description: "Flaky pastry with spiced apples and cinnamon glaze",
        price: 4.25,
        emoji: "🥧"
    },
    {
        id: 6,
        name: "Chocolate Chip Cookies",
        description: "Classic cookies with premium chocolate chips (6 pack)",
        price: 8.50,
        emoji: "🍪"
    },
    {
        id: 7,
        name: "Lemon Tart",
        description: "Tangy lemon curd in a buttery pastry shell",
        price: 5.25,
        emoji: "🍋"
    },
    {
        id: 8,
        name: "Cinnamon Roll",
        description: "Warm, gooey cinnamon roll with vanilla glaze",
        price: 3.75,
        emoji: "🌀"
    }
];

// Cart functionality
let cart = [];

// DOM elements
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const checkoutModal = document.getElementById('checkout-modal');
const successModal = document.getElementById('success-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutForm = document.getElementById('checkout-form');
const checkoutItems = document.getElementById('checkout-items');
const checkoutTotal = document.getElementById('checkout-total');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartUI();
    setupEventListeners();
});

// Load products into the grid
function loadProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    checkoutTotal.textContent = totalPrice.toFixed(2);
    
    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <p>Your cart is empty</p>
                <p>Add some delicious treats!</p>
            </div>
        `;
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="item-info">
                    <div class="item-name">${item.emoji} ${item.name}</div>
                    <div class="item-price">$${item.price.toFixed(2)} each</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
    
    // Update checkout items
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.emoji} ${item.name} x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Cart button
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });
    
    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            cartModal.style.display = 'none';
            checkoutModal.style.display = 'block';
        }
    });
    
    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Checkout form submission
    checkoutForm.addEventListener('submit', handleCheckout);
    
    // Success modal close button
    document.querySelector('.close-success-btn').addEventListener('click', () => {
        successModal.style.display = 'none';
        cart = [];
        updateCartUI();
    });
    
    // Format card number input
    document.getElementById('card-number').addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
    
    // Format expiry date input
    document.getElementById('expiry').addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
    
    // Format CVV input
    document.getElementById('cvv').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });
}

// Handle checkout form submission
async function handleCheckout(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        customer: {
            name: document.getElementById('customer-name').value,
            email: document.getElementById('customer-email').value,
            phone: document.getElementById('customer-phone').value,
            address: {
                street: document.getElementById('address').value,
                city: document.getElementById('city').value,
                zip: document.getElementById('zip').value
            }
        },
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        payment: {
            cardNumber: document.getElementById('card-number').value,
            expiryDate: document.getElementById('expiry').value,
            cvv: document.getElementById('cvv').value
        }
    };
    
    // Show loading state
    const submitBtn = e.target.querySelector('.place-order-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Processing...';
    submitBtn.disabled = true;
    
    try {
        // Simulate API call to Java backend
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        if (response.ok) {
            const result = await response.json();
            showOrderSuccess(result.orderId);
        } else {
            throw new Error('Order failed');
        }
    } catch (error) {
        // For demo purposes, simulate successful order
        console.log('Order data:', orderData);
        setTimeout(() => {
            const orderId = 'SD' + Date.now().toString().slice(-6);
            showOrderSuccess(orderId);
        }, 2000);
    }
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
}

// Show order success
function showOrderSuccess(orderId) {
    checkoutModal.style.display = 'none';
    document.getElementById('order-id').textContent = orderId;
    successModal.style.display = 'block';
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth scroll to products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth'
    });
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Validate form inputs
function validateForm() {
    const requiredFields = [
        'customer-name', 'customer-email', 'customer-phone',
        'address', 'city', 'zip', 'card-number', 'expiry', 'cvv'
    ];
    
    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.focus();
            showNotification(`Please fill in ${field.previousElementSibling.textContent}`);
            return false;
        }
    }
    
    // Validate email
    const email = document.getElementById('customer-email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address');
        return false;
    }
    
    // Validate card number (basic check)
    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        showNotification('Please enter a valid card number');
        return false;
    }
    
    return true;
}

// Initialize cart from localStorage if available
function initializeCart() {
    const savedCart = localStorage.getItem('bakery-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('bakery-cart', JSON.stringify(cart));
}

// Update cart functions to save to localStorage
const originalAddToCart = addToCart;
addToCart = function(productId) {
    originalAddToCart(productId);
    saveCart();
};

const originalRemoveFromCart = removeFromCart;
removeFromCart = function(productId) {
    originalRemoveFromCart(productId);
    saveCart();
};

const originalUpdateQuantity = updateQuantity;
updateQuantity = function(productId, change) {
    originalUpdateQuantity(productId, change);
    saveCart();
};

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', initializeCart);