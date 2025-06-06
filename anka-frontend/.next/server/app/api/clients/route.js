/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/clients/route";
exports.ids = ["app/api/clients/route"];
exports.modules = {

/***/ "(rsc)/./app/api/clients/route.ts":
/*!**********************************!*\
  !*** ./app/api/clients/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PATCH: () => (/* binding */ PATCH),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"(rsc)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\nasync function POST(request) {\n    const data = await request.json();\n    try {\n        const reply = await axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post(`http://localhost:3001/api/client`, {\n            data\n        });\n        return new Response(JSON.stringify(reply.data), {\n            status: 200,\n            headers: {\n                \"Content-Type\": \"application/json\"\n            }\n        });\n    } catch (error) {\n        if (error instanceof Error) {\n            console.log(error.cause);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"[NEW_CLIENT:POST] - Error: \",\n                error: error.message\n            }, {\n                status: 500\n            });\n        }\n    }\n}\nasync function PATCH(request) {\n    const data = await request.json();\n    try {\n        const bodyPayload = {\n            name: data.name,\n            email: data.email,\n            active: data.active,\n            page: data.page\n        };\n        const reply = await axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].patch(`http://localhost:3001/api/client/${data.id}`, {\n            bodyPayload\n        });\n        return new Response(JSON.stringify(reply.data), {\n            status: 200,\n            headers: {\n                \"Content-Type\": \"application/json\"\n            }\n        });\n    } catch (error) {\n        if (error instanceof Error) {\n            console.log(error.message);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"[EDIT_CLIENT:PATCH] - Error: \",\n                error: error.message\n            }, {\n                status: 500\n            });\n        }\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NsaWVudHMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUEwQjtBQUNpQjtBQUVwQyxlQUFlRSxLQUFLQyxPQUFnQjtJQUN6QyxNQUFNQyxPQUFRLE1BQU1ELFFBQVFFLElBQUk7SUFNaEMsSUFBSTtRQUNGLE1BQU1DLFFBQVEsTUFBTU4sNkNBQUtBLENBQUNPLElBQUksQ0FBQyxDQUFDLGdDQUFnQyxDQUFDLEVBQUU7WUFDakVIO1FBQ0Y7UUFFQSxPQUFPLElBQUlJLFNBQVNDLEtBQUtDLFNBQVMsQ0FBQ0osTUFBTUYsSUFBSSxHQUFHO1lBQzlDTyxRQUFRO1lBQ1JDLFNBQVM7Z0JBQUUsZ0JBQWdCO1lBQW1CO1FBQ2hEO0lBQ0YsRUFBRSxPQUFPQyxPQUFPO1FBQ2QsSUFBSUEsaUJBQWlCQyxPQUFPO1lBQzFCQyxRQUFRQyxHQUFHLENBQUNILE1BQU1JLEtBQUs7WUFDdkIsT0FBT2hCLHFEQUFZQSxDQUFDSSxJQUFJLENBQ3RCO2dCQUFFYSxTQUFTO2dCQUErQkwsT0FBT0EsTUFBTUssT0FBTztZQUFDLEdBQy9EO2dCQUFFUCxRQUFRO1lBQUk7UUFFbEI7SUFDRjtBQUNGO0FBRU8sZUFBZVEsTUFBTWhCLE9BQWdCO0lBQzFDLE1BQU1DLE9BQVEsTUFBTUQsUUFBUUUsSUFBSTtJQVFoQyxJQUFJO1FBQ0YsTUFBTWUsY0FBYztZQUNsQkMsTUFBTWpCLEtBQUtpQixJQUFJO1lBQ2ZDLE9BQU9sQixLQUFLa0IsS0FBSztZQUNqQkMsUUFBUW5CLEtBQUttQixNQUFNO1lBQ25CQyxNQUFNcEIsS0FBS29CLElBQUk7UUFDakI7UUFFQSxNQUFNbEIsUUFBUSxNQUFNTiw2Q0FBS0EsQ0FBQ3lCLEtBQUssQ0FDN0IsQ0FBQyxpQ0FBaUMsRUFBRXJCLEtBQUtzQixFQUFFLEVBQUUsRUFDN0M7WUFDRU47UUFDRjtRQUdGLE9BQU8sSUFBSVosU0FBU0MsS0FBS0MsU0FBUyxDQUFDSixNQUFNRixJQUFJLEdBQUc7WUFDOUNPLFFBQVE7WUFDUkMsU0FBUztnQkFBRSxnQkFBZ0I7WUFBbUI7UUFDaEQ7SUFDRixFQUFFLE9BQU9DLE9BQU87UUFDZCxJQUFJQSxpQkFBaUJDLE9BQU87WUFDMUJDLFFBQVFDLEdBQUcsQ0FBQ0gsTUFBTUssT0FBTztZQUN6QixPQUFPakIscURBQVlBLENBQUNJLElBQUksQ0FDdEI7Z0JBQUVhLFNBQVM7Z0JBQWlDTCxPQUFPQSxNQUFNSyxPQUFPO1lBQUMsR0FDakU7Z0JBQUVQLFFBQVE7WUFBSTtRQUVsQjtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIi9ob21lL21ndWlycmEvZGV2L25vaXNlcy9hbmthLXRlY2gtY2hhbGxlbmdlL2Fua2EtZnJvbnRlbmQvYXBwL2FwaS9jbGllbnRzL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XG4gIGNvbnN0IGRhdGEgPSAoYXdhaXQgcmVxdWVzdC5qc29uKCkpIGFzIHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBhY3RpdmU6IGJvb2xlYW47XG4gIH07XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXBseSA9IGF3YWl0IGF4aW9zLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9hcGkvY2xpZW50YCwge1xuICAgICAgZGF0YSxcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkocmVwbHkuZGF0YSksIHtcbiAgICAgIHN0YXR1czogMjAwLFxuICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvci5jYXVzZSk7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICAgIHsgbWVzc2FnZTogXCJbTkVXX0NMSUVOVDpQT1NUXSAtIEVycm9yOiBcIiwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSxcbiAgICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUEFUQ0gocmVxdWVzdDogUmVxdWVzdCkge1xuICBjb25zdCBkYXRhID0gKGF3YWl0IHJlcXVlc3QuanNvbigpKSBhcyB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgZW1haWw6IHN0cmluZztcbiAgICBhY3RpdmU6IGJvb2xlYW47XG4gICAgcGFnZTogbnVtYmVyXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBib2R5UGF5bG9hZCA9IHtcbiAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgIGVtYWlsOiBkYXRhLmVtYWlsLFxuICAgICAgYWN0aXZlOiBkYXRhLmFjdGl2ZSxcbiAgICAgIHBhZ2U6IGRhdGEucGFnZVxuICAgIH07XG5cbiAgICBjb25zdCByZXBseSA9IGF3YWl0IGF4aW9zLnBhdGNoKFxuICAgICAgYGh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS9hcGkvY2xpZW50LyR7ZGF0YS5pZH1gLFxuICAgICAge1xuICAgICAgICBib2R5UGF5bG9hZCxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeShyZXBseS5kYXRhKSwge1xuICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IG1lc3NhZ2U6IFwiW0VESVRfQ0xJRU5UOlBBVENIXSAtIEVycm9yOiBcIiwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSxcbiAgICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbImF4aW9zIiwiTmV4dFJlc3BvbnNlIiwiUE9TVCIsInJlcXVlc3QiLCJkYXRhIiwianNvbiIsInJlcGx5IiwicG9zdCIsIlJlc3BvbnNlIiwiSlNPTiIsInN0cmluZ2lmeSIsInN0YXR1cyIsImhlYWRlcnMiLCJlcnJvciIsIkVycm9yIiwiY29uc29sZSIsImxvZyIsImNhdXNlIiwibWVzc2FnZSIsIlBBVENIIiwiYm9keVBheWxvYWQiLCJuYW1lIiwiZW1haWwiLCJhY3RpdmUiLCJwYWdlIiwicGF0Y2giLCJpZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/clients/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fclients%2Froute&page=%2Fapi%2Fclients%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fclients%2Froute.ts&appDir=%2Fhome%2Fmguirra%2Fdev%2Fnoises%2Fanka-tech-challenge%2Fanka-frontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fmguirra%2Fdev%2Fnoises%2Fanka-tech-challenge%2Fanka-frontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fclients%2Froute&page=%2Fapi%2Fclients%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fclients%2Froute.ts&appDir=%2Fhome%2Fmguirra%2Fdev%2Fnoises%2Fanka-tech-challenge%2Fanka-frontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fmguirra%2Fdev%2Fnoises%2Fanka-tech-challenge%2Fanka-frontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_mguirra_dev_noises_anka_tech_challenge_anka_frontend_app_api_clients_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/clients/route.ts */ \"(rsc)/./app/api/clients/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/clients/route\",\n        pathname: \"/api/clients\",\n        filename: \"route\",\n        bundlePath: \"app/api/clients/route\"\n    },\n    resolvedPagePath: \"/home/mguirra/dev/noises/anka-tech-challenge/anka-frontend/app/api/clients/route.ts\",\n    nextConfigOutput,\n    userland: _home_mguirra_dev_noises_anka_tech_challenge_anka_frontend_app_api_clients_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjbGllbnRzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZjbGllbnRzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2xpZW50cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZob21lJTJGbWd1aXJyYSUyRmRldiUyRm5vaXNlcyUyRmFua2EtdGVjaC1jaGFsbGVuZ2UlMkZhbmthLWZyb250ZW5kJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZob21lJTJGbWd1aXJyYSUyRmRldiUyRm5vaXNlcyUyRmFua2EtdGVjaC1jaGFsbGVuZ2UlMkZhbmthLWZyb250ZW5kJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNtQztBQUNoSDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL2hvbWUvbWd1aXJyYS9kZXYvbm9pc2VzL2Fua2EtdGVjaC1jaGFsbGVuZ2UvYW5rYS1mcm9udGVuZC9hcHAvYXBpL2NsaWVudHMvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NsaWVudHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jbGllbnRzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9jbGllbnRzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL2hvbWUvbWd1aXJyYS9kZXYvbm9pc2VzL2Fua2EtdGVjaC1jaGFsbGVuZ2UvYW5rYS1mcm9udGVuZC9hcHAvYXBpL2NsaWVudHMvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fclients%2Froute&page=%2Fapi%2Fclients%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fclients%2Froute.ts&appDir=%2Fhome%2Fmguirra%2Fdev%2Fnoises%2Fanka-tech-challenge%2Fanka-frontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fmguirra%2Fdev%2Fnoises%2Fanka-tech-challenge%2Fanka-frontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?4c03":
/*!***********************!*\
  !*** debug (ignored) ***!
  \***********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/mime-db","vendor-chunks/axios","vendor-chunks/follow-redirects","vendor-chunks/get-intrinsic","vendor-chunks/form-data","vendor-chunks/asynckit","vendor-chunks/combined-stream","vendor-chunks/mime-types","vendor-chunks/proxy-from-env","vendor-chunks/has-symbols","vendor-chunks/delayed-stream","vendor-chunks/function-bind","vendor-chunks/es-set-tostringtag","vendor-chunks/get-proto","vendor-chunks/call-bind-apply-helpers","vendor-chunks/dunder-proto","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/gopd","vendor-chunks/es-define-property","vendor-chunks/hasown","vendor-chunks/has-tostringtag","vendor-chunks/es-object-atoms"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fclients%2Froute&page=%2Fapi%2Fclients%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fclients%2Froute.ts&appDir=%2Fhome%2Fmguirra%2Fdev%2Fnoises%2Fanka-tech-challenge%2Fanka-frontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fmguirra%2Fdev%2Fnoises%2Fanka-tech-challenge%2Fanka-frontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();