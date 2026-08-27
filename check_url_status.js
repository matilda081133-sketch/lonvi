const https = require('https');

const url = 'https://cdn.jsdelivr.net/gh/matilda081133-sketch/lonvi@main/assets/gallery-leaves-square-logo-v6.png';

https.get(url, res => {
    console.log(`Status Code for v6: ${res.statusCode}`);
    console.log("Headers:", res.headers);
}).on('error', err => {
    console.error(err);
});
