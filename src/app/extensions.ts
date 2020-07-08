String.prototype.removeAccents = function(): string {
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	let value = this;
	return value.split('').map( letra => acentos[letra] || letra).join('').toString();
};
