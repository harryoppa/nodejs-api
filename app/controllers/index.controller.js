const path = require('path');
const fs = require('fs');

exports.index = async (ctx) => {
    const src = fs.createReadStream(path.join(__dirname, '../../public/index.html'));
    
    ctx.response.set('Content-Type', 'text/html');
    ctx.body = src
};