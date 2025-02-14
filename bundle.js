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

/***/ "./res/hitRolls.ts":
/*!*************************!*\
  !*** ./res/hitRolls.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HitRolls: () => (/* binding */ HitRolls)\n/* harmony export */ });\n/* harmony import */ var _rollgroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rollgroups */ \"./res/rollgroups.ts\");\n\nclass HitRolls extends _rollgroups__WEBPACK_IMPORTED_MODULE_0__.RollsGroup {\n    constructor(userInputValues) {\n        super();\n        this.totalRolls = +userInputValues.models * +userInputValues.attacks;\n        this.rolledAOne = 0;\n        this.getHitRolls(+userInputValues.skill);\n    }\n    getHitRolls(skill) {\n        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {\n            if (rollResult === 1) {\n                this.rolledAOne++;\n                console.log(\"rolled a 1\");\n                this.failValues.push(rollResult);\n                return null;\n            }\n            if (rollResult >= skill) {\n                return rollResult;\n            }\n            else {\n                this.failValues.push(rollResult);\n                return null;\n            }\n        });\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/hitRolls.ts?");

/***/ }),

/***/ "./res/pageData.ts":
/*!*************************!*\
  !*** ./res/pageData.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getPageValues: () => (/* binding */ getPageValues)\n/* harmony export */ });\nconst htmlIds = [\n    //attack fields\n    \"models\", \"attacks\", \"skill\", \"str\", \"ap\", \"dmg\", \"hitMod\", \"lethHit\", \"susHits\", \"hitCrit\", \"critRolls\", \"reroll\", \"woundMod\", \"devastWound\", \"woundCrit\", \"woundRoll\", \"woundReroll\",\n    //defense fields\n    \"defModels\", \"tough\", \"save\", \"invuln\", \"wounds\", \"saveMod\", \"cover\", \"saveReroll\", \"noPain\", \"miniModels\", \"miniWounds\", \"leaderWounds\"\n];\nconst devValues = {\n    \"models\": \"3\",\n    \"attacks\": \"5\",\n    \"skill\": \"3\",\n    \"str\": \"4\",\n    \"ap\": \"1\",\n    \"dmg\": \"2\",\n    \"woundMod\": \"\",\n    \"devastWound\": false,\n    \"woundCrit\": \"\",\n    \"woundRoll\": \"NONE\",\n    \"woundReroll\": \"NONE\",\n    \"defModels\": \"2\",\n    \"tough\": \"2\",\n    \"save\": \"2\",\n    \"invuln\": \"0\",\n    \"wounds\": \"5\", //hp\n    \"saveMod\": \"\",\n    \"cover\": false,\n    \"saveReroll\": \"\",\n    \"noPain\": \"\",\n    \"miniModels\": \"2\",\n    \"miniWounds\": \"2\",\n    \"leaderWounds\": \"1\"\n};\nfunction getPageValues(devMode = false) {\n    const fieldValues = {};\n    //testing block\n    if (devMode) {\n        htmlIds.forEach(htmlId => {\n            const element = document.getElementById(htmlId);\n            if (element) {\n                const inputElement = element;\n                inputElement.value = devValues[htmlId].toString();\n            }\n        });\n        return devValues;\n    }\n    ///////////////////////////////////////////////////\n    htmlIds.forEach(htmlId => {\n        const element = document.getElementById(htmlId);\n        if (element) {\n            fieldValues[htmlId] = getInputValue(element);\n        }\n    });\n    return fieldValues;\n}\nfunction getInputValue(element) {\n    const inputElement = element;\n    if (inputElement.type === \"checkbox\") {\n        return inputElement.checked;\n    }\n    return inputElement.value;\n}\n\n\n//# sourceURL=webpack://page/./res/pageData.ts?");

/***/ }),

/***/ "./res/rollgroups.ts":
/*!***************************!*\
  !*** ./res/rollgroups.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RollsGroup: () => (/* binding */ RollsGroup)\n/* harmony export */ });\nclass RollsGroup {\n    allRollSimulationResults = [];\n    successValues = [];\n    failValues = [];\n    rolledAOne = 0;\n    totalRolls = 0;\n    performRoll(dieSides = 6) {\n        return Math.floor(Math.random() * dieSides) + 1;\n    }\n    simulateRolls(rollsAmount, rollCallback, dieSides = 6) {\n        this.totalRolls = rollsAmount;\n        this.allRollSimulationResults = [];\n        const simulationResults = [];\n        for (let i = 0; i < rollsAmount; i++) {\n            const rollResult = this.performRoll(dieSides);\n            this.allRollSimulationResults.push(rollResult);\n            const result = rollCallback(rollResult);\n            if (result !== null) {\n                simulationResults.push(result);\n            }\n        }\n        return simulationResults;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/rollgroups.ts?");

/***/ }),

