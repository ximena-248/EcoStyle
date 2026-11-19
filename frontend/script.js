
let cart = [];

const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.getElementById('close-modal');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const addButtons = document.querySelectorAll('.btn-detail');
const checkoutForm = document.getElementById('checkout-form');
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
checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue sola

    if (cart.length === 0) {
        alert("Por favor agrega al menos una prenda al carrito.");
        return;
    }

    // Capturamos los datos que escribió el usuario
    const datosPedido = {
    nombre: document.getElementById('nombre')?.value || '',
    direccion: document.getElementById('direccion')?.value ||'',
    telefono: document.getElementById('telefono')?.value ||'',
    metodopago:  document.getElementById('metodopago')?.value || '',
    carrito: cart
};
try {
    const respuesta = await fetch('http://localhost:3000/api/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(datosPedido)
    });

    const resultado = await respuesta.json();

    if (resultado.success) {
        const mensajeBox = document.getElementById('mensaje-exito');
        if (mensajeBox) {
            mensajeBox.style.display = 'block';
            mensajeBox.innerHTML = `Muchas Gracias, <strong>${datosPedido.nombre}</strong>! Tu pedido de EcoStyle ha sido registrado. Nos comunicaremos al <strong>${datosPedido.telefono}</strong> para coordinar el envio.`;
        }
        
    // Limpiar carrito y formulario
    cart = [];
    updateCartUI();
    checkoutForm.reset(); 
    if (typeof cartmodal !== 'undefined') {
        cartModal.classList.remove('active');
    }
    }
} catch (error) {
    console.error("Error al conectar con el servidor", error);
    alert("Hubo un prolema procesando tu pedido. Verifica que el sevidor este encendido.");
}
});