
let cart = [];

const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.getElementById('close-modal');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const addButtons = document.querySelectorAll('.btn-detail');

// Escuchar clics en los botones "Agregar" de cada producto
addButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const card = button.closest('.product-card');
        const name = card.getAttribute('data-name');
        const price = parseFloat(card.getAttribute('data-price'));

        // Agregamos el producto al carrito
        cart.push({ name, price });
        updateCartUI();

        // Efecto visual rápido en el botón
        button.textContent = "¡Agregado! ✓";
        button.style.backgroundColor = "#28a745";
        button.style.color = "#fff";
        
        setTimeout(() => {
            button.textContent = "Agregar";
            button.style.backgroundColor = "transparent";
            button.style.color = "var(--accent-purple)";
        }, 1200);
    });
});

// Función para actualizar los contadores y la lista del carrito
function updateCartUI() {
    cartCount.textContent = cart.length;
    
    // Limpiar lista visual
    cartItemsList.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li style="color: #888; justify-content: center;">Tu carrito está vacío</li>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toLocaleString()} COP</span>
            `;
            cartItemsList.appendChild(li);
        });
    }

    cartTotal.textContent = `$${total.toLocaleString()} COP`;
}

// Abrir el modal del carrito
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
});

// Cerrar el modal del carrito con la "X"
closeModal.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

// Cerrar modal haciendo clic fuera de la caja blanca
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Botón de finalizar compra
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Agrega al menos una prenda antes de finalizar el pedido.");
        return;
    }
    });
// Procesar el formulario de compra, datos y método de pago
checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue sola

    if (cart.length === 0) {
        alert("Por favor agrega al menos una prenda al carrito.");
        return;
    }

    // Capturamos los datos que escribió el usuario
    const name = document.getElementById('buyer-name').value;
    const address = document.getElementById('buyer-address').value;
    const phone = document.getElementById('buyer-phone').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Mensaje completo con la información de envío y el pago elegido
    alert(`¡Gracias por tu compra, ${name}!\n\n📋 Resumen del envío:\n📍 Dirección: ${address}\n📞 Teléfono: ${phone}\n💳 Método de pago: ${paymentMethod}\n\nNos pondremos en contacto contigo por WhatsApp para coordinar el pago y la entrega de tus prendas sostenibles.`);

    // Limpiar carrito y formulario
    cart = [];
    updateCartUI();
    checkoutForm.reset(); 
    cartModal.classList.remove('active');
}); 
alert("¡Muchas gracias por tu compra en EcoStyle! Nos pondremos en contacto contigo para coordinar el envío de tus prendas sostenibles.");
    cart = []; // Vaciar carrito
    updateCartUI();
    cartModal.classList.remove('active');