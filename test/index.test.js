const Zoomme = require('../src')

beforeEach(() => {
	document.body.innerHTML = '<img src="./zoomme.png" />'
})

describe('zoomme', () => {
  test('', () => {
  	const zm = new Zoomme({
  		container: document.body
  	})
  })
})
