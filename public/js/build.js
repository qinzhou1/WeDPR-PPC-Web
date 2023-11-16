/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ffi_wasm_equality_bg.js":
/*!*************************************!*\
  !*** ./src/ffi_wasm_equality_bg.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__wbg_buffer_3f3d764d4747d564\": () => (/* binding */ __wbg_buffer_3f3d764d4747d564),\n/* harmony export */   \"__wbg_call_168da88779e35f61\": () => (/* binding */ __wbg_call_168da88779e35f61),\n/* harmony export */   \"__wbg_call_97ae9d8645dc388b\": () => (/* binding */ __wbg_call_97ae9d8645dc388b),\n/* harmony export */   \"__wbg_crypto_e1d53a1d73fb10b8\": () => (/* binding */ __wbg_crypto_e1d53a1d73fb10b8),\n/* harmony export */   \"__wbg_getRandomValues_805f1c3d65988a5a\": () => (/* binding */ __wbg_getRandomValues_805f1c3d65988a5a),\n/* harmony export */   \"__wbg_globalThis_7f206bda628d5286\": () => (/* binding */ __wbg_globalThis_7f206bda628d5286),\n/* harmony export */   \"__wbg_global_ba75c50d1cf384f4\": () => (/* binding */ __wbg_global_ba75c50d1cf384f4),\n/* harmony export */   \"__wbg_length_9e1ae1900cb0fbd5\": () => (/* binding */ __wbg_length_9e1ae1900cb0fbd5),\n/* harmony export */   \"__wbg_msCrypto_6e7d3e1f92610cbb\": () => (/* binding */ __wbg_msCrypto_6e7d3e1f92610cbb),\n/* harmony export */   \"__wbg_new_8c3f0052272a457a\": () => (/* binding */ __wbg_new_8c3f0052272a457a),\n/* harmony export */   \"__wbg_newnoargs_b5b063fc6c2f0376\": () => (/* binding */ __wbg_newnoargs_b5b063fc6c2f0376),\n/* harmony export */   \"__wbg_newwithlength_f5933855e4f48a19\": () => (/* binding */ __wbg_newwithlength_f5933855e4f48a19),\n/* harmony export */   \"__wbg_node_080f4b19d15bc1fe\": () => (/* binding */ __wbg_node_080f4b19d15bc1fe),\n/* harmony export */   \"__wbg_process_038c26bf42b093f8\": () => (/* binding */ __wbg_process_038c26bf42b093f8),\n/* harmony export */   \"__wbg_randomFillSync_6894564c2c334c42\": () => (/* binding */ __wbg_randomFillSync_6894564c2c334c42),\n/* harmony export */   \"__wbg_require_78a3dcfbdba9cbce\": () => (/* binding */ __wbg_require_78a3dcfbdba9cbce),\n/* harmony export */   \"__wbg_self_6d479506f72c6a71\": () => (/* binding */ __wbg_self_6d479506f72c6a71),\n/* harmony export */   \"__wbg_set_83db9690f9353e79\": () => (/* binding */ __wbg_set_83db9690f9353e79),\n/* harmony export */   \"__wbg_subarray_58ad4efbb5bcb886\": () => (/* binding */ __wbg_subarray_58ad4efbb5bcb886),\n/* harmony export */   \"__wbg_versions_ab37218d2f0b24a8\": () => (/* binding */ __wbg_versions_ab37218d2f0b24a8),\n/* harmony export */   \"__wbg_window_f2557cc78490aceb\": () => (/* binding */ __wbg_window_f2557cc78490aceb),\n/* harmony export */   \"__wbindgen_is_function\": () => (/* binding */ __wbindgen_is_function),\n/* harmony export */   \"__wbindgen_is_object\": () => (/* binding */ __wbindgen_is_object),\n/* harmony export */   \"__wbindgen_is_string\": () => (/* binding */ __wbindgen_is_string),\n/* harmony export */   \"__wbindgen_is_undefined\": () => (/* binding */ __wbindgen_is_undefined),\n/* harmony export */   \"__wbindgen_memory\": () => (/* binding */ __wbindgen_memory),\n/* harmony export */   \"__wbindgen_object_clone_ref\": () => (/* binding */ __wbindgen_object_clone_ref),\n/* harmony export */   \"__wbindgen_object_drop_ref\": () => (/* binding */ __wbindgen_object_drop_ref),\n/* harmony export */   \"__wbindgen_string_new\": () => (/* binding */ __wbindgen_string_new),\n/* harmony export */   \"__wbindgen_throw\": () => (/* binding */ __wbindgen_throw),\n/* harmony export */   \"encrypt_message\": () => (/* binding */ encrypt_message),\n/* harmony export */   \"toHexString\": () => (/* binding */ toHexString),\n/* harmony export */   \"toUint8Arr\": () => (/* binding */ toUint8Arr)\n/* harmony export */ });\n/* harmony import */ var _ffi_wasm_equality_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ffi_wasm_equality_bg.wasm */ \"./src/ffi_wasm_equality_bg.wasm\");\n/* module decorator */ module = __webpack_require__.hmd(module);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ffi_wasm_equality_bg_wasm__WEBPACK_IMPORTED_MODULE_0__]);\n_ffi_wasm_equality_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nconst heap = new Array(32).fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nfunction getObject(idx) { return heap[idx]; }\n\nlet heap_next = heap.length;\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction takeObject(idx) {\n    const ret = getObject(idx);\n    dropObject(idx);\n    return ret;\n}\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachedUint8Memory0 = new Uint8Array();\n\nfunction getUint8Memory0() {\n    if (cachedUint8Memory0.byteLength === 0) {\n        cachedUint8Memory0 = new Uint8Array(_ffi_wasm_equality_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);\n    }\n    return cachedUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nfunction passArray8ToWasm0(arg, malloc) {\n    const ptr = malloc(arg.length * 1);\n    getUint8Memory0().set(arg, ptr / 1);\n    WASM_VECTOR_LEN = arg.length;\n    return ptr;\n}\n\nlet cachedInt32Memory0 = new Int32Array();\n\nfunction getInt32Memory0() {\n    if (cachedInt32Memory0.byteLength === 0) {\n        cachedInt32Memory0 = new Int32Array(_ffi_wasm_equality_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory.buffer);\n    }\n    return cachedInt32Memory0;\n}\n\nfunction getArrayU8FromWasm0(ptr, len) {\n    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);\n}\n/**\n* @param {Uint8Array} message\n* @returns {Uint8Array}\n*/\nfunction encrypt_message(message) {\n    message = toUint8Arr(message)\n    try {\n        const retptr = _ffi_wasm_equality_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(-16);\n        const ptr0 = passArray8ToWasm0(message, _ffi_wasm_equality_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_malloc);\n        const len0 = WASM_VECTOR_LEN;\n        _ffi_wasm_equality_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.encrypt_message(retptr, ptr0, len0);\n        var r0 = getInt32Memory0()[retptr / 4 + 0];\n        var r1 = getInt32Memory0()[retptr / 4 + 1];\n        var v1 = getArrayU8FromWasm0(r0, r1).slice();\n        _ffi_wasm_equality_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_free(r0, r1 * 1);\n        return  toHexString(v1);\n        // return  v1;\n    } finally {\n        _ffi_wasm_equality_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_add_to_stack_pointer(16);\n    }\n}\n\nfunction toUint8Arr(str) {\n    const buffer = [];\n    for (let i of str) {\n        const _code = i.charCodeAt(0);\n        if (_code < 0x80) {\n            buffer.push(_code);\n        } else if (_code < 0x800) {\n            buffer.push(0xc0 + (_code >> 6));\n            buffer.push(0x80 + (_code & 0x3f));\n        } else if (_code < 0x10000) {\n            buffer.push(0xe0 + (_code >> 12));\n            buffer.push(0x80 + (_code >> 6 & 0x3f));\n            buffer.push(0x80 + (_code & 0x3f));\n        }\n    }\n    return Uint8Array.from(buffer);\n}\n\nfunction toHexString(bytes){\n    return  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');\n}\n\nfunction handleError(f, args) {\n    try {\n        return f.apply(this, args);\n    } catch (e) {\n        _ffi_wasm_equality_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_exn_store(addHeapObject(e));\n    }\n}\n\nfunction __wbg_randomFillSync_6894564c2c334c42() { return handleError(function (arg0, arg1, arg2) {\n    getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));\n}, arguments) };\n\nfunction __wbindgen_object_drop_ref(arg0) {\n    takeObject(arg0);\n};\n\nfunction __wbg_getRandomValues_805f1c3d65988a5a() { return handleError(function (arg0, arg1) {\n    getObject(arg0).getRandomValues(getObject(arg1));\n}, arguments) };\n\nfunction __wbg_crypto_e1d53a1d73fb10b8(arg0) {\n    const ret = getObject(arg0).crypto;\n    return addHeapObject(ret);\n};\n\nfunction __wbindgen_is_object(arg0) {\n    const val = getObject(arg0);\n    const ret = typeof(val) === 'object' && val !== null;\n    return ret;\n};\n\nfunction __wbg_process_038c26bf42b093f8(arg0) {\n    const ret = getObject(arg0).process;\n    return addHeapObject(ret);\n};\n\nfunction __wbg_versions_ab37218d2f0b24a8(arg0) {\n    const ret = getObject(arg0).versions;\n    return addHeapObject(ret);\n};\n\nfunction __wbg_node_080f4b19d15bc1fe(arg0) {\n    const ret = getObject(arg0).node;\n    return addHeapObject(ret);\n};\n\nfunction __wbindgen_is_string(arg0) {\n    const ret = typeof(getObject(arg0)) === 'string';\n    return ret;\n};\n\nfunction __wbg_msCrypto_6e7d3e1f92610cbb(arg0) {\n    const ret = getObject(arg0).msCrypto;\n    return addHeapObject(ret);\n};\n\nfunction __wbg_require_78a3dcfbdba9cbce() { return handleError(function () {\n    const ret = module.require;\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbindgen_is_function(arg0) {\n    const ret = typeof(getObject(arg0)) === 'function';\n    return ret;\n};\n\nfunction __wbindgen_string_new(arg0, arg1) {\n    const ret = getStringFromWasm0(arg0, arg1);\n    return addHeapObject(ret);\n};\n\nfunction __wbg_newnoargs_b5b063fc6c2f0376(arg0, arg1) {\n    const ret = new Function(getStringFromWasm0(arg0, arg1));\n    return addHeapObject(ret);\n};\n\nfunction __wbg_call_97ae9d8645dc388b() { return handleError(function (arg0, arg1) {\n    const ret = getObject(arg0).call(getObject(arg1));\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbindgen_object_clone_ref(arg0) {\n    const ret = getObject(arg0);\n    return addHeapObject(ret);\n};\n\nfunction __wbg_self_6d479506f72c6a71() { return handleError(function () {\n    const ret = self.self;\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbg_window_f2557cc78490aceb() { return handleError(function () {\n    const ret = window.window;\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbg_globalThis_7f206bda628d5286() { return handleError(function () {\n    const ret = globalThis.globalThis;\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbg_global_ba75c50d1cf384f4() { return handleError(function () {\n    const ret = __webpack_require__.g.global;\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbindgen_is_undefined(arg0) {\n    const ret = getObject(arg0) === undefined;\n    return ret;\n};\n\nfunction __wbg_call_168da88779e35f61() { return handleError(function (arg0, arg1, arg2) {\n    const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));\n    return addHeapObject(ret);\n}, arguments) };\n\nfunction __wbg_buffer_3f3d764d4747d564(arg0) {\n    const ret = getObject(arg0).buffer;\n    return addHeapObject(ret);\n};\n\nfunction __wbg_new_8c3f0052272a457a(arg0) {\n    const ret = new Uint8Array(getObject(arg0));\n    return addHeapObject(ret);\n};\n\nfunction __wbg_set_83db9690f9353e79(arg0, arg1, arg2) {\n    getObject(arg0).set(getObject(arg1), arg2 >>> 0);\n};\n\nfunction __wbg_length_9e1ae1900cb0fbd5(arg0) {\n    const ret = getObject(arg0).length;\n    return ret;\n};\n\nfunction __wbg_newwithlength_f5933855e4f48a19(arg0) {\n    const ret = new Uint8Array(arg0 >>> 0);\n    return addHeapObject(ret);\n};\n\nfunction __wbg_subarray_58ad4efbb5bcb886(arg0, arg1, arg2) {\n    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);\n    return addHeapObject(ret);\n};\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\nfunction __wbindgen_memory() {\n    const ret = _ffi_wasm_equality_bg_wasm__WEBPACK_IMPORTED_MODULE_0__.memory;\n    return addHeapObject(ret);\n};\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://webassemly/./src/ffi_wasm_equality_bg.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ffi_wasm_equality_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ffi_wasm_equality_bg */ \"./src/ffi_wasm_equality_bg.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ffi_wasm_equality_bg__WEBPACK_IMPORTED_MODULE_0__]);\n_ffi_wasm_equality_bg__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\r\nwindow.EncodeObject = _ffi_wasm_equality_bg__WEBPACK_IMPORTED_MODULE_0__\r\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://webassemly/./src/index.js?");

