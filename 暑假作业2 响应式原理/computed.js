const targetMap = new WeakMap();
let activeEffect = null;
const runEffect = (effect) => {
    activeEffect = effect;
    activeEffect();
    activeEffect = null;
};
function track(target, key) {
    if (activeEffect !== null) {
        let sets = targetMap.get(target);
        if (sets !== undefined) {
            let arr = sets.get(key);
            if (arr !== undefined) {
                sets.set([...arr, activeEffect]);
            } else {
                arr = new Set();
                sets.set(key, arr.add(activeEffect));
            }
        } else {
            targetMap.set(target, (sets = new Map()));
            sets.set(key, [activeEffect]);
        }
    }
}
function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    const dep = depsMap.get(key);
    if (!dep) return;
    dep.forEach((effect) => effect());
}
const reactive = (target) => {
    return new Proxy(target, {
        get(target, key, receiver) {
            track(target, key);
            return Reflect.get(...arguments);
        },
        set(target, key, value, receiver) {
            Reflect.set(...arguments);
            trigger(target, key);
        },
    });
};
//以上是照搬之前的


const computed = (effect) => {//主要依赖reactive？reactive里依赖的值变化，执行传入computed里的函数？
    // let result = ref();
    let result = {}; //为什么这里是空对象也可以？是我的reactive写错了吗？
    runEffect(() => (result.value = effect())); //把这个函数添加到依赖，effect的返回值作为value的值
    return result;
};

let product = reactive({ price: 10, quantity: 2 });

let salePrice = computed(() => {
    return product.price * 0.9;
})
let total = computed(() => {
    return salePrice.value * product.quantity;
})

console.log(total.value, salePrice.value);
product.quantity = 5;
console.log(total.value, salePrice.value);
product.price = 20;
console.log(total.value, salePrice.value);