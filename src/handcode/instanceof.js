export function instance_of (ordinary, construct) {
    const conProto = construct.prototype;
    while (true) {
        if (ordinary === null) {
            return false
        }
        if (ordinary === conProto) {
            return true
        }
        ordinary = ordinary.__proto__
    }
}