/***/ }),

/***/ "./src/ffi_wasm_equality_bg.wasm":
/*!***************************************!*\
  !*** ./src/ffi_wasm_equality_bg.wasm ***!
  \***************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("var __webpack_instantiate__ = ([WEBPACK_IMPORTED_MODULE_0]) => {\n\treturn __webpack_require__.v(exports, module.id, \"4abbe5a956b6aafd57cf\", {\n\t\t\"./ffi_wasm_equality_bg.js\": {\n\t\t\t\"__wbg_randomFillSync_6894564c2c334c42\": WEBPACK_IMPORTED_MODULE_0.__wbg_randomFillSync_6894564c2c334c42,\n\t\t\t\"__wbindgen_object_drop_ref\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_object_drop_ref,\n\t\t\t\"__wbg_getRandomValues_805f1c3d65988a5a\": WEBPACK_IMPORTED_MODULE_0.__wbg_getRandomValues_805f1c3d65988a5a,\n\t\t\t\"__wbg_crypto_e1d53a1d73fb10b8\": WEBPACK_IMPORTED_MODULE_0.__wbg_crypto_e1d53a1d73fb10b8,\n\t\t\t\"__wbindgen_is_object\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_is_object,\n\t\t\t\"__wbg_process_038c26bf42b093f8\": WEBPACK_IMPORTED_MODULE_0.__wbg_process_038c26bf42b093f8,\n\t\t\t\"__wbg_versions_ab37218d2f0b24a8\": WEBPACK_IMPORTED_MODULE_0.__wbg_versions_ab37218d2f0b24a8,\n\t\t\t\"__wbg_node_080f4b19d15bc1fe\": WEBPACK_IMPORTED_MODULE_0.__wbg_node_080f4b19d15bc1fe,\n\t\t\t\"__wbindgen_is_string\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_is_string,\n\t\t\t\"__wbg_msCrypto_6e7d3e1f92610cbb\": WEBPACK_IMPORTED_MODULE_0.__wbg_msCrypto_6e7d3e1f92610cbb,\n\t\t\t\"__wbg_require_78a3dcfbdba9cbce\": WEBPACK_IMPORTED_MODULE_0.__wbg_require_78a3dcfbdba9cbce,\n\t\t\t\"__wbindgen_is_function\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_is_function,\n\t\t\t\"__wbindgen_string_new\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_string_new,\n\t\t\t\"__wbg_newnoargs_b5b063fc6c2f0376\": WEBPACK_IMPORTED_MODULE_0.__wbg_newnoargs_b5b063fc6c2f0376,\n\t\t\t\"__wbg_call_97ae9d8645dc388b\": WEBPACK_IMPORTED_MODULE_0.__wbg_call_97ae9d8645dc388b,\n\t\t\t\"__wbindgen_object_clone_ref\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_object_clone_ref,\n\t\t\t\"__wbg_self_6d479506f72c6a71\": WEBPACK_IMPORTED_MODULE_0.__wbg_self_6d479506f72c6a71,\n\t\t\t\"__wbg_window_f2557cc78490aceb\": WEBPACK_IMPORTED_MODULE_0.__wbg_window_f2557cc78490aceb,\n\t\t\t\"__wbg_globalThis_7f206bda628d5286\": WEBPACK_IMPORTED_MODULE_0.__wbg_globalThis_7f206bda628d5286,\n\t\t\t\"__wbg_global_ba75c50d1cf384f4\": WEBPACK_IMPORTED_MODULE_0.__wbg_global_ba75c50d1cf384f4,\n\t\t\t\"__wbindgen_is_undefined\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_is_undefined,\n\t\t\t\"__wbg_call_168da88779e35f61\": WEBPACK_IMPORTED_MODULE_0.__wbg_call_168da88779e35f61,\n\t\t\t\"__wbg_buffer_3f3d764d4747d564\": WEBPACK_IMPORTED_MODULE_0.__wbg_buffer_3f3d764d4747d564,\n\t\t\t\"__wbg_new_8c3f0052272a457a\": WEBPACK_IMPORTED_MODULE_0.__wbg_new_8c3f0052272a457a,\n\t\t\t\"__wbg_set_83db9690f9353e79\": WEBPACK_IMPORTED_MODULE_0.__wbg_set_83db9690f9353e79,\n\t\t\t\"__wbg_length_9e1ae1900cb0fbd5\": WEBPACK_IMPORTED_MODULE_0.__wbg_length_9e1ae1900cb0fbd5,\n\t\t\t\"__wbg_newwithlength_f5933855e4f48a19\": WEBPACK_IMPORTED_MODULE_0.__wbg_newwithlength_f5933855e4f48a19,\n\t\t\t\"__wbg_subarray_58ad4efbb5bcb886\": WEBPACK_IMPORTED_MODULE_0.__wbg_subarray_58ad4efbb5bcb886,\n\t\t\t\"__wbindgen_throw\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_throw,\n\t\t\t\"__wbindgen_memory\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_memory\n\t\t}\n\t});\n}\n__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => {\n\ttry {\n\t/* harmony import */ var WEBPACK_IMPORTED_MODULE_0 = __webpack_require__(/*! ./ffi_wasm_equality_bg.js */ \"./src/ffi_wasm_equality_bg.js\");\n\tvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([WEBPACK_IMPORTED_MODULE_0]);\n\tvar [WEBPACK_IMPORTED_MODULE_0] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__;\n\tawait __webpack_require__.v(exports, module.id, \"4abbe5a956b6aafd57cf\", {\n\t\t\"./ffi_wasm_equality_bg.js\": {\n\t\t\t\"__wbg_randomFillSync_6894564c2c334c42\": WEBPACK_IMPORTED_MODULE_0.__wbg_randomFillSync_6894564c2c334c42,\n\t\t\t\"__wbindgen_object_drop_ref\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_object_drop_ref,\n\t\t\t\"__wbg_getRandomValues_805f1c3d65988a5a\": WEBPACK_IMPORTED_MODULE_0.__wbg_getRandomValues_805f1c3d65988a5a,\n\t\t\t\"__wbg_crypto_e1d53a1d73fb10b8\": WEBPACK_IMPORTED_MODULE_0.__wbg_crypto_e1d53a1d73fb10b8,\n\t\t\t\"__wbindgen_is_object\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_is_object,\n\t\t\t\"__wbg_process_038c26bf42b093f8\": WEBPACK_IMPORTED_MODULE_0.__wbg_process_038c26bf42b093f8,\n\t\t\t\"__wbg_versions_ab37218d2f0b24a8\": WEBPACK_IMPORTED_MODULE_0.__wbg_versions_ab37218d2f0b24a8,\n\t\t\t\"__wbg_node_080f4b19d15bc1fe\": WEBPACK_IMPORTED_MODULE_0.__wbg_node_080f4b19d15bc1fe,\n\t\t\t\"__wbindgen_is_string\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_is_string,\n\t\t\t\"__wbg_msCrypto_6e7d3e1f92610cbb\": WEBPACK_IMPORTED_MODULE_0.__wbg_msCrypto_6e7d3e1f92610cbb,\n\t\t\t\"__wbg_require_78a3dcfbdba9cbce\": WEBPACK_IMPORTED_MODULE_0.__wbg_require_78a3dcfbdba9cbce,\n\t\t\t\"__wbindgen_is_function\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_is_function,\n\t\t\t\"__wbindgen_string_new\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_string_new,\n\t\t\t\"__wbg_newnoargs_b5b063fc6c2f0376\": WEBPACK_IMPORTED_MODULE_0.__wbg_newnoargs_b5b063fc6c2f0376,\n\t\t\t\"__wbg_call_97ae9d8645dc388b\": WEBPACK_IMPORTED_MODULE_0.__wbg_call_97ae9d8645dc388b,\n\t\t\t\"__wbindgen_object_clone_ref\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_object_clone_ref,\n\t\t\t\"__wbg_self_6d479506f72c6a71\": WEBPACK_IMPORTED_MODULE_0.__wbg_self_6d479506f72c6a71,\n\t\t\t\"__wbg_window_f2557cc78490aceb\": WEBPACK_IMPORTED_MODULE_0.__wbg_window_f2557cc78490aceb,\n\t\t\t\"__wbg_globalThis_7f206bda628d5286\": WEBPACK_IMPORTED_MODULE_0.__wbg_globalThis_7f206bda628d5286,\n\t\t\t\"__wbg_global_ba75c50d1cf384f4\": WEBPACK_IMPORTED_MODULE_0.__wbg_global_ba75c50d1cf384f4,\n\t\t\t\"__wbindgen_is_undefined\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_is_undefined,\n\t\t\t\"__wbg_call_168da88779e35f61\": WEBPACK_IMPORTED_MODULE_0.__wbg_call_168da88779e35f61,\n\t\t\t\"__wbg_buffer_3f3d764d4747d564\": WEBPACK_IMPORTED_MODULE_0.__wbg_buffer_3f3d764d4747d564,\n\t\t\t\"__wbg_new_8c3f0052272a457a\": WEBPACK_IMPORTED_MODULE_0.__wbg_new_8c3f0052272a457a,\n\t\t\t\"__wbg_set_83db9690f9353e79\": WEBPACK_IMPORTED_MODULE_0.__wbg_set_83db9690f9353e79,\n\t\t\t\"__wbg_length_9e1ae1900cb0fbd5\": WEBPACK_IMPORTED_MODULE_0.__wbg_length_9e1ae1900cb0fbd5,\n\t\t\t\"__wbg_newwithlength_f5933855e4f48a19\": WEBPACK_IMPORTED_MODULE_0.__wbg_newwithlength_f5933855e4f48a19,\n\t\t\t\"__wbg_subarray_58ad4efbb5bcb886\": WEBPACK_IMPORTED_MODULE_0.__wbg_subarray_58ad4efbb5bcb886,\n\t\t\t\"__wbindgen_throw\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_throw,\n\t\t\t\"__wbindgen_memory\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_memory\n\t\t}\n\t});\n\t__webpack_async_result__();\n\t} catch(e) { __webpack_async_result__(e); }\n}, 1);\n\n//# sourceURL=webpack://webassemly/./src/ffi_wasm_equality_bg.wasm?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/wasm loading */
/******/ 	(() => {
/******/ 		__webpack_require__.v = (exports, wasmModuleId, wasmModuleHash, importsObj) => {
/******/ 			var req = fetch(__webpack_require__.p + "" + wasmModuleHash + ".module.wasm");
/******/ 			if (typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 				return WebAssembly.instantiateStreaming(req, importsObj)
/******/ 					.then((res) => (Object.assign(exports, res.instance.exports)));
/******/ 			}
/******/ 			return req
/******/ 				.then((x) => (x.arrayBuffer()))
/******/ 				.then((bytes) => (WebAssembly.instantiate(bytes, importsObj)))
/******/ 				.then((res) => (Object.assign(exports, res.instance.exports)));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;