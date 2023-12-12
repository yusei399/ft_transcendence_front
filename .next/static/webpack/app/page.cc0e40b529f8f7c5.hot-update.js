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

/***/ "(app-pages-browser)/./app/features/user/components/UserList.tsx":
/*!***************************************************!*\
  !*** ./app/features/user/components/UserList.tsx ***!
  \***************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _app_shared_HttpEndpoints_invitation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/shared/HttpEndpoints/invitation */ \"(app-pages-browser)/./app/shared/HttpEndpoints/invitation/index.ts\");\n/* harmony import */ var _app_shared_HttpEndpoints_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/shared/HttpEndpoints/user */ \"(app-pages-browser)/./app/shared/HttpEndpoints/user/index.ts\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/button/dist/chunk-UVUR7MCU.mjs\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst UserList = ()=>{\n    _s();\n    const [users, setUsers] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);\n    const [response, setResponse] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        const authToken = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoiaWtlY2hhbiIsImlhdCI6MTcwMjM4MTY1NiwiZXhwIjoxNzAyMzg1MjU2fQ.ERpfqyPagqnLaUUGbYZ2RYezVzyqEWQ-saukDOeG_7c\";\n        fetchUsers(authToken).then((data)=>{\n            setUsers(data);\n        });\n    }, []);\n    const [reqData, setReqData] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({\n        targetUserId: 2\n    });\n    async function fetchUsers(authToken) {\n        const requestSender = new _app_shared_HttpEndpoints_user__WEBPACK_IMPORTED_MODULE_2__.HttpAllUsers.requestSender(authToken);\n        const response = await requestSender.sendRequest();\n        return response.users;\n    }\n    const handleChange = (e)=>{\n        const { name, value } = e.target;\n        setReqData((prev)=>({\n                ...prev,\n                [name]: value\n            }));\n    };\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        try {\n            const res = await new _app_shared_HttpEndpoints_invitation__WEBPACK_IMPORTED_MODULE_1__.HttpSendInvitation.requestSender(\"friend\", reqData, \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoiaWtlY2hhbiIsImlhdCI6MTcwMjM4MTY1NiwiZXhwIjoxNzAyMzg1MjU2fQ.ERpfqyPagqnLaUUGbYZ2RYezVzyqEWQ-saukDOeG_7c\").sendRequest();\n            setResponse(res);\n        } catch (err) {\n            console.log(err);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: Array.isArray(users) && (users === null || users === void 0 ? void 0 : users.map((user)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    user.name,\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"friend-button\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                            colorScheme: \"blue\",\n                            width: \"40\",\n                            onClick: handleSubmit,\n                            children: \"Friend\"\n                        }, void 0, false, {\n                            fileName: \"/Users/yuseiikeda/Desktop/ft_transcendence_front/app/features/user/components/UserList.tsx\",\n                            lineNumber: 50,\n                            columnNumber: 7\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/Users/yuseiikeda/Desktop/ft_transcendence_front/app/features/user/components/UserList.tsx\",\n                        lineNumber: 49,\n                        columnNumber: 21\n                    }, undefined)\n                ]\n            }, user.id, true, {\n                fileName: \"/Users/yuseiikeda/Desktop/ft_transcendence_front/app/features/user/components/UserList.tsx\",\n                lineNumber: 47,\n                columnNumber: 17\n            }, undefined)))\n    }, void 0, false, {\n        fileName: \"/Users/yuseiikeda/Desktop/ft_transcendence_front/app/features/user/components/UserList.tsx\",\n        lineNumber: 45,\n        columnNumber: 9\n    }, undefined);\n};\n_s(UserList, \"hs4N0Yx+ft/98VyjE6KZqtglfqk=\");\n_c = UserList;\n/* harmony default export */ __webpack_exports__[\"default\"] = (UserList);\nvar _c;\n$RefreshReg$(_c, \"UserList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9mZWF0dXJlcy91c2VyL2NvbXBvbmVudHMvVXNlckxpc3QudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUcyRTtBQUNaO0FBQ3JCO0FBQ0U7QUFFNUMsTUFBTUssV0FBVzs7SUFDYixNQUFNLENBQUNDLE9BQU9DLFNBQVMsR0FBR0gsK0NBQVFBLENBQXNCLEVBQUU7SUFDMUQsTUFBTSxDQUFDSSxVQUFVQyxZQUFZLEdBQUdMLCtDQUFRQSxDQUF3QztJQUNoRkQsZ0RBQVNBLENBQUM7UUFDTixNQUFNTyxZQUFZO1FBQ2xCQyxXQUFXRCxXQUFXRSxJQUFJLENBQUNDLENBQUFBO1lBQ3ZCTixTQUFTTTtRQUNUO0lBQ0osR0FBRyxFQUFFO0lBQ0wsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdYLCtDQUFRQSxDQUFpQztRQUN2RVksY0FBYztJQUNoQjtJQUVGLGVBQWVMLFdBQVdELFNBQWlCO1FBQ3ZDLE1BQU1PLGdCQUFnQixJQUFJaEIsd0VBQVlBLENBQUNnQixhQUFhLENBQUNQO1FBQ3JELE1BQU1GLFdBQVcsTUFBTVMsY0FBY0MsV0FBVztRQUNoRCxPQUFPVixTQUFTRixLQUFLO0lBQ3pCO0lBR0EsTUFBTWEsZUFBZSxDQUFDQztRQUNsQixNQUFNLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFLEdBQUdGLEVBQUVHLE1BQU07UUFDaENSLFdBQVdTLENBQUFBLE9BQVM7Z0JBQUUsR0FBR0EsSUFBSTtnQkFBRSxDQUFDSCxLQUFLLEVBQUVDO1lBQU07SUFDakQ7SUFFQSxNQUFNRyxlQUFlLE9BQU9MO1FBQ3hCQSxFQUFFTSxjQUFjO1FBQ2hCLElBQUk7WUFDQSxNQUFNQyxNQUFNLE1BQU0sSUFBSTNCLG9GQUFrQkEsQ0FBQ2lCLGFBQWEsQ0FBQyxVQUFVSCxTQUFTLCtLQUErS0ksV0FBVztZQUNwUVQsWUFBWWtCO1FBQ2hCLEVBQUUsT0FBT0MsS0FBSztZQUNWQyxRQUFRQyxHQUFHLENBQUNGO1FBQ2hCO0lBQ0o7SUFFQSxxQkFDSSw4REFBQ0c7a0JBQ0lDLE1BQU1DLE9BQU8sQ0FBQzNCLFdBQVVBLGtCQUFBQSw0QkFBQUEsTUFBTzRCLEdBQUcsQ0FBQyxDQUFDQyxxQkFDakMsOERBQUNKOztvQkFDSUksS0FBS2QsSUFBSTtrQ0FDViw4REFBQ1U7d0JBQUlLLFdBQVU7a0NBQzdCLDRFQUFDbEMsb0RBQU1BOzRCQUFDbUMsYUFBWTs0QkFBT0MsT0FBTTs0QkFBS0MsU0FBU2Q7c0NBQWM7Ozs7Ozs7Ozs7OztlQUh6Q1UsS0FBS0ssRUFBRTs7Ozs7Ozs7OztBQVNqQztHQS9DTW5DO0tBQUFBO0FBaUROLCtEQUFlQSxRQUFRQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC9mZWF0dXJlcy91c2VyL2NvbXBvbmVudHMvVXNlckxpc3QudHN4PzgyMjgiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCB7IFVzZXJQdWJsaWNQcm9maWxlIH0gZnJvbSBcIkAvYXBwL3NoYXJlZC9IdHRwRW5kcG9pbnRzL2ludGVyZmFjZXNcIjtcbmltcG9ydCB7IEh0dHBTZW5kSW52aXRhdGlvbiB9IGZyb20gXCJAL2FwcC9zaGFyZWQvSHR0cEVuZHBvaW50cy9pbnZpdGF0aW9uXCI7XG5pbXBvcnQgeyBIdHRwQWxsVXNlcnMgfSBmcm9tIFwiQC9hcHAvc2hhcmVkL0h0dHBFbmRwb2ludHMvdXNlclwiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIkBjaGFrcmEtdWkvcmVhY3RcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuY29uc3QgVXNlckxpc3QgPSAoKSA9PiB7XG4gICAgY29uc3QgW3VzZXJzLCBzZXRVc2Vyc10gPSB1c2VTdGF0ZTxVc2VyUHVibGljUHJvZmlsZVtdPihbXSk7XG4gICAgY29uc3QgW3Jlc3BvbnNlLCBzZXRSZXNwb25zZV0gPSB1c2VTdGF0ZTxIdHRwU2VuZEludml0YXRpb24ucmVzVGVtcGxhdGUgfCBudWxsPihudWxsKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBhdXRoVG9rZW4gPSAnZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5U1dRaU9qRXNJbTVwWTJ0dVlXMWxJam9pYVd0bFkyaGhiaUlzSW1saGRDSTZNVGN3TWpNNE1UWTFOaXdpWlhod0lqb3hOekF5TXpnMU1qVTJmUS5FUnBmcXlQYWdxbkxhVVVHYllaMlJZZXpWenlxRVdRLXNhdWtET2VHXzdjJztcbiAgICAgICAgZmV0Y2hVc2VycyhhdXRoVG9rZW4pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBzZXRVc2VycyhkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCBbXSk7XG4gICAgICAgIGNvbnN0IFtyZXFEYXRhLCBzZXRSZXFEYXRhXSA9IHVzZVN0YXRlPEh0dHBTZW5kSW52aXRhdGlvbi5yZXFUZW1wbGF0ZT4oe1xuICAgICAgICB0YXJnZXRVc2VySWQ6IDIsXG4gICAgICB9KTtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoVXNlcnMoYXV0aFRva2VuOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgcmVxdWVzdFNlbmRlciA9IG5ldyBIdHRwQWxsVXNlcnMucmVxdWVzdFNlbmRlcihhdXRoVG9rZW4pO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RTZW5kZXIuc2VuZFJlcXVlc3QoKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnVzZXJzO1xuICAgIH1cbiAgICBcblxuICAgIGNvbnN0IGhhbmRsZUNoYW5nZSA9IChlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgICAgICBjb25zdCB7IG5hbWUsIHZhbHVlIH0gPSBlLnRhcmdldDtcbiAgICAgICAgc2V0UmVxRGF0YShwcmV2ID0+ICh7IC4uLnByZXYsIFtuYW1lXTogdmFsdWUgfSkpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVTdWJtaXQgPSBhc3luYyAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IG5ldyBIdHRwU2VuZEludml0YXRpb24ucmVxdWVzdFNlbmRlcignZnJpZW5kJywgcmVxRGF0YSwgJ2V5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVNXUWlPakVzSW01cFkydHVZVzFsSWpvaWFXdGxZMmhoYmlJc0ltbGhkQ0k2TVRjd01qTTRNVFkxTml3aVpYaHdJam94TnpBeU16ZzFNalUyZlEuRVJwZnF5UGFncW5MYVVVR2JZWjJSWWV6Vnp5cUVXUS1zYXVrRE9lR183YycpLnNlbmRSZXF1ZXN0KCk7XG4gICAgICAgICAgICBzZXRSZXNwb25zZShyZXMpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICB7QXJyYXkuaXNBcnJheSh1c2VycykgJiYgdXNlcnM/Lm1hcCgodXNlcjogYW55KSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e3VzZXIuaWR9PlxuICAgICAgICAgICAgICAgICAgICB7dXNlci5uYW1lfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZyaWVuZC1idXR0b25cIj5cblx0XHRcdFx0XHRcdDxCdXR0b24gY29sb3JTY2hlbWU9J2JsdWUnIHdpZHRoPVwiNDBcIiBvbkNsaWNrPXtoYW5kbGVTdWJtaXR9PkZyaWVuZDwvQnV0dG9uPlxuXHRcdFx0XHRcdDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBVc2VyTGlzdDsiXSwibmFtZXMiOlsiSHR0cFNlbmRJbnZpdGF0aW9uIiwiSHR0cEFsbFVzZXJzIiwiQnV0dG9uIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJVc2VyTGlzdCIsInVzZXJzIiwic2V0VXNlcnMiLCJyZXNwb25zZSIsInNldFJlc3BvbnNlIiwiYXV0aFRva2VuIiwiZmV0Y2hVc2VycyIsInRoZW4iLCJkYXRhIiwicmVxRGF0YSIsInNldFJlcURhdGEiLCJ0YXJnZXRVc2VySWQiLCJyZXF1ZXN0U2VuZGVyIiwic2VuZFJlcXVlc3QiLCJoYW5kbGVDaGFuZ2UiLCJlIiwibmFtZSIsInZhbHVlIiwidGFyZ2V0IiwicHJldiIsImhhbmRsZVN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwicmVzIiwiZXJyIiwiY29uc29sZSIsImxvZyIsImRpdiIsIkFycmF5IiwiaXNBcnJheSIsIm1hcCIsInVzZXIiLCJjbGFzc05hbWUiLCJjb2xvclNjaGVtZSIsIndpZHRoIiwib25DbGljayIsImlkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/features/user/components/UserList.tsx\n"));

/***/ })

});