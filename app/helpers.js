export function HSLCalc(percentage, hue0, hue1) {
	var hue = ((percentage/100) * (hue1 - hue0)) + hue0;
	return 'hsl(' + hue + ', 100%, 50%)';
}

export function htmlToElement(html) {
	var template = document.createElement('template');
	template.innerHTML = html;
	return template.content.firstChild;
}