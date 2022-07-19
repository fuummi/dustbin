//立即执行，在程序一开始就把pushState修改成处理过的
history.pushState = (function () {
    //这里从history上拿到没被改过的pushState(第一次没注意到要拿最开始的，结果引发了死循环，哈哈)
    const realEvent = history.pushState;
    //实际上的pushState是这个函数
    return function () {
        //创建并发送一个假的事件，用于监听
        const fakeEvent = new Event("pushState");
        fakeEvent.arguments = arguments;
        window.dispatchEvent(fakeEvent);
        //用apply执行这个真实的pushState
        realEvent.apply(this, arguments);
    };
})()

window.addEventListener("pushState", function (e) {
    console.log("pushState发生了");
});

const btn = document.querySelector("#btn");
btn.addEventListener("click", () => {
    history.pushState({ id: 1 }, "", "/home");
});