export const arrayFill = (value, length) => {
    if (typeof (value) === 'object' && value.length > 1) {
        return value;
    }
    const arr = new Array(length);
    return arr.fill(value);
}