const fs = require("fs");

function LoadFromJSON(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err) throw err;
            resolve(JSON.parse(data));
        });
    });
}
function SaveToJSON(filepath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, JSON.stringify(data), (err) => {
            if (err) throw err;
            resolve();
        });
    });
}

module.exports = { SaveToJSON, LoadFromJSON };
