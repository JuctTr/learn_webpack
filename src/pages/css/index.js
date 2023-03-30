import './index.scss';
import './other.scss';
import './exclude.scss';
import './regexp.css';

// 完整版本
new Vue({
    computed: {
        iIsComputed() {
            return 'iIsComputed' + this.onlyOne;
        },
    },
    data() {
        return {
            title: '标题',
            onlyOne: '只有一个数据',
        };
    },
    methods: {
        pushItem() {
            this.arr.push(Math.floor(7 * Math.random()));
        },
    },
}).$mount('#root');
