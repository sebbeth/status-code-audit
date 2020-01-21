
const request = require('request-promise');

async function getStatusCodeForPage(url) {
    const options = {
        method: "GET",
        url,
        simple: false,
        resolveWithFullResponse: true
    }
    const response = await request(options);
    return response.statusCode;
}

async function checkUrls(urls) {
    const results = [];
    await Promise.all(urls.map(async (url) => {
        const status = await getStatusCodeForPage(url);
        results.push({ status, url });
    }));
    return results;
}

const fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');
let urls = [];

fs.readFile(filePath, { encoding: 'utf-8' }, function (error, data) {
    if (error) {
        console.log(error);
    } else {
        urls = data.split("\n");
        console.log("Checking...");
        (async () => {
            let results = await checkUrls(urls);
            results = results.sort((a, b) => (a.status >= b.status));
            results.forEach(result => {
                console.log(result.status, result.url);
            });
            console.log("DONE");
        })()


    }
});


