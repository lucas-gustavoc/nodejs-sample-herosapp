exports.addhero = function (hero) {
    var fs = require('fs');
    var fileName = __dirname + '/../json/heros.json';
    var file = require(fileName);
    var ret = {};

    file.push(hero);

    try {
        fs.writeFileSync(fileName, JSON.stringify(file, null, 2));
        ret = {"status": true, "message": "Insertion ok."};
    } catch (err) {
        ret = {"status": false, "message": "An error has occured trying to insert the hero. Reload the page."};
    }
    
    return ret;
};



exports.removehero = function (idtoremove) {
    var fs = require('fs');
    var fileName = __dirname + '/../json/heros.json';
    var file = require(fileName);
    var ret = {};

    file.splice(idtoremove, 1);

    try {
        fs.writeFileSync(fileName, JSON.stringify(file, null, 2));
        ret = {"status": true, "message": "Insertion ok."};
    } catch (err) {
        ret = {"status": false, "message": "An error has occured trying to insert the hero. Reload the page."};
    }
    
    return ret;
};