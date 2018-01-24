/**
 * Return string with ARS currency format
 * @param {Object} price Price object with amount, currency and decimals properties
 * @param {Boolean} hasDecimals Display or not decimals
 * @return {String} Price w/ ARS currency format
 */
export const formatCurrency = ({ amount, currency, decimals }, hasDecimals = true) => {
	let value = hasDecimals ? amount.toFixed(decimals) : amount.toFixed(0),
		formated = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

	if(hasDecimals) formated = formated.replace(/(.)(\d{2})$/g, ',$2');

	return `${currency} ${formated}`;
};

/**
 * Return string with price decimals
 * @param {Object} value Price w/ ARS currency format
  * @return {String} String with price decimals format ,XX
 */
export const getCents = value => value.match(/(.\d{2})$/)[1];
