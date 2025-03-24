function ParseNested(object, nestedName) {
    const specifications = {};
    for (let [key, value] of Object.entries(object)) {
        if (key.includes(nestedName)) {
            key = key.split(".")[1];
            specifications[key] = value;
        }
    }
    return specifications;
}

module.exports = { ParseNested };
