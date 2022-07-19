Array.prototype.myReduce = function (callback, initValue) {
    let pre, index;
    initValue == undefined ? ((pre = this[0]), (index = 1)) : ((pre = initValue), (index = 0));
    for (index; index < this.length; index++) 
        pre = callback(pre, this[index], index);
    return pre;
};

const arr = [1, 2, 3, 4, 5];

console.log("原生reduce:");
const result = arr.reduce((pre, cur, index) => {
    pre.push(cur + 1);
    return pre;
}, []);
console.log(result);

console.log("我的reduce:");
const result1 = arr.myReduce((pre, cur, index) => {
    pre.push(cur + 1);
    return pre;
}, []);
console.log(result1);