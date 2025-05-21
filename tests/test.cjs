const { json } = require("body-parser");
const fs = require("fs");

function LoadFromJSON(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err) throw err;
            resolve(JSON.parse(data));
        });
    });
}

(async () => {
    const tests = await LoadFromJSON("tests/tests.json");
    let testsPassed = 0;
    let id = "";

    for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        test.route += id;

        const result = await Test(test);

        if (result.id) id = result.id;

        if (result.passed) {
            testsPassed += 1;
        }
    }

    console.log(`Passed ${testsPassed}/${tests.length}`);
})();

async function Test(test) {
    console.log(`----- Testing ${test.name} -----`);

    console.log(`REQUEST`);
    console.log(`${test.method} ${test.route}`);
    const res = await fetch(test.route, {
        method: test.method,
        body: JSON.stringify(test.body),
    });

    let data = await res.text();

    console.log(`body: `, test.body ?? "");

    console.log(`RESPONSE`);
    try {
        data = JSON.parse(data);
        console.log("Content-type: json");
    } catch (err) {
        console.log("Content-type: text");
    }
    console.log(data);

    if (res.status != test.status) {
        console.log(
            `Test failed! Expected status: ${test.status}! Got ${res.status}`,
        );
        return { passed: false };
    }
    console.log(`Passed`);
    return { passed: true, id: test.id ? data.product_id : null };
}
