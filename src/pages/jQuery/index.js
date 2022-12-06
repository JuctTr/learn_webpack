// import $ from 'jquery';
// import _ from 'lodash';

// 配置好eslint，直接使用全局变量 $ 和 _

$.when($.ready).then(function () {
    console.log('ready => ');
    const $p = '<h1>我是段落</h1>';

    $('#root').append($p);
    const arr = [
        [1, 2, 3],
        [4, [5, 6]],
    ];
    console.log(_.flatten(arr));
});
