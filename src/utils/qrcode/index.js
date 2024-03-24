var Taro = require('@tarojs/taro')
var qrcode = require('./qrcode');

function convert_length(length) {
	return Math.round(Taro.getSystemInfoSync().windowWidth * length / 750);
}


function qrc(ctx, code, width, height) {
	qrcode.api.draw(code, {
		ctx: ctx,
		width: convert_length(width),
		height: convert_length(height)
	})
}

module.exports = {
	qrcode: qrc
}
