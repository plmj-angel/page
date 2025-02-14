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

/***/ "./res/pageData.ts":
/*!*************************!*\
  !*** ./res/pageData.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getPageValues: () => (/* binding */ getPageValues)\n/* harmony export */ });\nconst htmlIds = [\n    //attack fields\n    \"models\", \"attacks\", \"skill\", \"str\", \"ap\", \"dmg\", \"hitMod\", \"lethHit\", \"susHits\", \"hitCrit\", \"critRolls\", \"reroll\", \"woundMod\", \"devastWound\", \"woundCrit\", \"woundRoll\", \"woundReroll\",\n    //defense fields\n    \"defModels\", \"tough\", \"save\", \"invuln\", \"wounds\", \"saveMod\", \"cover\", \"saveReroll\", \"noPain\"\n];\nfunction getPageValues() {\n    const fieldValues = {};\n    htmlIds.forEach(htmlId => {\n        const element = document.getElementById(htmlId);\n        if (element) {\n            fieldValues[htmlId] = getInputValue(element);\n        }\n    });\n    return fieldValues;\n}\nfunction getInputValue(element) {\n    const inputElement = element;\n    if (inputElement.type === \"checkbox\") {\n        return inputElement.checked;\n    }\n    return inputElement.value;\n}\n\n\n//# sourceURL=webpack://page/./res/pageData.ts?");

/***/ }),

/***/ "./res/scripts.ts":
/*!************************!*\
  !*** ./res/scripts.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pageData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageData */ \"./res/pageData.ts\");\n\nclass RollsGroup {\n    rollSimulationResults = [];\n    successValues = [];\n    failValues = [];\n    rolledAOne = 0;\n    threshold = 0;\n}\nfunction clickRollBtn() {\n    const pageValues = (0,_pageData__WEBPACK_IMPORTED_MODULE_0__.getPageValues)();\n    const firstRolls = new RollsGroup();\n    const woundRolls = new RollsGroup();\n    const saveRolls = new RollsGroup();\n    const totalRolls = getTotalRolls(+pageValues.models, +pageValues.attacks);\n    firstRolls.successValues = getHitRolls(totalRolls, firstRolls);\n    woundRolls.successValues = getWoundRollSuccesses(firstRolls.successValues.length, +pageValues.str, +pageValues.tough, woundRolls);\n    saveRolls.failValues = getThirdRollFails(woundRolls.successValues.length, +pageValues.save, saveRolls);\n    const totalWounds = getTotalWounds(saveRolls.failValues.length, +pageValues.dmg);\n    let calculatedData = {};\n    calculatedData.firstRolls = totalRolls;\n    calculatedData.firstRoll = firstRolls;\n    calculatedData.woundRoll = woundRolls;\n    calculatedData.saveRoll = saveRolls;\n    calculatedData.totalWounds = totalWounds;\n    console.log(pageValues);\n    writeToTestArea(calculatedData, \"testArea\");\n}\nfunction writeToTestArea(dataObject, testAreaId) {\n    const testArea = document.getElementById(testAreaId);\n    if (!testArea) {\n        throw new Error(\"you done goofed the test area id smh\");\n    }\n    testArea.innerHTML = \"\"; // wipe the test area\n    const formatValue = (value, indent = \"&nbsp;&nbsp;\") => {\n        if (Array.isArray(value)) {\n            // Keep arrays on a single line\n            return `[ ${value.map((item) => formatValue(item)).join(\", \")} ]`;\n        }\n        else if (typeof value === \"object\" && value !== null) {\n            // Always format objects with new lines and indentation\n            return `{<br>${Object.entries(value)\n                .map(([subKey, subValue]) => `${indent}${subKey}: ${formatValue(subValue, indent + \"&nbsp;&nbsp;\")}`)\n                .join(\"<br>\")}<br>}`;\n        }\n        // Primitive values (string, number, boolean) stay on the same line\n        return String(value);\n    };\n    Object.entries(dataObject).forEach(([key, value]) => {\n        const paraElement = document.createElement(\"p\");\n        // If the value is a primitive or an array, keep it on one line\n        if (typeof value !== \"object\" || value === null || Array.isArray(value)) {\n            paraElement.innerHTML = `<strong>${key}:</strong> ${formatValue(value)}`;\n        }\n        else {\n            // If it's an object, format it with new lines\n            paraElement.innerHTML = `<strong>${key}:</strong> <br>${formatValue(value)}`;\n        }\n        testArea.appendChild(paraElement);\n    });\n}\nfunction performRoll(dieSides = 6) {\n    return Math.floor(Math.random() * dieSides) + 1;\n}\nfunction simulateRolls(rollsAmount, rollCallback, dieSides = 6) {\n    const simulationResults = [];\n    for (let i = 0; i < rollsAmount; i++) {\n        const rollResult = performRoll(dieSides);\n        const result = rollCallback(rollResult);\n        if (result !== null) {\n            simulationResults.push(result);\n        }\n    }\n    return simulationResults;\n}\nfunction getTotalRolls(models, attacks) {\n    return models * attacks;\n}\nfunction getHitRolls(rollsAmmount, firstRolls) {\n    const hitRolls = simulateRolls(rollsAmmount, (rollResult) => {\n        if (rollResult > 1) {\n            return rollResult;\n        }\n        else { //TESTING ELSE BLOCK!\n            firstRolls.rolledAOne++;\n            console.log(\"rolled a 1\");\n            return null;\n        }\n    });\n    return hitRolls;\n}\nfunction getWoundRollSuccesses(hitRolls, str, tough, woundRolls) {\n    woundRolls.threshold = getWoundThreshold(str, tough);\n    const woundSuccesses = simulateRolls(hitRolls, (rollResult) => {\n        woundRolls.rollSimulationResults.push(rollResult);\n        if (rollResult > 1) {\n            if (rollResult >= woundRolls.threshold) {\n                return rollResult;\n            }\n            return null;\n        }\n        else { //TESTING ELSE BLOCK!\n            woundRolls.rolledAOne++;\n            console.log(\"rolled a 1 (wound roll)\");\n            return null;\n        }\n    });\n    return woundSuccesses;\n}\nfunction getWoundThreshold(str, tough) {\n    if (str >= tough * 2) {\n        return 2;\n    }\n    else if (str > tough) {\n        return 3;\n    }\n    else if (str === tough) {\n        return 4;\n    }\n    else if (str < tough && str > tough / 2) {\n        return 5;\n    }\n    else if (str <= tough / 2) {\n        return 6;\n    }\n    else {\n        throw new Error(`Error Calculating wound threshold roll. Roll with the value for the strength of ${str} and toughness of ${tough}`);\n    }\n}\nfunction getThirdRollFails(threshold, save, saveRolls) {\n    const thirdRollFails = simulateRolls(threshold, (rollResult) => {\n        if (rollResult > save) {\n            return rollResult;\n        }\n        saveRolls.rolledAOne++;\n        return null;\n    });\n    return thirdRollFails;\n}\nfunction getTotalWounds(fails, damage) {\n    return fails * damage;\n}\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const rollButton = document.getElementById(\"rollButton\");\n    if (rollButton) {\n        rollButton.addEventListener(\"click\", clickRollBtn);\n    }\n});\n\n\n//# sourceURL=webpack://page/./res/scripts.ts?");

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