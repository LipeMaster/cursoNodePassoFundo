module.exports.somar = (a, b) => a + b;

module.exports.subtrair = (a, b) => {
    if (b < 0){
        return a + b;
    } else {
        return a - b;
    }
}