function interactuarCadenas(cadena1, cadena2) {
  const arr1 = cadena1.split('');
  const arr2 = cadena2.split('');
  const response = arr1.map((item, index) => {
    if (item === '+' && item === arr2[index] || item === '-' && item === arr2[index]) return item;
    return 0;
  })
  return response.join('');
}

function generarApodo(nombre) {
  if (nombre.length < 4) throw new Error('Nombre muy corto');
  switch (nombre[2]) {
    case 'a':
    case 'e':
    case 'i':
    case 'o':
    case 'u': {
      return nombre.substring(0, 4);
    }
    default: {
      return nombre.substring(0, 3);
    }
  }
}

function obtenerMarcador(texto) {
  const numeros = {
    uno: 1,
    dos: 2,
    tres: 3,
    cuatro: 4,
    cinco: 5,
    seis: 6,
    siete: 7,
    ocho: 8,
    nueve: 9,
    cero: 0
  }
  const palabras = texto.split(' ');
  const result = palabras.map((palabra) => {
    if (numeros[`${palabra}`] != undefined) return numeros[`${palabra}`];
    return null
  }).filter((value) => value != null)
  return result.length > 0 ? result : [0, 0];
}

class Barco {
  constructor(calado, tripulacion) {
    this.calado = calado;
    this.tripulacion = tripulacion;
  }

  valeLaPena() {
    const puntaje = this.tripulacion * 1.5;
    if (this.calado - puntaje > 20) return true;
    return false;
  }
}
