// Lista de productos (puedes obtenerla de una base de datos o API en un entorno real)
const productos = [
    { id: 1, nombre: "Camiseta Ferxxo", precio: 35.00, imagen: "https://th.bing.com/th/id/OIP.jgLVLEXmBAnb-DFNzbTtKgHaHW?rs=1&pid=ImgDetMain" },
    { id: 2, nombre: "Camisa Blanca", precio: 30.00, imagen: "https://th.bing.com/th/id/OIP.V7TkTmlp0TwUQwfVbkbXOAHaHa?rs=1&pid=ImgDetMain" },
    { id: 3, nombre: "Camisa Negra", precio: 100.00, imagen: "https://http2.mlstatic.com/D_NQ_NP_939093-MCO52524990021_112022-W.jpg" },
    { id: 4, nombre: "Camisa SOHO (Edition Especial)", precio: 80.00, imagen: "https://detharstore.com/wp-content/uploads/2022/07/Summer-mens-clothing-2022-dethar-store-7-1000x1000-1000x1000-1000x1000.jpg" },
    // Agrega más productos según sea necesario
  ];
  
  const productosContainer = document.getElementById("productos");
  const carritoContainer = document.getElementById("lista-carrito");
  const totalContainer = document.getElementById("total");
  
  // Mostrar productos en la tienda
  productos.forEach(producto => {
    const productoElement = document.createElement("div");
    productoElement.className = "producto";
    productoElement.innerHTML = `
      <h2>${producto.nombre}</h2>
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    productosContainer.appendChild(productoElement);
  });
  
  // Carrito de compras
  const carrito = [];
  
  // Función para agregar productos al carrito
  function agregarAlCarrito(productoId) {
    const productoSeleccionado = productos.find(producto => producto.id === productoId);
  
    if (productoSeleccionado) {
      // Verificar si el producto ya está en el carrito
      const productoEnCarrito = carrito.find(item => item.id === productoId);
  
      if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
      } else {
        carrito.push({
          id: productoSeleccionado.id,
          nombre: productoSeleccionado.nombre,
          precio: productoSeleccionado.precio,
          cantidad: 1,
        });
      }
  
      actualizarCarrito();
    }
  }
  
  // Función para actualizar el carrito
  function actualizarCarrito() {
    // Limpiar el contenido actual del carrito
    carritoContainer.innerHTML = "";
    // Actualizar la lista de productos en el carrito
    carrito.forEach(item => {
      const carritoItem = document.createElement("li");
      carritoItem.className = "carrito-item";
      carritoItem.innerHTML = `
        <span>${item.nombre} x${item.cantidad}</span>
        <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
        <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
      `;
      carritoContainer.appendChild(carritoItem);
    });
  
    // Actualizar el total
    const nuevoTotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    totalContainer.innerText = nuevoTotal.toFixed(2);
  }
  
  // Función para eliminar productos del carrito
  function eliminarDelCarrito(productoId) {
    const index = carrito.findIndex(item => item.id === productoId);
    if (index !== -1) {
      carrito.splice(index, 1);
      actualizarCarrito();
    }
  }
  