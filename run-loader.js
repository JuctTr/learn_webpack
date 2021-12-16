// https://github.com/webpack/loader-runner
const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

// 每写一个loader，都要在这里重新定义resource等资源，还有路径

runLoaders(
    {
        resource: path.join(__dirname, './src/demo.txt'),
        loaders: [
            {
                loader: path.join(__dirname, './loaders/raw-loader.js'),
                options: {
                    name: 'test',
                },
            },
            {
                loader: path.join(__dirname, './loaders/sprite-loader.js'),
                options: {
                    name: 'test1',
                },
            },
        ],
        context: {
            emitFile: () => {},
        },
        readResource: fs.readFile.bind(fs),
    },
    (err, result) => {
        err ? console.log(err) : console.log(result);
    }
);
