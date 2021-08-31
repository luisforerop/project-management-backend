"use strict";

// Iniciamos la funci�n assert de chai
var assert = require('chai').assert; //Funci�n para probar el funcionamiento de nuestro test unitario


var callFunction = function callFunction(a, b) {
  return a + b;
}; // Definimos una suite que contiene test dentro
// Es como una agrupaci�n del conjunto de tests


describe('Suite de prueba para el curso', function () {
  //It describe un caso de test. descripci�n, funci�n
  it('should return 2', function () {
    // Llamamos una funci�n de nuestro backend
    var va = callFunction(1, 1); // Con assert.equal nos aseguramos, por ejemplo, de que la funci�n devuelva 2

    assert.equal(va, 2);
  });
});