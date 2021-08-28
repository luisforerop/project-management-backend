const chai = require('chai');
const chaiHTTP = require('chai-http');

// La funci�n chai.use acepta plugins para que podamos agregar funcionalidades a los test
chai.use(chaiHTTP);

// Importamos el objeto app. Con '..' regresamos un directorio
const app = require('../../app').app;

describe('Test de integraci�n suite de prueba e2e', () => {
	it('should return hello world', (done) => {
		// Usamos el servidor app
		chai.request(app)
			// Hacemos la petici�n get
			.get('/')
			// Acepta una funci�n que nos permite recoger la llamada
			.end((err, res) => {
				// Comprabamos que lo que nos ha devuelto tiene sentido
				chai.assert.equal(res.text, 'mucho texto')
				done();
			});
	});
});
