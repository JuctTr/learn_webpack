console.error('search => ')

// eslint-disable-next-line require-await
// const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms))
// const sleep = ms => new Promise(resolve => {
//     console.log('sleep')
//     setTimeout(() => {
//         console.log('resolve')
//         resolve()
//     }, ms)
// })

const demo = [1, 2, 3, 4].map(item => item * 2)
console.error(demo) // [2, 4, 6, 8]


const demo2 = [1, 2, 3, 4].map(async item => await item * 2)
console.error(demo2)
/**
(4) [Promise, Promise, Promise, Promise]
0: Promise {<fulfilled>: 2}
1: Promise {<fulfilled>: 4}
2: Promise {<fulfilled>: 6}
3: Promise {<fulfilled>: 8}
length: 4
[[Prototype]]: Array(0)
 */
// eslint-disable-next-line no-unused-vars
// const demo3 = [1, 2, 3].map(async num => {
//     console.log('Loop Start')
//     console.log(num)
//     await sleep(3000)
//     console.log('Loop End')
// })
// console.log('mapResult', demo3)
// Loop Start
// 1
// Loop Start
// 2
// Loop Start
// 3
// 3 Loop End
// 3 Loop End
// 3 Loop End
// console.error(demo3)

// 我们期望
// Loop Start
// 1
// Loop End
// Loop Start
// 2
// Loop End
// Loop Start
// 3
// Loop End


// const mapResult = [1, 2].map(async num => {
//     console.log('Loop Start')
//     console.log(num)
//     await sleep(3000)
//     // eslint-disable-next-line no-debugger
//     debugger
//     console.log('Loop End')
// })

// console.log('mapResult', mapResult)
// const sleep = wait => new Promise(resolve => setTimeout(resolve, wait));
// const __main = async function () {
//     // 你的需求其实是在一组 task 中，循环执行，每个都 sleep，并返回结果
//     const tasks = [1, 2, 3];

//     const results = await tasks.reduce(async (previousValue, currentValue) => {
//         // 这里是关键，需要 await 前一个 task 执行的结果
//         // 实际上每个 reduce 每个循环执行都相当于 new Promise
//         // 但第二次执行可以拿到上一次执行的结果，也就是上一个 Promise
//         // 每次执行只要 await 上一个 Promise，即可实现依次执行
//         const results = await previousValue
//         await sleep(1000 * currentValue);
//         console.log(`task ${currentValue} start`)
//         console.log(`${currentValue}`);
//         console.log(`task ${currentValue} end`);
//         results.push(currentValue)
//         return results
//     }, []);

//     console.log(results);
// }

// __main()

// const arr = [1, 2, 3]

// const main = async function () {
//     for (const [item, index] of Object.entries(arr)) {
//         console.error('start -->', index)
//         // await sleep(1000)
//         console.error(item, index)
//     }
// }


// https://www.html.cn/web/javascript/14139.html

