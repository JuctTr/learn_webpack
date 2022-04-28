// import { customCall, customApply, customBind } from './call_apply_bind'
// import { instance_of } from './instanceof'
// import { newF } from './new'
const NewF = require('./new')

function Otaku (name, age) {
    this.strength = 60;
    this.age = age;

    return {
        name,
        habit: 'Games',
    }
}

var person = new NewF(Otaku, 'Kevin', '18');

console.log(person.name) // Kevin
console.log(person.habit) // Games
console.log(person.strength) // undefined
console.log(person.age) // undefined

function condition () {
    /* wxa if:app=='h5' */
    console.log('【H5环境】=> ')
    /* wxa else */
    console.log('【小程序环境】=> ')
    /* /wxa  */
    console.log('【全部环境】=> ')
}
condition()

