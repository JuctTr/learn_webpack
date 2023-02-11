export const bar = 'bar';

export const foo = 'foo';

export function noReferenceFn() {
    console.log('noReferenceFn');
}

export class Greet {
    greeting() {
        return 'hello';
    }
}

export class noReferenceClass {
    say() {
        return 'wo wo wo';
    }
}
