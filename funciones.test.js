const assert = chai.assert;

describe("Test de funciones", function () {
  describe("Función interactuarCadenas", function () {
    it('Debería devolver "+-0" para las cadenas "+-+" y "+--"', function () {
      assert.strictEqual(interactuarCadenas("+-+", "+--"), "+-0");
    });

    it('Debería devolver "000000" para las cadenas "--++--" y "++--++"', function () {
      assert.strictEqual(interactuarCadenas("--++--", "++--++"), "000000");
    });

    it('Debería devolver "-+-+-+" para las cadenas "-+-+-+" y "-+-+-+"', function () {
      assert.strictEqual(interactuarCadenas("-+-+-+", "-+-+-+"), "-+-+-+");
    });

    it('Debería devolver "-+00" para las cadenas "-++-" y "-+-+"', function () {
      assert.strictEqual(interactuarCadenas("-++-", "-+-+"), "-+00");
    });
  });

  describe("Función generarApodo", function () {
    it('debería devolver "Rob" para "Robert"', function () {
      assert.equal(generarApodo("Robert"), "Rob");
    });

    it('debería devolver "Kim" para "Kimberly"', function () {
      assert.equal(generarApodo("Kimberly"), "Kim");
    });

    it('debería devolver "Jean" para "Jeannie"', function () {
      assert.equal(generarApodo("Jeannie"), "Jean");
    });

    it('debería devolver "Greg" para "Gregory"', function () {
      assert.equal(generarApodo("Gregory"), "Greg");
    });

    it("debería lanzar un error para nombres con menos de 4 caracteres", function () {
      assert.throws(() => generarApodo("Sam"), Error, "Nombre muy corto");
    });
  });

  describe("Función obtenerMarcador", function () {
    it('Debería devolver [4, 0] cuando el input es "El marcador es cuatro cero"', function () {
      assert.deepEqual(obtenerMarcador("El marcador es cuatro cero"), [4, 0]);
    });

    it('Debería devolver [2, 3] cuando el input es "nuevo marcador: dos tres"', function () {
      assert.deepEqual(obtenerMarcador("nuevo marcador: dos tres"), [2, 3]);
    });

    it('Debería devolver [2, 2] cuando el input es "dos dos"', function () {
      assert.deepEqual(obtenerMarcador("dos dos"), [2, 2]);
    });

    it('Debería devolver [2, 0] cuando el input es "Arsenal acaba de recibir otro gol, dos cero"', function () {
      assert.deepEqual(
        obtenerMarcador("Arsenal acaba de recibir otro gol, dos cero"),
        [2, 0]
      );
    });

    it("Debería devolver [0, 0] cuando no hay números en el texto", function () {
      assert.deepEqual(obtenerMarcador("Arsenal vs Chelsea"), [0, 0]);
    });
  });

  describe("Clase Barco", function () {
    it('debería existir un método llamado "valeLaPena"', function () {
      const barco = new Barco(25, 3);
      assert.isFunction(barco.valeLaPena);
    });

    it("debería devolver true si el barco vale la pena saquear", function () {
      const barco = new Barco(25, 3);
      assert.isTrue(barco.valeLaPena());
    });

    it("debería devolver false si el barco no vale la pena saquear", function () {
      const barco = new Barco(18, 5);
      assert.isFalse(barco.valeLaPena());
    });

    it("debería devolver false si el calado es exactamente 20 después de restar el peso de la tripulación", function () {
      const barco = new Barco(23, 2);
      assert.isFalse(barco.valeLaPena());
    });
  });
});
