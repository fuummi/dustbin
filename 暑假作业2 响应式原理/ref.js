const depMap = new Map(); //存储依赖数组
let activeEffect = null; //正在执行的函数为null
const ref = function (data) {
    const obj = {
        value: data,
        get value() {
            if (activeEffect !== null) {
                //有依赖的数据
                const effects = depMap.get(obj);
                if (Array.isArray(effects)) {
                    //如果已经有注册的数组
                    depMap.set(obj, [...effects, activeEffect]);
                } else {
                    //新注册一个依赖数组
                    depMap.set(obj, [activeEffect]);
                }
            }
            return data;
        },
        set value(newData) {
            const arr = depMap.get(obj); //拿出依赖数组
            data = newData; //在执行依赖前先把值更新
            arr.forEach((effect) => effect()); //挨个执行依赖
            return newData;
        },
    };
    return obj;
};

const runEffect = (effect) => {
    activeEffect = effect;
    activeEffect();
    activeEffect = null;
};

let a = ref(1);
let count = 0;
console.log(count);//0

runEffect(() => {
    count = a.value + 1;
}); //添加？执行？依赖a的数据？我也不是特别清楚(汗)总之有这个才能实现

a.value = 10;
console.log(count);//11
