let cart = [];
let cartTotal = 0;

function toggleCart() {
    const cartModal = document.querySelector('.cart-modal');
    cartModal.classList.toggle('active');
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
}

function updateCartTotal() {
    const totalElement = document.getElementById('cart-total-amount');
    totalElement.textContent = cartTotal.toFixed(2);
}

function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.style.padding = '1rem';
        itemElement.style.borderBottom = '1px solid #333';
        itemElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4>${item.name}</h4>
                    <p>R$ ${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${index})" style="background: #ff4d4d; border: none; color: white; padding: 0.5rem; border-radius: 5px; cursor: pointer;">
                    Remover
                </button>
            </div>
        `;
        cartItems.appendChild(itemElement);
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    cartTotal += price;
    updateCartCount();
    updateCartTotal();
    updateCartDisplay();
    
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

function removeFromCart(index) {
    cartTotal -= cart[index].price;
    cart.splice(index, 1);
    updateCartCount();
    updateCartTotal();
    updateCartDisplay();

    if (cart.length === 0) {
        toggleCart();
    }
}

function finishOrder() {
    let orderMessage = "Pedido: \n";
    cart.forEach(item => {
        orderMessage += `${item.name} - R$ ${item.price.toFixed(2)}\n`;
    });
    orderMessage += `\nTotal: R$ ${cartTotal.toFixed(2)}`;

    const whatsappNumber = '5531999999999'; // Número de WhatsApp para enviar o pedido
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`;
    window.open(whatsappURL, '_blank');
}