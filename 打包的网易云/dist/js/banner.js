/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/banner.js":
/*!**************************!*\
  !*** ./src/js/banner.js ***!
  \**************************/
/***/ (() => {

eval("var img = document.querySelectorAll('.ban');\nvar ol = document.querySelector('ol');\nvar pre = document.querySelector('.banBtn1');\nvar next = document.querySelector('.banBtn2');\nvar dot = document.querySelector('.dot');\nvar timerNext = setInterval(forTimerNext, 5000); //定时播放    \n\nfor (var i = 0; i < img.length; i++) {\n  //用循环添加圆点\n  var _li = document.createElement('li');\n\n  ol.appendChild(_li);\n}\n\nvar li = document.querySelectorAll('ol li');\nol.children[1].className = 'dotIn'; //第二张默认在最上面 \n\nvar arr = [];\nvar arr1 = []; //新建空数组,存Img,li,解决伪数组不能使用方法的问题\n\nfor (var _i = 0; _i < img.length; _i++) {\n  arr[_i] = img[_i];\n  arr1[_i] = li[_i];\n}\n\nvar _loop = function _loop(_i2) {\n  //用for循环给每个li绑定事件\n  arr1[_i2].onmouseover = function () {\n    clearInterval(timerNext);\n    var flag = arr[1].id; //先判断当前在最上面的图片索引号\n\n    var k = _i2; //新建一个变量k，防止下面while                              \n\n    while (k > flag) {\n      //执行时改变i对判断产生影响(一开始直接用i，循环完i递减，会出错)\n      getNext(); //当点击的图片序号大于当前图片序号，前进至所点的图片\n\n      k--;\n    }\n\n    while (k < flag) {\n      //反之\n      getPre();\n      k++;\n    }\n\n    for (var j = 0; j < img.length; j++) {\n      //用for循环给每个li清除样式\n      arr[j].className = 'img3';\n      arr1[j].className = '';\n    }\n\n    arr[0].className = 'img0';\n    arr[1].className = 'img1'; //根据索引号赋予图片样式 0：左边 1：中间 2：右边\n\n    arr[2].className = 'img2';\n    arr1[1].className = 'dotIn'; //给对应圆点修改类名\n\n    timerNext = setInterval(forTimerNext, 5000);\n  };\n};\n\nfor (var _i2 = 0; _i2 < img.length; _i2++) {\n  _loop(_i2);\n}\n\nvar len = img.length - 1; //数组长度减一，表示图片索引号\n//console.log(len);\n\nfunction getNext() {\n  var throww = arr[0]; //存下arr数组的第一个元素\n\n  arr.shift(); //扔掉arr数组的第一个元素\n\n  arr.push(throww); //把扔掉的元素push，实现换序\n\n  var throww1 = arr1[0]; //对小圆点li同理\n\n  arr1.shift();\n  arr1.push(throww1);\n}\n\nnext.onclick = function () {\n  clearInterval(timerNext);\n  getNext();\n  arr.className = 'img3'; //先重置图片样式 全设为在后面\n\n  arr[0].className = 'img0';\n  arr[1].className = 'img1'; //根据索引号赋予图片样式 0：左边 1：中间 2：右边\n\n  arr[2].className = 'img2';\n  arr[3].className = 'img3';\n  arr[len].className = 'img3'; //刚换下来的为 3：后面  \n\n  arr1[1].className = 'dotIn';\n  arr1[0].className = '';\n  timerNext = setInterval(forTimerNext, 5000);\n}; //next函数只改变图片数组的顺序，可以用在其他地方\n//next.onclick函数既改变了顺序又改变了样式，只用于切换图片\n\n\nfunction getPre() {\n  //同上,原理相反\n  var throww = arr[len];\n  arr.pop();\n  arr.unshift(throww);\n  var throww1 = arr1[len];\n  arr1.pop();\n  arr1.unshift(throww1);\n}\n\npre.onclick = function () {\n  clearInterval(timerNext);\n  getPre();\n  arr[0].className = 'img0';\n  arr[1].className = 'img1';\n  arr[2].className = 'img2';\n  arr[3].className = 'img3';\n  arr[len].className = 'img3';\n  arr1[1].className = 'dotIn';\n  arr1[2].className = '';\n  timerNext = setInterval(forTimerNext, 3000);\n};\n\nfunction forTimerNext() {\n  getNext();\n  arr.className = 'img3';\n  arr[0].className = 'img0';\n  arr[1].className = 'img1';\n  arr[2].className = 'img2';\n  arr[3].className = 'img3';\n  arr[len].className = 'img3';\n  arr1[1].className = 'dotIn';\n  arr1[0].className = '';\n}\n\npre.onmouseover = function () {\n  //鼠标移至/移出按钮，按钮显示/消失\n  pre.className = 'banBtn1';\n  next.className = 'banBtn2';\n};\n\nnext.onmouseover = function () {\n  pre.className = 'banBtn1';\n  next.className = 'banBtn2';\n};\n\npre.onmouseleave = function () {\n  pre.className = 'none';\n  next.className = 'none';\n};\n\nnext.onmouseleave = function () {\n  pre.className = 'none';\n  next.className = 'none';\n};\n\nfor (var _i3 = 0; _i3 < img.length; _i3++) {\n  img[_i3].onmouseenter = function () {\n    //鼠标移至最上面的图片上，清除定时播放\n    clearInterval(timerNext);\n    pre.className = 'banBtn1';\n    next.className = 'banBtn2';\n  };\n\n  img[_i3].onmouseleave = function () {\n    //鼠标移开，恢复定时播放\n    timerNext = setInterval(forTimerNext, 5000);\n    pre.className = 'none';\n    next.className = 'none';\n  };\n}\n\n//# sourceURL=webpack://cloud-music/./src/js/banner.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/banner.js"]();
/******/ 	
/******/ })()
;