let cart = [];
let cartCount = 0;

function toggleCart() {
    const cartModal = document.querySelector('.cart-modal');
    cartModal.classList.toggle('active');
}

function addToCart(item, price) {
    cart.push({ item, price });
    cartCount++;
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCountElement = document.querySelector('.cart-count');
    const cartTotalElement = document.getElementById('cart-total-amount');
    
    // Atualizar contagem do carrinho
    cartCountElement.textContent = cartCount;
    
    // Atualizar itens do carrinho
    cartItemsContainer.innerHTML = cart.map(cartItem => {
        return `
            <div class="cart-item">
                <span>${cartItem.item}</span> - R$ ${cartItem.price.toFixed(2)}
            </div>
        `;
    }).join('');
    
    // Atualizar total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalElement.textContent = total.toFixed(2);
}

function finishOrder() {
    let orderMessage = `*Pedido da Sabor Express*\n\n`;
    cart.forEach(item => {
        orderMessage += `${item.item} - R$ ${item.price.toFixed(2)}\n`;
    });
    orderMessage += `\nTotal: R$ ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`;
    const whatsappURL = `https://wa.me/5511999999999?text=${encodeURIComponent(orderMessage)}`;
    
    window.open(whatsappURL, '_blank');
}