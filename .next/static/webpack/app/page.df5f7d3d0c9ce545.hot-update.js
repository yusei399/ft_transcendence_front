"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./app/features/chat/Chat.tsx":
/*!************************************!*\
  !*** ./app/features/chat/Chat.tsx ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\nconst Chat = ()=>{\n    _s();\n    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const handleChange = (event)=>{\n        setMessage(event.target.value);\n    };\n    const handleSubmit = ()=>{\n        if (message.trim()) {\n            console.log(\"Submitted:\", message);\n            setMessages([\n                ...messages,\n                message\n            ]);\n            setMessage(\"\");\n        } else {\n            console.log(\"No message to submit\");\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            messages === null || messages === void 0 ? void 0 : messages.map((message)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                        children: message\n                    }, void 0, false, {\n                        fileName: \"/Users/yuseiikeda/Desktop/ft_transcendence_front/app/features/chat/Chat.tsx\",\n                        lineNumber: 26,\n                        columnNumber: 6\n                    }, undefined)\n                }, message, false, {\n                    fileName: \"/Users/yuseiikeda/Desktop/ft_transcendence_front/app/features/chat/Chat.tsx\",\n                    lineNumber: 25,\n                    columnNumber: 5\n                }, undefined)),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                type: \"text\",\n                className: \"chat_message\",\n                value: message,\n                onChange: handleChange\n            }, void 0, false, {\n                fileName: \"/Users/yuseiikeda/Desktop/ft_transcendence_front/app/features/chat/Chat.tsx\",\n                lineNumber: 31,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                onClick: handleSubmit,\n                style: {\n                    margin\n                },\n                children: \"送信\"\n            }, void 0, false, {\n                fileName: \"/Users/yuseiikeda/Desktop/ft_transcendence_front/app/features/chat/Chat.tsx\",\n                lineNumber: 37,\n                columnNumber: 4\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/yuseiikeda/Desktop/ft_transcendence_front/app/features/chat/Chat.tsx\",\n        lineNumber: 23,\n        columnNumber: 3\n    }, undefined);\n};\n_s(Chat, \"R9cL6wTFJ4Cm4nINx8rfDHzMChE=\");\n_c = Chat;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Chat);\nvar _c;\n$RefreshReg$(_c, \"Chat\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9mZWF0dXJlcy9jaGF0L0NoYXQudHN4IiwibWFwcGluZ3MiOiI7Ozs7OztBQUN3QztBQUV4QyxNQUFNRSxPQUFPOztJQUNULE1BQU0sQ0FBQ0MsU0FBU0MsV0FBVyxHQUFHSCwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNJLFVBQVVDLFlBQVksR0FBR0wsK0NBQVFBLENBQVcsRUFBRTtJQUVyRCxNQUFNTSxlQUFlLENBQUNDO1FBQ2xCSixXQUFXSSxNQUFNQyxNQUFNLENBQUNDLEtBQUs7SUFDakM7SUFFSCxNQUFNQyxlQUFlO1FBQ3BCLElBQUlSLFFBQVFTLElBQUksSUFBSTtZQUNWQyxRQUFRQyxHQUFHLENBQUMsY0FBY1g7WUFDbkNHLFlBQVk7bUJBQUlEO2dCQUFVRjthQUFRO1lBQ3pCQyxXQUFXO1FBQ2YsT0FBTztZQUNIUyxRQUFRQyxHQUFHLENBQUM7UUFDaEI7SUFDSjtJQUVBLHFCQUNGLDhEQUFDQzs7WUFDQ1YscUJBQUFBLCtCQUFBQSxTQUFVVyxHQUFHLENBQUMsQ0FBQ2Isd0JBQ2YsOERBQUNZOzhCQUNBLDRFQUFDRTtrQ0FDQ2Q7Ozs7OzttQkFGT0E7Ozs7OzBCQU1GLDhEQUFDZTtnQkFDR0MsTUFBSztnQkFDTEMsV0FBVTtnQkFDVlYsT0FBT1A7Z0JBQ1BrQixVQUFVZDs7Ozs7OzBCQUV2Qiw4REFBQ2U7Z0JBQU9DLFNBQVNaO2dCQUFjYSxPQUFPO29CQUFDQztnQkFBTTswQkFBRzs7Ozs7Ozs7Ozs7O0FBR25EO0dBcENNdkI7S0FBQUE7QUFzQ04sK0RBQWVBLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2ZlYXR1cmVzL2NoYXQvQ2hhdC50c3g/YmVkNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuY29uc3QgQ2hhdCA9ICgpID0+IHtcbiAgICBjb25zdCBbbWVzc2FnZSwgc2V0TWVzc2FnZV0gPSB1c2VTdGF0ZSgnJyk7XG4gICAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pO1xuXG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGV2ZW50IDogYW55KSA9PiB7XG4gICAgICAgIHNldE1lc3NhZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICB9O1xuXG5cdGNvbnN0IGhhbmRsZVN1Ym1pdCA9ICgpID0+IHtcblx0XHRpZiAobWVzc2FnZS50cmltKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VibWl0dGVkOlwiLCBtZXNzYWdlKTtcblx0XHRcdHNldE1lc3NhZ2VzKFsuLi5tZXNzYWdlcywgbWVzc2FnZV0pO1xuICAgICAgICAgICAgc2V0TWVzc2FnZSgnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIG1lc3NhZ2UgdG8gc3VibWl0XCIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiAoXG5cdFx0PGRpdj5cblx0XHRcdHttZXNzYWdlcz8ubWFwKChtZXNzYWdlOiBhbnkpID0+IChcblx0XHRcdFx0PGRpdiBrZXk9e21lc3NhZ2V9PlxuXHRcdFx0XHRcdDxwPlxuXHRcdFx0XHRcdFx0e21lc3NhZ2V9XG5cdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCkpfVxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNoYXRfbWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZX1cbiAgICAgICAgICAgIC8+XG5cdFx0XHQ8YnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVN1Ym1pdH0gc3R5bGU9e3ttYXJnaW59fT7pgIHkv6E8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhdDtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiQ2hhdCIsIm1lc3NhZ2UiLCJzZXRNZXNzYWdlIiwibWVzc2FnZXMiLCJzZXRNZXNzYWdlcyIsImhhbmRsZUNoYW5nZSIsImV2ZW50IiwidGFyZ2V0IiwidmFsdWUiLCJoYW5kbGVTdWJtaXQiLCJ0cmltIiwiY29uc29sZSIsImxvZyIsImRpdiIsIm1hcCIsInAiLCJpbnB1dCIsInR5cGUiLCJjbGFzc05hbWUiLCJvbkNoYW5nZSIsImJ1dHRvbiIsIm9uQ2xpY2siLCJzdHlsZSIsIm1hcmdpbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/features/chat/Chat.tsx\n"));

/***/ })

});