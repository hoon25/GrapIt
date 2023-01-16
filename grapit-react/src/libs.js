const _ = {}

export const pipe = (arg, ...fns) => fns.reduce((acc, fn) => fn(acc), arg);

export const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);

export default _;