const fs = require("fs");

// Loads JSON from a given filepath
// Returns promise, resolving when JSON has been parsed
function LoadFromJSON(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err) throw err;
            resolve(JSON.parse(data));
        });
    });
}

// Saves object to a given filepath
// Returns promise, resolving when JSON has been written 
function SaveToJSON(filepath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, JSON.stringify(data), (err) => {
            if (err) throw err;
            resolve();
        });
    });
}

module.exports = { SaveToJSON, LoadFromJSON };
