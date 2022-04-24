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

