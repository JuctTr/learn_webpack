const Spritesmith = require('spritesmith');
const fs = require('fs');
// const path = require('path');

// 写了一半，其他看视频，视频中好像只是去转成雪碧图，没有讲怎么适配background-position

module.exports = function (source) {
    // const callback = this.async();
    const imgs = source.match(/url\((\S*)\?_sprite/g)
    console.log('imgs => ', imgs)
    // 。。。。。。。。。
}

const sprites = [
    './assets/images/DSC_2437.jpg',
    './assets/images/DSC_3070.jpg',
];

Spritesmith.run({ src: sprites }, function handleResult (err, result) {
    console.log(err);
    console.log(result.image);
    console.log(result.coordinates);
    console.log(result.properties);
    // fs.writeFileSync(path.join(__dirname, './dist/images/sprites.jpg'), result.image)
    fs.writeFileSync('./dist/images/sprites.jpg', result.image)
});
