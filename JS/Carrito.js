function handleCart() {
   const CARRITO = JSON.parse(localStorage.getItem('productos')) || [];
   const TOTAL = parseFloat(localStorage.getItem('total')) || 0;

   const carritoContainer = document.getElementById('item-products');
   carritoContainer.innerHTML = '';

   if (CARRITO.length === 0) {
      carritoContainer.innerHTML = `<p>No hay productos en el carrito.</p>`;
      return;
   }

   const tabla = document.createElement('table');
   tabla.classList.add('table');

   const encabezado = `
      <thead>
         <tr>
            <th></th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Eliminar</th>
         </tr>
      </thead>
   `;

   let cuerpo = '<tbody>';
   CARRITO.forEach((producto, index) => {
      cuerpo += `
         <tr>
            <td><img src="${producto.img}" width="100"></td>
            <td>${producto.title}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.price}</td>
            <td><button class="eliminar-producto" data-index="${index}">🗑️</button></td>
         </tr>
      `;
   });
   cuerpo += '</tbody>';

   tabla.innerHTML = encabezado + cuerpo;
   carritoContainer.appendChild(tabla);

   const precioFinal = document.createElement('p');
   precioFinal.id = 'total-precio';
   precioFinal.innerText = `Total a pagar: $${TOTAL.toFixed(2)}`;
   carritoContainer.appendChild(precioFinal);

   document.querySelectorAll('.eliminar-producto').forEach(btn => {
      btn.addEventListener('click', eliminarProducto);
   });
}

function eliminarProducto(e) {
   const index = parseInt(e.target.getAttribute('data-index'));
   let productos = JSON.parse(localStorage.getItem('productos')) || [];
   let total = parseFloat(localStorage.getItem('total')) || 0;

   const eliminado = productos[index];
   total -= parseFloat(eliminado.price);

   productos.splice(index, 1);

   localStorage.setItem('productos', JSON.stringify(productos));
   localStorage.setItem('total', total.toFixed(2));


   const contador = document.querySelector('.contador');
   if (contador) {
      contador.innerText = productos.reduce((acc, p) => acc + p.cantidad, 0);
   }

   handleCart();
}

function limpiarCarrito() {
   if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
      localStorage.removeItem('productos');
      localStorage.removeItem('total');

      const contador = document.querySelector('.contador');
      if (contador) {
         contador.innerText = '0';
      }

      const carritoContainer = document.getElementById('item-products');
      carritoContainer.innerHTML = '';

      handleCart();
   }
}

document.addEventListener('DOMContentLoaded', handleCart);
window.limpiarCarrito = limpiarCarrito;