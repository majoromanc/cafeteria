//VALIDACIÓN DATOS DE CONTACTO
const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const privacidad = document.getElementById("privacidad");

let valida = {
  nombre: false,
  apellido: false,
  telefono: false,
  email: false,
  privacidad: false
};

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.classList.remove("success");
  formControl.classList.add("error");
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.classList.remove("error");
  formControl.classList.add("success");
}

// Validación de Nombre
nombre.addEventListener("blur", () => {
  let name_re = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ]{1,15}$/;
  if (nombre.value.trim() === "") {
    valida.nombre = false;
    setErrorFor(nombre, "El nombre es obligatorio.");
  } else if (!name_re.test(nombre.value.trim())) {
    valida.nombre = false;
    setErrorFor(nombre, "Solo letras, máximo 15 caracteres.");
  } else {
    valida.nombre = true;
    setSuccessFor(nombre);
  }
});

// Validación de Apellidos
apellido.addEventListener("blur", () => {
  let apellido_re = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]{1,40}$/;
  if (apellido.value.trim() === "") {
    valida.apellido = false;
    setErrorFor(apellido, "El apellido es obligatorio.");
  } else if (!apellido_re.test(apellido.value.trim())) {
    valida.apellido = false;
    setErrorFor(apellido, "Solo letras, máximo 40 caracteres.");
  } else {
    valida.apellido = true;
    setSuccessFor(apellido);
  }
});

// Validación de Teléfono
telefono.addEventListener("blur", () => {
  let telefono_re = /^[0-9]{9}$/;
  if (telefono.value.trim() === "") {
    valida.telefono = false;
    setErrorFor(telefono, "El teléfono es obligatorio.");
  } else if (!telefono_re.test(telefono.value.trim())) {
    valida.telefono = false;
    setErrorFor(telefono, "Debe tener 9 dígitos numéricos.");
  } else {
    valida.telefono = true;
    setSuccessFor(telefono);
  }
});

// Validación de Email
email.addEventListener("blur", () => {
  let email_re = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
  if (email.value.trim() === "") {
    valida.email = false;
    setErrorFor(email, "El correo es obligatorio.");
  } else if (!email_re.test(email.value.trim())) {
    valida.email = false;
    setErrorFor(email, "Correo electrónico no válido.");
  } else {
    valida.email = true;
    setSuccessFor(email);
  }
});

// Validación de privacidad
privacidad.addEventListener("change", () => {
  valida.privacidad = privacidad.checked;
});

//PRESUPUESTO 
const selectProducto = document.getElementById('seleccion-producto');
const btnAñadir = document.getElementById('añadir-al-carrito');
const contenedorCarrito = document.getElementById('articulos-carrito');
const checkboxesExtras = document.querySelectorAll('.checkbox-extra');
const inputPlazo = document.getElementById('plazo');
const totalFinal = document.getElementById('total-final');
const btnReset = document.getElementById('borrar');

let carrito = [];

// Añadir producto al carrito
btnAñadir.addEventListener("click", () => {
  const valor = selectProducto.value;
  if (!valor) {
    alert("Debes seleccionar un producto");
    return;
  }
  const [nombreProducto, precioProducto] = valor.split(":");
  const precio = parseFloat(precioProducto);
  carrito.push({ nombre: nombreProducto, precio });
  actualizarCarrito();
});

// Mostrar productos en el carrito
function actualizarCarrito() {
  contenedorCarrito.innerHTML = '';
  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = '<p>No hay productos en el carrito.</p>';
    calcularPresupuesto();
    return;
  }
  carrito.forEach((item, idx) => {
    const div = document.createElement('div');
    div.classList.add('producto-carrito');
    div.innerHTML = `
      <span>${item.nombre} - ${item.precio.toFixed(2)}€</span>
      <button type="button" class="eliminar-item" data-idx="${idx}" title="Quitar del carrito">❌</button>
    `;
    contenedorCarrito.appendChild(div);
  });
  document.querySelectorAll('.eliminar-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-idx'));
      carrito.splice(idx, 1);
      actualizarCarrito();
    });
  });
  calcularPresupuesto();
}

// Calcular el presupuesto total (con descuento por plazo)
function calcularPresupuesto() {
  let totalProductos = carrito.reduce((acc, prod) => acc + prod.precio, 0);
  let totalExtras = Array.from(checkboxesExtras)
    .filter(cb => cb.checked)
    .reduce((acc, cb) => acc + parseFloat(cb.value.split(':')[1]), 0);

  let meses = parseInt(inputPlazo.value, 10);
  if (isNaN(meses) || meses < 1) meses = 1;

  let subtotal = (totalProductos + totalExtras) * meses;
  let descuento = 0;

  // Descuento 10% si el plazo es >= 12 meses, 5% si >= 6 meses
  if (meses >= 12) {
    descuento = subtotal * 0.10;
  } else if (meses >= 6) {
    descuento = subtotal * 0.05;
  }

  let total = subtotal - descuento;
  totalFinal.textContent = `Total final ${total.toFixed(2)}€${descuento > 0 ? ` (descuento aplicado: -${descuento.toFixed(2)}€)` : ''}`;
}

// Eventos para recalcular presupuesto
checkboxesExtras.forEach(cb => cb.addEventListener('change', calcularPresupuesto));
inputPlazo.addEventListener('input', calcularPresupuesto);

// Reset
btnReset.addEventListener('click', () => {
  carrito = [];
  setTimeout(() => {
    actualizarCarrito();
    checkboxesExtras.forEach(cb => cb.checked = false);
    inputPlazo.value = '';
    totalFinal.textContent = `Total final 0€`;
  }, 10);
});

// Validación final al enviar el formulario
formulario.addEventListener("submit", (e) => {
  // Revalidar privacidad
  valida.privacidad = privacidad.checked;
  // Revalidar los campos en caso de que no se haya hecho blur
  nombre.dispatchEvent(new Event('blur'));
  apellido.dispatchEvent(new Event('blur'));
  telefono.dispatchEvent(new Event('blur'));
  email.dispatchEvent(new Event('blur'));

  let error = false;
  for (const campo in valida) {
    if (!valida[campo]) error = true;
  }
  if (error) {
    e.preventDefault();
    alert("Por favor, corrige los errores en los datos de contacto y acepta la privacidad.");
    return;
  }
  if (carrito.length === 0) {
    e.preventDefault();
    alert("Debes añadir al menos un producto al carrito.");
    return;
  }
});

// Inicializar
actualizarCarrito();
calcularPresupuesto();