/***/ "./res/saveRolls.ts":
/*!**************************!*\
  !*** ./res/saveRolls.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SaveRolls: () => (/* binding */ SaveRolls)\n/* harmony export */ });\n/* harmony import */ var _rollgroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rollgroups */ \"./res/rollgroups.ts\");\n\nclass SaveRolls extends _rollgroups__WEBPACK_IMPORTED_MODULE_0__.RollsGroup {\n    constructor(totalWounds, userInputValues) {\n        super();\n        this.totalRolls = totalWounds;\n        this.rollSaves(+userInputValues.save);\n    }\n    rollSaves(save) {\n        this.failValues = [];\n        this.successValues = [];\n        this.simulateRolls(this.totalRolls, (rollResult) => {\n            if (rollResult === 1) {\n                this.rolledAOne++;\n                console.log(\"rolled a 1 (save roll)\");\n                this.failValues.push(rollResult);\n                return null;\n            }\n            if (rollResult < save) {\n                this.failValues.push(rollResult);\n                return null;\n            }\n            else {\n                this.successValues.push(rollResult);\n                return rollResult;\n            }\n        });\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/saveRolls.ts?");

/***/ }),

/***/ "./res/scripts.ts":
/*!************************!*\
  !*** ./res/scripts.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pageData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageData */ \"./res/pageData.ts\");\n/* harmony import */ var _hitRolls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hitRolls */ \"./res/hitRolls.ts\");\n/* harmony import */ var _woundRolls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./woundRolls */ \"./res/woundRolls.ts\");\n/* harmony import */ var _saveRolls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./saveRolls */ \"./res/saveRolls.ts\");\n\n\n\n\nfunction clickRollBtn() {\n    const userInputValues = (0,_pageData__WEBPACK_IMPORTED_MODULE_0__.getPageValues)();\n    const hitRolls = new _hitRolls__WEBPACK_IMPORTED_MODULE_1__.HitRolls(userInputValues);\n    const woundRolls = new _woundRolls__WEBPACK_IMPORTED_MODULE_2__.WoundRolls(hitRolls.successValues.length, userInputValues);\n    const saveRolls = new _saveRolls__WEBPACK_IMPORTED_MODULE_3__.SaveRolls(woundRolls.successValues.length, userInputValues);\n    const totalWoundsInflicted = getTotalWounds(saveRolls.failValues.length, +userInputValues.dmg);\n    const { modelsKilled, remainingWounds, unitDestroyed, modelsRemaining } = getModelsKilled(totalWoundsInflicted, +userInputValues.wounds, +userInputValues.defModels, +userInputValues.dmg);\n    //testing values/////////////////////////////////////////////////\n    let calculatedData = {};\n    calculatedData.firstRoll = hitRolls;\n    calculatedData.woundRoll = woundRolls;\n    calculatedData.saveRoll = saveRolls;\n    calculatedData.totalWounds = totalWoundsInflicted;\n    calculatedData.modelsKilled = modelsKilled;\n    calculatedData.remainingWounds = remainingWounds;\n    calculatedData.survivingModels = modelsRemaining;\n    calculatedData.entireUnitDestroyed = unitDestroyed;\n    calculatedData.userInput = userInputValues;\n    addResultsToGlobalWindow(calculatedData);\n    console.log(calculatedData);\n    writeToTestArea(calculatedData, \"testArea\");\n    /////////////////////////////////////////////////////////////////\n}\nfunction getTotalWounds(fails, damage) {\n    return fails * damage;\n}\nfunction getModelsKilled(totalWounds, modelWounds, totalModels, damagePerHit) {\n    if (modelWounds <= 0 || totalModels <= 0 || damagePerHit <= 0) {\n        throw new Error(\"Invalid enemy model wounds, total models, or damage per hit value.\");\n    }\n    let woundsRemaining = totalWounds;\n    let modelsKilled = 0;\n    let modelsRemaining = totalModels;\n    let currentModelWounds = modelWounds;\n    while (woundsRemaining > 0 && modelsRemaining > 0) {\n        if (woundsRemaining >= damagePerHit) {\n            if (damagePerHit >= currentModelWounds) {\n                modelsKilled++;\n                woundsRemaining -= damagePerHit;\n                modelsRemaining--;\n                if (modelsRemaining > 0) {\n                    currentModelWounds = modelWounds;\n                }\n                else {\n                    currentModelWounds = 0;\n                }\n            }\n            else {\n                currentModelWounds -= damagePerHit;\n                woundsRemaining -= damagePerHit;\n            }\n        }\n        else {\n            break;\n        }\n    }\n    const unitDestroyed = modelsRemaining === 0;\n    const remainingWounds = modelsRemaining > 0 ? currentModelWounds : 0;\n    return { modelsKilled, remainingWounds, unitDestroyed, modelsRemaining };\n}\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const rollButton = document.getElementById(\"rollButton\");\n    if (rollButton) {\n        rollButton.addEventListener(\"click\", clickRollBtn);\n    }\n});\n//for Nacho testing\nfunction writeToTestArea(dataObject, testAreaId) {\n    const testArea = document.getElementById(testAreaId);\n    if (!testArea) {\n        throw new Error(\"you done goofed the test area id smh\");\n    }\n    testArea.innerHTML = \"\"; // wipe the test area. (rerolls)\n    const formatValue = (value, indent = \"&nbsp;&nbsp;\") => {\n        if (Array.isArray(value)) {\n            return `[ ${value.map((item) => formatValue(item)).join(\", \")} ]`;\n        }\n        else if (typeof value === \"object\" && value !== null) {\n            return `{<br>${Object.entries(value)\n                .map(([subKey, subValue]) => `${indent}${subKey}: ${formatValue(subValue, indent + \"&nbsp;&nbsp;\")}`)\n                .join(\"<br>\")}<br>}`;\n        }\n        return String(value);\n    };\n    Object.entries(dataObject).forEach(([key, value]) => {\n        const paraElement = document.createElement(\"p\");\n        if (typeof value !== \"object\" || value === null || Array.isArray(value)) {\n            paraElement.innerHTML = `<strong>${key}:</strong> ${formatValue(value)}`;\n        }\n        else {\n            paraElement.innerHTML = `<strong>${key}:</strong> <br>${formatValue(value)}`;\n        }\n        testArea.appendChild(paraElement);\n    });\n}\nfunction addResultsToGlobalWindow(results) {\n    const key = \"turnResults\";\n    if (!Array.isArray(window[key])) {\n        window[key] = [];\n    }\n    window[key].push(results);\n    console.log(window[key]);\n}\n\n\n//# sourceURL=webpack://page/./res/scripts.ts?");

