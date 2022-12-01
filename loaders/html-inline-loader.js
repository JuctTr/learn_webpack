const fs = require('fs');
const path = require('path');

const getContent = (matched, reg, resourcePath) => {
    const result = matched.match(reg);
    const relativePath = result && result[1];
    const absolutePath = path.join(path.dirname(resourcePath), relativePath);
    return fs.readFileSync(absolutePath, 'utf-8');
};

// 匹配HTML标签
// /<([a-zA-Z]+)\s?([a-zA-Z]+=".*")?\s?(?:\/>|><\/[a-zA-Z]+>)/g;

function htmlInlineLoader(source, sourceMap, meta) {
    const htmlReg = /<link\s?.*(href=".*\?__inline").*\s?(?:\/>|><\/link>)/g;
    const jsReg = /<script\s?.*(src=".*\?__inline").*\s?(?:\/>|><\/script>)/g;

    source = source
        .replace(htmlReg, matched => {
            const styleContent = getContent(matched, /href="(.*)\?__inline/, this.resourcePath);
            return `<style>${styleContent}</style>`;
        })
        .replace(jsReg, matched => {
            const jsContent = getContent(matched, /src="(.*)\?__inline/, this.resourcePath);
            return `<script type="text/javascript">${jsContent}</script>`;
        });

    const options = this.query;

    const esModule = options.esModule === true ? true : false;

    return `${esModule ? 'export default' : 'module.exports ='} ${JSON.stringify(source)};`;
}

module.exports = htmlInlineLoader;
