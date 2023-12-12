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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _app_shared_HttpEndpoints_invitation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/shared/HttpEndpoints/invitation */ \"(app-pages-browser)/./app/shared/HttpEndpoints/invitation/index.ts\");\n/* harmony import */ var _app_shared_HttpEndpoints_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/shared/HttpEndpoints/user */ \"(app-pages-browser)/./app/shared/HttpEndpoints/user/index.ts\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/react */ \"(app-pages-browser)/./node_modules/@chakra-ui/button/dist/chunk-UVUR7MCU.mjs\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst UserList = ()=>{\n    _s();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        const authToken = \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoiaWtlY2hhbiIsImlhdCI6MTcwMjM4MTY1NiwiZXhwIjoxNzAyMzg1MjU2fQ.ERpfqyPagqnLaUUGbYZ2RYezVzyqEWQ-saukDOeG_7c\";\n        fetchUsers(authToken).then((data)=>{\n            setUsers(data);\n        });\n    }, []);\n    const [reqData, setReqData] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)({\n        targetUserId: 2\n    });\n    async function fetchUsers(authToken) {\n        const requestSender = new _app_shared_HttpEndpoints_user__WEBPACK_IMPORTED_MODULE_2__.HttpAllUsers.requestSender(authToken);\n        //console.log(requestSender);\n        const response = await requestSender.sendRequest();\n        //console.log('fetchUsers');\n        //console.log(response);\n        //console.log(response.users);\n        return response.users;\n    }\n    const [users, setUsers] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);\n    const [response, setResponse] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);\n    const handleChange = (e)=>{\n        const { name, value } = e.target;\n        setReqData((prev)=>({\n                ...prev,\n                [name]: value\n            }));\n    };\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        try {\n            const res = await new _app_shared_HttpEndpoints_invitation__WEBPACK_IMPORTED_MODULE_1__.HttpSendInvitation.requestSender(\"friend\", reqData, \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoiaWtlY2hhbiIsImlhdCI6MTcwMjM4MTY1NiwiZXhwIjoxNzAyMzg1MjU2fQ.ERpfqyPagqnLaUUGbYZ2RYezVzyqEWQ-saukDOeG_7c\").sendRequest();\n            setResponse(res);\n        } catch (err) {\n            console.log(err);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: users === null || users === void 0 ? void 0 : users.map((user)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                children: [\n                    user.name,\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"friend-button\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                            colorScheme: \"blue\",\n                            width: \"40\",\n                            onClick: handleSubmit,\n                            children: \"Friend\"\n                        }, void 0, false, {\n                            fileName: \"/Users/yuseiikeda/Desktop/ft_transcendence_front/app/features/user/components/UserList.tsx\",\n                            lineNumber: 55,\n                            columnNumber: 7\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/Users/yuseiikeda/Desktop/ft_transcendence_front/app/features/user/components/UserList.tsx\",\n                        lineNumber: 54,\n                        columnNumber: 21\n                    }, undefined)\n                ]\n            }, user.id, true, {\n                fileName: \"/Users/yuseiikeda/Desktop/ft_transcendence_front/app/features/user/components/UserList.tsx\",\n                lineNumber: 52,\n                columnNumber: 17\n            }, undefined))\n    }, void 0, false, {\n        fileName: \"/Users/yuseiikeda/Desktop/ft_transcendence_front/app/features/user/components/UserList.tsx\",\n        lineNumber: 50,\n        columnNumber: 9\n    }, undefined);\n};\n_s(UserList, \"BX4dmd997ebfoiWUNp4qqvlaTa0=\");\n_c = UserList;\n/* harmony default export */ __webpack_exports__[\"default\"] = (UserList);\nvar _c;\n$RefreshReg$(_c, \"UserList\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9mZWF0dXJlcy91c2VyL2NvbXBvbmVudHMvVXNlckxpc3QudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUcyRTtBQUNaO0FBQ3JCO0FBQ0U7QUFFNUMsTUFBTUssV0FBVzs7SUFDYkYsZ0RBQVNBLENBQUM7UUFDQSxNQUFNRyxZQUFZO1FBQ3hCQyxXQUFXRCxXQUFXRSxJQUFJLENBQUNDLENBQUFBO1lBQ3JCQyxTQUFTRDtRQUNUO0lBQ0osR0FBRyxFQUFFO0lBQ1QsTUFBTSxDQUFDRSxTQUFTQyxXQUFXLEdBQUdSLCtDQUFRQSxDQUFpQztRQUNuRVMsY0FBYztJQUNsQjtJQUVGLGVBQWVOLFdBQVdELFNBQWlCO1FBQ3ZDLE1BQU1RLGdCQUFnQixJQUFJYix3RUFBWUEsQ0FBQ2EsYUFBYSxDQUFDUjtRQUNyRCw2QkFBNkI7UUFDN0IsTUFBTVMsV0FBVyxNQUFNRCxjQUFjRSxXQUFXO1FBQ2hELDRCQUE0QjtRQUM1Qix3QkFBd0I7UUFDeEIsOEJBQThCO1FBQzlCLE9BQU9ELFNBQVNFLEtBQUs7SUFDekI7SUFFQSxNQUFNLENBQUNBLE9BQU9QLFNBQVMsR0FBR04sK0NBQVFBLENBQXNCLEVBQUU7SUFFMUQsTUFBTSxDQUFDVyxVQUFVRyxZQUFZLEdBQUdkLCtDQUFRQSxDQUF3QztJQUVoRixNQUFNZSxlQUFlLENBQUNDO1FBQ2xCLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUUsR0FBR0YsRUFBRUcsTUFBTTtRQUNoQ1gsV0FBV1ksQ0FBQUEsT0FBUztnQkFBRSxHQUFHQSxJQUFJO2dCQUFFLENBQUNILEtBQUssRUFBRUM7WUFBTTtJQUNqRDtJQUVBLE1BQU1HLGVBQWUsT0FBT0w7UUFDeEJBLEVBQUVNLGNBQWM7UUFDaEIsSUFBSTtZQUNBLE1BQU1DLE1BQU0sTUFBTSxJQUFJM0Isb0ZBQWtCQSxDQUFDYyxhQUFhLENBQUMsVUFBVUgsU0FBUywrS0FBK0tLLFdBQVc7WUFDcFFFLFlBQVlTO1FBQ2hCLEVBQUUsT0FBT0MsS0FBSztZQUNWQyxRQUFRQyxHQUFHLENBQUNGO1FBQ2hCO0lBQ0o7SUFFQSxxQkFDSSw4REFBQ0c7a0JBQ0lkLGtCQUFBQSw0QkFBQUEsTUFBT2UsR0FBRyxDQUFDLENBQUNDLHFCQUNULDhEQUFDRjs7b0JBQ0lFLEtBQUtaLElBQUk7a0NBQ1YsOERBQUNVO3dCQUFJRyxXQUFVO2tDQUM3Qiw0RUFBQ2hDLG9EQUFNQTs0QkFBQ2lDLGFBQVk7NEJBQU9DLE9BQU07NEJBQUtDLFNBQVNaO3NDQUFjOzs7Ozs7Ozs7Ozs7ZUFIekNRLEtBQUtLLEVBQUU7Ozs7Ozs7Ozs7QUFTakM7R0FwRE1qQztLQUFBQTtBQXNETiwrREFBZUEsUUFBUUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvZmVhdHVyZXMvdXNlci9jb21wb25lbnRzL1VzZXJMaXN0LnRzeD84MjI4Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgeyBVc2VyUHVibGljUHJvZmlsZSB9IGZyb20gXCJAL2FwcC9zaGFyZWQvSHR0cEVuZHBvaW50cy9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBIdHRwU2VuZEludml0YXRpb24gfSBmcm9tIFwiQC9hcHAvc2hhcmVkL0h0dHBFbmRwb2ludHMvaW52aXRhdGlvblwiO1xuaW1wb3J0IHsgSHR0cEFsbFVzZXJzIH0gZnJvbSBcIkAvYXBwL3NoYXJlZC9IdHRwRW5kcG9pbnRzL3VzZXJcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAY2hha3JhLXVpL3JlYWN0XCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IFVzZXJMaXN0ID0gKCkgPT4ge1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGF1dGhUb2tlbiA9ICdleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlTV1FpT2pFc0ltNXBZMnR1WVcxbElqb2lhV3RsWTJoaGJpSXNJbWxoZENJNk1UY3dNak00TVRZMU5pd2laWGh3SWpveE56QXlNemcxTWpVMmZRLkVScGZxeVBhZ3FuTGFVVUdiWVoyUlllelZ6eXFFV1Etc2F1a0RPZUdfN2MnO1xuICAgICAgICBmZXRjaFVzZXJzKGF1dGhUb2tlbikudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgc2V0VXNlcnMoZGF0YSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIFtdKTtcbiAgICAgIGNvbnN0IFtyZXFEYXRhLCBzZXRSZXFEYXRhXSA9IHVzZVN0YXRlPEh0dHBTZW5kSW52aXRhdGlvbi5yZXFUZW1wbGF0ZT4oe1xuICAgICAgICAgIHRhcmdldFVzZXJJZDogMixcbiAgICAgIH0pO1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gZmV0Y2hVc2VycyhhdXRoVG9rZW46IHN0cmluZykge1xuICAgICAgICBjb25zdCByZXF1ZXN0U2VuZGVyID0gbmV3IEh0dHBBbGxVc2Vycy5yZXF1ZXN0U2VuZGVyKGF1dGhUb2tlbik7XG4gICAgICAgIC8vY29uc29sZS5sb2cocmVxdWVzdFNlbmRlcik7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFNlbmRlci5zZW5kUmVxdWVzdCgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdmZXRjaFVzZXJzJyk7XG4gICAgICAgIC8vY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKHJlc3BvbnNlLnVzZXJzKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnVzZXJzO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBbdXNlcnMsIHNldFVzZXJzXSA9IHVzZVN0YXRlPFVzZXJQdWJsaWNQcm9maWxlW10+KFtdKTtcblxuICAgIGNvbnN0IFtyZXNwb25zZSwgc2V0UmVzcG9uc2VdID0gdXNlU3RhdGU8SHR0cFNlbmRJbnZpdGF0aW9uLnJlc1RlbXBsYXRlIHwgbnVsbD4obnVsbCk7XG5cbiAgICBjb25zdCBoYW5kbGVDaGFuZ2UgPSAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICAgICAgY29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gZS50YXJnZXQ7XG4gICAgICAgIHNldFJlcURhdGEocHJldiA9PiAoeyAuLi5wcmV2LCBbbmFtZV06IHZhbHVlIH0pKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlU3VibWl0ID0gYXN5bmMgKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBuZXcgSHR0cFNlbmRJbnZpdGF0aW9uLnJlcXVlc3RTZW5kZXIoJ2ZyaWVuZCcsIHJlcURhdGEsICdleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlTV1FpT2pFc0ltNXBZMnR1WVcxbElqb2lhV3RsWTJoaGJpSXNJbWxoZENJNk1UY3dNak00TVRZMU5pd2laWGh3SWpveE56QXlNemcxTWpVMmZRLkVScGZxeVBhZ3FuTGFVVUdiWVoyUlllelZ6eXFFV1Etc2F1a0RPZUdfN2MnKS5zZW5kUmVxdWVzdCgpO1xuICAgICAgICAgICAgc2V0UmVzcG9uc2UocmVzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAge3VzZXJzPy5tYXAoKHVzZXI6IGFueSkgPT4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXt1c2VyLmlkfT5cbiAgICAgICAgICAgICAgICAgICAge3VzZXIubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmcmllbmQtYnV0dG9uXCI+XG5cdFx0XHRcdFx0XHQ8QnV0dG9uIGNvbG9yU2NoZW1lPSdibHVlJyB3aWR0aD1cIjQwXCIgb25DbGljaz17aGFuZGxlU3VibWl0fT5GcmllbmQ8L0J1dHRvbj5cblx0XHRcdFx0XHQ8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVXNlckxpc3Q7Il0sIm5hbWVzIjpbIkh0dHBTZW5kSW52aXRhdGlvbiIsIkh0dHBBbGxVc2VycyIsIkJ1dHRvbiIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiVXNlckxpc3QiLCJhdXRoVG9rZW4iLCJmZXRjaFVzZXJzIiwidGhlbiIsImRhdGEiLCJzZXRVc2VycyIsInJlcURhdGEiLCJzZXRSZXFEYXRhIiwidGFyZ2V0VXNlcklkIiwicmVxdWVzdFNlbmRlciIsInJlc3BvbnNlIiwic2VuZFJlcXVlc3QiLCJ1c2VycyIsInNldFJlc3BvbnNlIiwiaGFuZGxlQ2hhbmdlIiwiZSIsIm5hbWUiLCJ2YWx1ZSIsInRhcmdldCIsInByZXYiLCJoYW5kbGVTdWJtaXQiLCJwcmV2ZW50RGVmYXVsdCIsInJlcyIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJkaXYiLCJtYXAiLCJ1c2VyIiwiY2xhc3NOYW1lIiwiY29sb3JTY2hlbWUiLCJ3aWR0aCIsIm9uQ2xpY2siLCJpZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/features/user/components/UserList.tsx\n"));

/***/ })

});