/***/ }),

/***/ "./res/woundRolls.ts":
/*!***************************!*\
  !*** ./res/woundRolls.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WoundRolls: () => (/* binding */ WoundRolls)\n/* harmony export */ });\n/* harmony import */ var _rollgroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rollgroups */ \"./res/rollgroups.ts\");\n\nclass WoundRolls extends _rollgroups__WEBPACK_IMPORTED_MODULE_0__.RollsGroup {\n    threshold;\n    constructor(totalHits, userInputValues) {\n        super();\n        this.totalRolls = totalHits;\n        this.threshold = this.getWoundThreshold(+userInputValues.str, +userInputValues.tough);\n        this.getWoundRollSuccesses();\n    }\n    getWoundRollSuccesses() {\n        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {\n            if (rollResult >= this.threshold) {\n                return rollResult;\n            }\n            else {\n                if (rollResult === 1) {\n                    this.rolledAOne++;\n                    console.log(\"rolled a 1 (wound roll)\");\n                }\n                this.failValues.push(rollResult);\n                return null;\n            }\n        });\n    }\n    getWoundThreshold(strength, toughness) {\n        if (strength === 0 && toughness === 0)\n            return 0;\n        if (strength >= toughness * 2)\n            return 2;\n        if (strength > toughness)\n            return 3;\n        if (strength === toughness)\n            return 4;\n        if (strength < toughness && strength > toughness / 2)\n            return 5;\n        return 6;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/woundRolls.ts?");

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./res/scripts.ts");
/******/ 	
/******/ })()
;