document.addEventListener('DOMContentLoaded', () => {
   let carrito = JSON.parse(localStorage.getItem('productos')) || [];
   let precio = parseFloat(localStorage.getItem('total')) || 0;

   const contador = document.querySelector('.contador');
   if (contador) {
      const totalCantidad = carrito.reduce((acc, p) => acc + p.cantidad, 0);
      contador.innerText = totalCantidad;
   }

   const cards = document.querySelectorAll('.tarjetas');
   if (cards.length === 0) return;

   cards.forEach(tarjeta => {
      const btnClic = tarjeta.querySelector('button');
      const productTitle = tarjeta.querySelector('h3').textContent;
      const productImg = tarjeta.querySelector('img').src;
      const productPrice = tarjeta.querySelector('.Tarjeta-precio span').textContent;

      const tipoProducto = tarjeta.getAttribute('data-tipo');

      btnClic.addEventListener('click', () => {
         if(tipoProducto === 'relleno'){
            Swal.fire({
               title: 'Elegí el relleno',
               input: 'radio',
               inputOptions: {
                  dulce: 'Dulce de Leche',
                  nutella: 'Nutella'
               },
               inputValidator: (value) => {
                  if (!value) {
                     return 'Tenés que elegir una opción para continuar';
                  }
               },
               showCancelButton: true,
               confirmButtonText: 'Agregar al carrito',
               cancelButtonText: 'Cancelar',
            }).then((result) => {
               if(result.isConfirmed){
                  agregarAlCarrito('relleno', result.value);
               }
            });
         }
         else if(tipoProducto === 'decoracion'){
            Swal.fire({
               title: 'Elegí la decoración',
               input: 'radio',
               inputOptions: {
                  simple: 'Decoración Simple',
                  media: 'Decoración Media',
                  premium: 'Decoración Premium'
               },
               inputValidator: (value) => {
                  if (!value) {
                     return 'Tenés que elegir una opción para continuar';
                  }
               },
               showCancelButton: true,
               confirmButtonText: 'Agregar al carrito',
               cancelButtonText: 'Cancelar',
            }).then((result) => {
               if(result.isConfirmed){
                  agregarAlCarrito('decoracion', result.value);
               }
            });
         }
         else if(tipoProducto === 'cobertura'){
            Swal.fire({
               title: 'Elegí la cobertura',
               input: 'radio',
               inputOptions: {
                  crema: 'Crema',
                  ballina: 'Ballina'
               },
               inputValidator: (value) => {
                  if (!value) {
                     return 'Tenés que elegir una opción para continuar';
                  }
               },
               showCancelButton: true,
               confirmButtonText: 'Agregar al carrito',
               cancelButtonText: 'Cancelar',
            }).then((result) => {
               if(result.isConfirmed){
                  agregarAlCarrito('cobertura', result.value);
               }
            });
         }
         else {
            agregarAlCarrito(null, null);
         }
      });

      function agregarAlCarrito(tipo, opcionElegida) {
         const yaExiste = carrito.find(p => p.title === productTitle && ((tipo && p[tipo] === opcionElegida) || (!tipo)));
         if(yaExiste){
            Swal.fire({
               icon: 'info',
               title: 'Oops...',
               text: 'El producto con esa opción ya está agregado',
               showConfirmButton: false,
               timer: 1500
            });
            return;
         }

         let nuevoProducto = {
            title: productTitle,
            img: productImg,
            price: productPrice,
            cantidad: 1
         };

         if(tipo && opcionElegida){
            nuevoProducto[tipo] = opcionElegida;
         }

         carrito.push(nuevoProducto);
         precio += parseFloat(productPrice);

         localStorage.setItem('productos', JSON.stringify(carrito));
         localStorage.setItem('total', precio.toFixed(2));

         if(contador){
            const totalCantidad = carrito.reduce((acc, p) => acc + p.cantidad, 0);
            contador.innerText = totalCantidad;
         }

         Swal.fire({
            title: '¡Producto agregado!',
            html: `Has agregado: <b>${productTitle}</b><br>${tipo ? tipo.charAt(0).toUpperCase() + tipo.slice(1) : ''}: <b>${opcionElegida ? opcionElegida.charAt(0).toUpperCase() + opcionElegida.slice(1) : 'N/A'}</b>`,
            imageUrl: productImg,
            imageWidth: 150,
            imageHeight: 150,
            imageAlt: productTitle,
            timer: 2500,
            timerProgressBar: true,
            showConfirmButton: false,
            position: 'top-end',
            toast: true
         });
      }
   });
});