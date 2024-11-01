const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@css': path.resolve(__dirname, '../src/css'),
            '@components': path.resolve(__dirname, '../src/components'),
            '@utils': path.resolve(__dirname, '../src/utils'),
        },
    }
};
