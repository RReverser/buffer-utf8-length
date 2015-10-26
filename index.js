'use strict';

module.exports = function (buf) {
	var count = 0;
	// firstly, let's process as much data as possible in uints
	var uints = new Uint32Array(buf.buffer, buf.byteOffset, buf.length >> 2);
	var i = 0;
	for (; i < uints.length; i++) {
		var u = uints[i];
		u = (u >> 7) & (~u >> 6); // we get lowest bits set in each important byte
		count += (u >> 24 & 1) + (u >> 16 & 1) + (u >> 8 & 1) + (u & 1); // count them
	}
	// process left bytes (up to 3) that didn't fit into one more uint
	for (i <<= 2; i < buf.length; i++) {
		var b = buf[i];
		count += (b >> 7) & (~b >> 6);
	}
	return buf.length - count;
};
