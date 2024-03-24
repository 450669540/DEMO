/**
 * 经纬度转换
 *
	  ---------------------
	  作者：車句
	  来源：CSDN
	  原文：https://blog.csdn.net/weixin_39015132/article/details/82958562
 */

/**
 * 将腾讯/高德地图经纬度转换为百度地图经纬度
 */
export default class transMap{
	/**
	 * 将腾讯/高德地图经纬度转换为百度地图经纬度
	 */
	static qqMapTransBMap(lng, lat){
		const XPI = 3.14159265358979324 * 3000.0 / 180.0;
		const x = lng;
		const y = lat;
		const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * XPI);
		const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * XPI);
		const lngs = z * Math.cos(theta) + 0.0065;
		const lats = z * Math.sin(theta) + 0.006;
		return {
			lng: lngs,
			lat: lats
		};
	}

	/**
	 * 将百度地图经纬度转换为腾讯/高德地图经纬度
	 */
	static bMapTransQQMap(lng, lat){
		const XPI = 3.14159265358979324 * 3000.0 / 180.0;
		const x = lng - 0.0065;
		const y = lat - 0.006;
		const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * XPI);
		const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * XPI);
		const lngs = z * Math.cos(theta);
		const lats = z * Math.sin(theta);

		return {
			lng: lngs,
			lat: lats
		};
	}
}
