exports.addhero = function (hero) {
    var fs = require('fs');
    var fileName = __dirname + '/../json/heros.json';
    var file = require(fileName);

    file.push(hero);

    fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
        if (err) return console.log(err);
    });
};



exports.removehero = function (idtoremove) {
    var fs = require('fs');
    var fileName = __dirname + '/../json/heros.json';
    var file = require(fileName);

    file.splice(idtoremove, 1);

    fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {
        if (err) return console.log(err);
    });
};