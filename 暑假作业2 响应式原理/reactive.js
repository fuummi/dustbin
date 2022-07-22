const targetMap = new WeakMap();

let activeEffect = null;//这里同ref
const runEffect = (effect) => {
    activeEffect = effect;
    activeEffect();
    activeEffect = null;
};

function track(target, key) {
    if (activeEffect !== null) {
        let sets = targetMap.get(target); //以对象为键
        if (sets !== undefined) {
            let arr = sets.get(key); //以对象键为键，对象的每一个值都要有一个依赖数组
            if (arr !== undefined) {
                sets.set([...arr, activeEffect]);
            }else{
                arr = new Set()
                sets.set(key,arr.add(activeEffect));//如果没有就新建
            }
        } else {
            targetMap.set(target, (sets = new Map())); //如果没有就新建
            sets.set(key, [activeEffect]);
        }
    }
}
function trigger(target, key) {
    const depsMap = targetMap.get(target);//拿出依赖数组
    if (!depsMap) return;
    const dep = depsMap.get(key);
    if (!dep) return;
    dep.forEach((effect) => effect());//真实存在，运行所有依赖
}

const reactive = (target) => {
    return new Proxy(target, {
        get(target, key, receiver) {
            track(target, key);
            return Reflect.get(...arguments);
        },
        set(target, key, value, receiver) {
            Reflect.set(...arguments);//这句要在trigger之前，这样trigger在执行的时候值才是最新的
            trigger(target, key);
        },
    });
};

let product = reactive({ price: 10, quantity: 2 });
let total = 0;

runEffect(() => (total = product.price * product.quantity));//添加依赖
console.log(total);//20

product.quantity = 5;
console.log(total);//50

product.quantity = 10;
console.log(total);//100