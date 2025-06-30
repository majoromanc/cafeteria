const formulario = document.getElementById("formulario");

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const plazo = document.getElementById("plazo");

let valida = {
  nombre: false,
  apellido: false,
  telefono: false,
  email: false,
}

//Mensaje de error
function setErrorFor(input, message){
  //recibe como parametro input y mensaje
  const formControl = input.parentElement;
  const small = formControl.querySelector("small"); //selecciona donde esta escrito el mensaje
  formControl.className = "form-control error"; //selecciona la clase de css
  small.innerText = message;
}

//si todo es correcto 
function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

nombre.addEventListener("blur", () => {
  let name_re = /^[A-Za-z]{1,15}$/;

  if (nombre.value === "" || nombre.value == null) {
    valida.nombre = false;
    setErrorFor(nombre, "No se puede dejar el nombre vacío");
  } else {
    if (!name_re.test(nombre.value)) {
      valida.nombre = false;
      setErrorFor(nombre, "El nombre debe tener entre 1 a 15 caracteres y solo puede contener letras");
    } else {
      valida.nombre = true;
      setSuccessFor(nombre);
    }
  }
});

apellido.addEventListener("blur", () => {
  let apellido_re = /^[A-Za-z ]{1,40}$/;

  if (apellido.value === "" || apellido.value == null) {
    valida.apellido = false;
    setErrorFor(apellido, "No se puede dejar el apellido vacío");
  } else {
    if (!apellido_re.test(apellido.value)) {
      valida.apellido = false;
      setErrorFor(apellido, "El apellido debe tener entre 1 a 40 caracteres y solo puede contener letras");
    } else {
      valida.apellido = true;
      setSuccessFor(apellido);
    }
  }
});

telefono.addEventListener("blur", () => {
  let telefono_re = /^[0-9]{9}$/;

  if (telefono.value === "" || telefono.value == null) {
    valida.telefono = false;
    setErrorFor(telefono, "No se puede dejar el teléfono vacío");
  } else {
    if (!telefono_re.test(telefono.value)) {
      valida.telefono = false;
      setErrorFor(telefono, "El teléfono debe tener 9 dígitos y solo puede contener números");
    } else {
      valida.telefono = true;
      setSuccessFor(telefono);
    }
  }
});

email.addEventListener("blur", () => {
  let email_re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (email.value === "" || email.value == null) {
    valida.email = false;
    setErrorFor(email, "No se puede dejar el correo vacío");
  } else {
    if (!email_re.test(email.value)) {
      valida.email = false;
      setErrorFor(email, "Debe ser un correo válido");
    } else {
      valida.email = true;
      setSuccessFor(email);
    }
  }
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  let errorV = false;

  for (const property in valida) {
    if (valida[property] === false) {
      errorV = true;
    }
  }

  if (!errorV) {
    if (carrito.length === 0) {
      alert("Debes añadir al menos un producto al carrito");
      return;
    }
    formulario.submit();
  }
});

//Array para almacenar los productos
let carrito = [];

//Elementos del DOM
const selectorProductos = document.getElementById("seleccion-producto");
const botonAniadir = document.getElementById("añadir-al-carrito");
const contenedorArticulosCarrito = document.getElementById("articulos-carrito");
const elementoTotalFinal = document.getElementById("total-final");

//Evento agregar producto al carrito
botonAniadir.addEventListener("click", () => {
  const opcionSeleccionada = selectorProductos.options[selectorProductos.selectedIndex];
  const valorSeleccionado = opcionSeleccionada.value;

  if (!valorSeleccionado) {
    alert("Debes seleccionar un producto");
    return;
  }
  const [nombreProducto, precioProducto] = valorSeleccionado.split(":");
  const precio = parseFloat(precioProducto);

  //Agregar producto al carrito
  carrito.push({ nombre: nombreProducto, precio });

  actualizarCarrito();
});

//Actualizar carrito
function actualizarCarrito() {
  //Limpiar contenido previo
  contenedorArticulosCarrito.innerHTML = '';

  let total = 0;

  //Mostrar productos
  carrito.forEach((producto, index) => {
    total += producto.precio;

    const articuloCarrito = document.createElement('div');
    articuloCarrito.classList.add('articulo-carrito');
    articuloCarrito.innerHTML = `
      ${producto.nombre} - ${producto.precio.toFixed(2)}€
      <button class='eliminar-articulo' data-index='${index}'>Eliminar</button>
    `;
    contenedorArticulosCarrito.appendChild(articuloCarrito);
  });

  //Funcionalidad para eliminar productos
  document.querySelectorAll('.eliminar-articulo').forEach((boton) => {
    boton.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      eliminarArticulo(index);
    });
  });

  actualizarTotalFinal();
}

//Eliminar productos del carrito
function eliminarArticulo(index) {
  //Eliminar producto
  carrito.splice(index, 1);

  //Actualizar carrito
  actualizarCarrito();
}

//Calcular precio final
function actualizarTotalFinal() {
  let total = carrito.reduce((suma, item) => suma + item.precio, 0);

  //Sumar precio de los extras seleccionados
  const extrasSeleccionados = document.querySelectorAll(".checkbox-extra:checked");
  extrasSeleccionados.forEach((checkbox) => {
    const [, precioExtra] = checkbox.value.split(':');
    total += parseFloat(precioExtra);
  });

  //Aplicar descuento según el plazo
  const plazoValue = parseInt(plazo.value, 10);
  if (!isNaN(plazoValue) && plazoValue > 0) {
    const descuento = calcularDescuento(plazoValue);
    total -= descuento;
  }

  elementoTotalFinal.textContent = `Total final: ${total.toFixed(2)}€`;
}

//Calcular descuento según el plazo
function calcularDescuento(plazo) {
  let descuento = 0;
  if (plazo >= 1 && plazo <= 30) {
    descuento = 5; // Descuento de 5€ si el plazo es de 1 a 30 días
  } else if (plazo > 30) {
    descuento = 10; // Descuento de 10€ si el plazo es mayor a 30 días
  }
  return descuento;
}

//Evento para actualizar el total al seleccionar/deseleccionar los extras y al cambiar el plazo
const checkboxExtras = document.querySelectorAll('.checkbox-extra');
checkboxExtras.forEach((checkbox) => {
  checkbox.addEventListener('change', actualizarTotalFinal);
});

plazo.addEventListener('input', actualizarTotalFinal);