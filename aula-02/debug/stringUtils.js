module.exports.calcula = (msg, totalizador) => {
    totalizador += msg.length;

    return totalizador;
};