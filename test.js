'use strict';

var assert = require('assert');
var utf8Length = require('./');
require('string.fromcodepoint');

function assertLength(string, expected, stringRepr) {
	var length = utf8Length(new Buffer(string));
	assert.equal(length, expected, 'Length mismatch for "' + stringRepr + '": ' + length + ' != ' + expected);
}

// Char-by-char test
for (var i = 0; i <= 0x10FFFF; i++) {
	assertLength(String.fromCodePoint(i), 1, '\\u{' + i.toString(16) + '}');
}

