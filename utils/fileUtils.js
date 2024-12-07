const crypto = require('crypto');
const path = require('path');

const generateUniqueFileName = (originalName) => {
    const now = new Date();
    const dateString = now.toISOString().replace(/[-T:\.Z]/g, '');
    const randomString = crypto.randomBytes(8).toString('hex');
    const extension = path.extname(originalName);
    return `${dateString}-${randomString}${extension}`;
};

module.exports = {
    generateUniqueFileName
};