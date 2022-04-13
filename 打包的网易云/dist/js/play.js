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

/***/ "./src/js/play.js":
/*!************************!*\
  !*** ./src/js/play.js ***!
  \************************/
/***/ (() => {

eval("var heart = document.querySelector('.heart');\nvar sidebar = document.querySelector('.sidebar');\nvar row = document.querySelector('.row');\nvar thr1 = document.querySelector('.thr1');\nvar list1 = document.querySelector('.list1');\nvar zhankai1 = document.querySelector('.zhankai1');\nvar thr2 = document.querySelector('.thr2');\nvar list2 = document.querySelector('.list2');\nvar zhankai2 = document.querySelector('.zhankai2');\nvar playBtns = document.querySelectorAll('.btns img');\nvar temp = 0;\nvar count1 = 0;\nvar count2 = 0;\nvar count3 = 0;\nheart.addEventListener('click', function () {\n  count3++;\n\n  if (count3 % 2 != 0) {\n    //底部播放按钮红心点击变红\n    heart.src = \"./images/heartafter.png\";\n  } else {\n    heart.src = \"./images/heartbefore.png\";\n  }\n});\n\nvar _loop = function _loop(i) {\n  //底部播放按钮覆盖变红\n  playBtns[i].addEventListener('mouseenter', function () {\n    playBtns[i].src = './images/play' + i + '1.png';\n  });\n  playBtns[i].addEventListener('mouseleave', function () {\n    playBtns[i].src = './images/play' + i + '.png';\n  });\n};\n\nfor (var i = 0; i < 5; i++) {\n  _loop(i);\n}\n\n//# sourceURL=webpack://cloud-music/./src/js/play.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/play.js"]();
/******/ 	
/******/ })()
;