# buffer-utf8-length
Fastest implementation of counting UTF-8 byte sequences in a Buffer.

## Benchmark results for 10K chars

```
string-char-by-char x 15,842 ops/sec ±1.22% (92 runs sampled)
buffer-byte-by-byte x 33,463 ops/sec ±1.36% (91 runs sampled)
buffer-utf8-length x 70,088 ops/sec ±2.31% (88 runs sampled)
```

## Installation

```bash
npm install buffer-utf8-length --save
```

## Usage

```javascript
var utf8Length = require('buffer-utf8-length');

var buf = new Buffer('My 🚀 String'); // usually received from 3rd-party
var length = utf8Length(buf);
```

Note that this implementation is also stream-safe and will properly handle byte sequences split across chunks, so you can just add results from each chunk to receive total length if you operate on binary stream like:

```javascript
var through2 = require('through2');
var utf8Length = require('buffer-utf8-length');

var length = 0;

fs.createReadStream('input.txt').pipe(through2(function (data, enc, callback) {
	length += utf8Length(data);
	callback();
}, function (callback) {
	console.log('Total length:', length);
	callback();
}))
```
