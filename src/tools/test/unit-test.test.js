// Iniciamos la funci�n assert de chai
const assert = require('chai').assert;

//Funci�n para probar el funcionamiento de nuestro test unitario
const callFunction = (a, b) => a + b;


// Definimos una suite que contiene test dentro
// Es como una agrupaci�n del conjunto de tests
describe('Suite de prueba para el curso', () => {
    //It describe un caso de test. descripci�n, funci�n
    it('should return 2', () => {
        // Llamamos una funci�n de nuestro backend
        let va = callFunction(1, 1);
        // Con assert.equal nos aseguramos, por ejemplo, de que la funci�n devuelva 2
        assert.equal(va, 2);
    });
});
