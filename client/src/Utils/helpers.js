export const formatCurrency = ({ amount, currency, decimals }, hasDecimals = true) => {
	let value = hasDecimals ? amount.toFixed(decimals) : amount.toFixed(0),
		formated = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

	if(hasDecimals) formated = formated.replace(/(.)(\d{2})$/g, ',$2');

	return `${currency} ${formated}`;
};

export const getCents = value => value.match(/(.\d{2})$/)[1];
