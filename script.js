// Buscador
const buscador = document.querySelector('#buscador');
buscador.addEventListener('keyup', function() {
  const busqueda = this.value.toLowerCase();
  const filas = document.querySelectorAll('.dirlistertable tr.d');
  let juegosNuevos = [];
  let otrosJuegos = [];
  filas.forEach(function(fila) {
    const juego = fila.querySelector('td:nth-child(2)').textContent.toLowerCase();
    if (busqueda === '') {
      if (fila.querySelector('td:nth-child(2) img.new')) {
        juegosNuevos.push(fila);
      } else {
        otrosJuegos.push(fila);
      }
    } else if (juego.indexOf(busqueda) !== -1) {
      if (fila.querySelector('td:nth-child(2) img.new')) {
        juegosNuevos.push(fila);
      } else {
        otrosJuegos.push(fila);
      }
    } else {
      fila.style.display = 'none';
    }
  });
  juegosNuevos.sort((a, b) => a.querySelector('td:nth-child(2)').textContent.localeCompare(b.querySelector('td:nth-child(2)').textContent));
  otrosJuegos.sort((a, b) => a.querySelector('td:nth-child(2)').textContent.localeCompare(b.querySelector('td:nth-child(2)').textContent));
  filas.forEach(fila => fila.style.display = 'none');
  juegosNuevos.forEach(fila => fila.style.display = '');
  otrosJuegos.forEach(fila => fila.style.display = '');
  const tbody = document.querySelector('.dirlistertable tbody');
  juegosNuevos.concat(otrosJuegos).forEach(fila => tbody.appendChild(fila));
});
const checkboxes = document.querySelectorAll('input[name="game"]');
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    let total = 0;
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        const costo = parseInt(checkbox.closest('tr').querySelector('td:nth-child(4)').textContent);
        total += costo;
      }
    });
    document.querySelector('#total').textContent = total + 'Mn';
  });
});
const cells = document.querySelectorAll('.dirlistertable tr.d td:first-child');
cells.forEach(function(cell) {
  cell.addEventListener('click', function(event) {
    var checkbox = cell.querySelector('input[type="checkbox"]');
	if (event.target !== checkbox) {
		checkbox.checked = !checkbox.checked;
		checkbox.dispatchEvent(new Event('change'));
	}
  });
});
window.addEventListener('load', function() {
  const filas = document.querySelectorAll('.dirlistertable tr.d');
  let juegosNuevos = [];
  let otrosJuegos = [];
  filas.forEach(function(fila) {
    if (fila.querySelector('td:nth-child(2) img.new')) {
      juegosNuevos.push(fila);
    } else {
      otrosJuegos.push(fila);
    }
  });
  juegosNuevos.sort((a, b) => a.querySelector('td:nth-child(2)').textContent.localeCompare(b.querySelector('td:nth-child(2)').textContent));
  otrosJuegos.sort((a, b) => a.querySelector('td:nth-child(2)').textContent.localeCompare(b.querySelector('td:nth-child(2)').textContent));
  const tbody = document.querySelector('.dirlistertable tbody');
  juegosNuevos.concat(otrosJuegos).forEach(fila => tbody.appendChild(fila));
});
const nameCells = document.querySelectorAll('.dirlistertable tr.d td:nth-child(2), .dirlistertable tr.d td:nth-child(3), .dirlistertable tr.d td:nth-child(4)');
nameCells.forEach(function(cell) {
	cell.addEventListener('click', function(event){
		var checkbox = cell.parentNode.querySelector('input[type="checkbox"]');
		if(event.target !== checkbox){
			checkbox.checked = !checkbox.checked;
			checkbox.dispatchEvent(new Event('change'));
		}
	});
});
const checkbox = document.querySelectorAll('input[name="game"]');
const comprar = document.querySelector('#comprar');
checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    let total = 0;
    let haySeleccionados = false;
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        const costo = parseInt(checkbox.closest('tr').querySelector('td:nth-child(4)').textContent);
        total += costo;
        haySeleccionados = true;
      }
    });
    document.querySelector('#total').textContent = total + 'Mn';
    comprar.disabled = !haySeleccionados;
  });
});
comprar.addEventListener('click', function() {
  let mensaje = '*Hola, me gustaría grabar en mi PS4 los siguientes juegos:*\n\n';
  let total = 0;
  let tamanoTotal = 0;
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      const nombre = checkbox.closest('tr').querySelector('td:nth-child(2)').textContent;
      const tamano = parseFloat(checkbox.closest('tr').querySelector('td:nth-child(3)').textContent);
      const costo = checkbox.closest('tr').querySelector('td:nth-child(4)').textContent;
      mensaje += nombre + ' - ' + costo + '\n\n';
      total += parseInt(costo);
      tamanoTotal += tamano;
    }
  });
  mensaje += '*Total de tamaño*: ' + tamanoTotal.toFixed(2) + ' Gb\n';
  mensaje += '*Total a pagar*: ' + total + 'Mn\n';
  window.open('https://wa.me/+5359030388?text=' + encodeURIComponent(mensaje));
});
function enumerarJuegos() {
  const filas = document.querySelectorAll('.dirlistertable tr.d');
  filas.forEach(function(fila, index) {
    const celdaNombre = fila.querySelector('td:nth-child(2)');
    let span = celdaNombre.querySelector('span.enumeracion');
    if (!span) {
      span = document.createElement('span');
      span.classList.add('enumeracion');
      celdaNombre.insertBefore(span, celdaNombre.firstChild);
    }
    const numero = (index + 1).toString().padStart(3, '0');
    span.textContent = numero + '. ';
  });
}
enumerarJuegos();