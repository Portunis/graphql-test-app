const fs = require('fs');
const path = require('path');


const schemasDir = path.join(__dirname);


const schemas = fs
    .readdirSync(schemasDir)
    .filter(file => file.endsWith('Schema.js'))
    .reduce((acc, file) => {
        const schemaName = path.basename(file, '.js');
        acc[schemaName] = require(path.join(schemasDir, file));
        return acc;
    }, {});

module.exports = schemas;