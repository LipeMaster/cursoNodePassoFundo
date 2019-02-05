const uri = "http://maps.googleapis.com/maps/api/geocode/json?address=";
const toFind = 'Saturnino de Brito, 74 Jardim Botânico Rio de Janeiro, RJ';

//fazendo a encode
var encToFind = encodeURIComponent(toFind);

var result = uri + encToFind;

console.log('URI codificada:', result);

//Fazendo o decode
var decResult = decodeURIComponent(result);

console.log('URI decodificada:', decResult);