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

/***/ "./res/ts/RollGroups/hitRolls.ts":
/*!***************************************!*\
  !*** ./res/ts/RollGroups/hitRolls.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HitRolls: () => (/* binding */ HitRolls)\n/* harmony export */ });\n/* harmony import */ var _rollgroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rollgroups */ \"./res/ts/RollGroups/rollgroups.ts\");\n\nclass HitRolls extends _rollgroups__WEBPACK_IMPORTED_MODULE_0__.RollsGroup {\n    constructor(userInputValues) {\n        super();\n        this.totalRolls = +userInputValues.models * +userInputValues.attacks;\n        this.rolledAOne = 0;\n        this.getHitRolls(+userInputValues.skill);\n        this.successes = this.successValues.length;\n    }\n    getHitRolls(skill) {\n        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {\n            if (rollResult === 1) {\n                this.rolledAOne++;\n                //console.log(\"rolled a 1\");\n                this.failValues.push(rollResult);\n                return null;\n            }\n            if (rollResult >= skill) {\n                return rollResult;\n            }\n            else {\n                this.failValues.push(rollResult);\n                return null;\n            }\n        });\n        this.fails = this.failValues.length;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/RollGroups/hitRolls.ts?");

/***/ }),

/***/ "./res/ts/RollGroups/rollgroups.ts":
/*!*****************************************!*\
  !*** ./res/ts/RollGroups/rollgroups.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RollsGroup: () => (/* binding */ RollsGroup)\n/* harmony export */ });\nclass RollsGroup {\n    allRollSimulationResults = [];\n    successValues = [];\n    successes = 0;\n    failValues = [];\n    fails = 0;\n    rolledAOne = 0;\n    totalRolls = 0;\n    performRoll(dieSides = 6) {\n        return Math.floor(Math.random() * dieSides) + 1;\n    }\n    simulateRolls(rollsAmount, rollCallback, dieSides = 6) {\n        this.totalRolls = rollsAmount;\n        this.allRollSimulationResults = [];\n        const simulationResults = [];\n        for (let i = 0; i < rollsAmount; i++) {\n            const rollResult = this.performRoll(dieSides);\n            this.allRollSimulationResults.push(rollResult);\n            const result = rollCallback(rollResult);\n            if (result !== null) {\n                simulationResults.push(result);\n            }\n        }\n        return simulationResults;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/RollGroups/rollgroups.ts?");

/***/ }),

/***/ "./res/ts/RollGroups/saveRolls.ts":
/*!****************************************!*\
  !*** ./res/ts/RollGroups/saveRolls.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SaveRolls: () => (/* binding */ SaveRolls)\n/* harmony export */ });\n/* harmony import */ var _rollgroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rollgroups */ \"./res/ts/RollGroups/rollgroups.ts\");\n\nclass SaveRolls extends _rollgroups__WEBPACK_IMPORTED_MODULE_0__.RollsGroup {\n    constructor(totalWounds, userInputValues) {\n        super();\n        this.totalRolls = totalWounds;\n        this.rollSaves(+userInputValues.save);\n        this.successes = this.successValues.length;\n    }\n    rollSaves(save) {\n        this.simulateRolls(this.totalRolls, (rollResult) => {\n            if (rollResult === 1) {\n                this.rolledAOne++;\n                //console.log(\"rolled a 1 (save roll)\");\n                this.failValues.push(rollResult);\n                return null;\n            }\n            if (rollResult < save) {\n                this.failValues.push(rollResult);\n                return null;\n            }\n            else {\n                this.successValues.push(rollResult);\n                return rollResult;\n            }\n        });\n        this.fails = this.failValues.length;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/RollGroups/saveRolls.ts?");

/***/ }),

/***/ "./res/ts/RollGroups/woundRolls.ts":
/*!*****************************************!*\
  !*** ./res/ts/RollGroups/woundRolls.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WoundRolls: () => (/* binding */ WoundRolls)\n/* harmony export */ });\n/* harmony import */ var _rollgroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rollgroups */ \"./res/ts/RollGroups/rollgroups.ts\");\n\nclass WoundRolls extends _rollgroups__WEBPACK_IMPORTED_MODULE_0__.RollsGroup {\n    threshold;\n    constructor(totalHits, userInputValues) {\n        super();\n        this.totalRolls = totalHits;\n        this.threshold = this.getWoundThreshold(+userInputValues.str, +userInputValues.tough);\n        this.getWoundRollSuccesses();\n        this.successes = this.successValues.length;\n    }\n    getWoundRollSuccesses() {\n        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {\n            if (rollResult >= this.threshold) {\n                return rollResult;\n            }\n            else {\n                if (rollResult === 1) {\n                    this.rolledAOne++;\n                    //console.log(\"rolled a 1 (wound roll)\"); \n                }\n                this.failValues.push(rollResult);\n                return null;\n            }\n        });\n        this.fails = this.failValues.length;\n    }\n    getWoundThreshold(strength, toughness) {\n        if (strength === 0 && toughness === 0)\n            return 0;\n        if (strength >= toughness * 2)\n            return 2;\n        if (strength > toughness)\n            return 3;\n        if (strength === toughness)\n            return 4;\n        if (strength < toughness && strength > toughness / 2)\n            return 5;\n        return 6;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/RollGroups/woundRolls.ts?");

/***/ }),

/***/ "./res/ts/UnitGroups/BaseUnit.ts":
/*!***************************************!*\
  !*** ./res/ts/UnitGroups/BaseUnit.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BaseUnitClass: () => (/* binding */ BaseUnitClass)\n/* harmony export */ });\nclass BaseUnitClass {\n    unitModels;\n    woundsPerModel;\n    constructor(unitModels, wounds) {\n        this.unitModels = unitModels;\n        this.woundsPerModel = wounds;\n        if (this.woundsPerModel < 0 || this.unitModels < 0) {\n            throw new Error(\"Invalid enemy unit values.\");\n        }\n    }\n    applyWounds(totalWoundsToApply, attackDamage, modelsInUnit = this.unitModels, modelHealth = this.woundsPerModel) {\n        let modelsKilled = 0;\n        let modelsRemaining = modelsInUnit;\n        let attackWoundsRemaining = totalWoundsToApply;\n        let lastModelAttackedWounds = modelHealth;\n        while (attackWoundsRemaining > 0 && modelsRemaining > 0) {\n            //apply wounds in dmg chuncks\n            if (attackWoundsRemaining >= attackDamage) {\n                attackWoundsRemaining -= attackDamage;\n                lastModelAttackedWounds -= attackDamage;\n            }\n            else {\n                lastModelAttackedWounds -= attackWoundsRemaining;\n                attackWoundsRemaining = 0;\n            }\n            //handle deaths\n            if (lastModelAttackedWounds <= 0) {\n                lastModelAttackedWounds = 0; //lower cap\n                lastModelAttackedWounds = modelHealth;\n                modelsKilled++;\n                modelsRemaining--;\n            }\n        }\n        return {\n            modelsKilled, modelsRemaining, attackWoundsRemaining, lastModelAttackedWounds\n        };\n    }\n    thisUnitExists(unitModels) {\n        if (unitModels !== undefined && unitModels > 0) {\n            return true;\n        }\n        return false;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/UnitGroups/BaseUnit.ts?");

/***/ }),

/***/ "./res/ts/UnitGroups/additionalUnits.ts":
/*!**********************************************!*\
  !*** ./res/ts/UnitGroups/additionalUnits.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AdditionalUnitClass: () => (/* binding */ AdditionalUnitClass)\n/* harmony export */ });\n/* harmony import */ var _pageData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pageData */ \"./res/ts/pageData.ts\");\n/* harmony import */ var _BaseUnit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseUnit */ \"./res/ts/UnitGroups/BaseUnit.ts\");\n\n\nclass AdditionalUnitClass extends _BaseUnit__WEBPACK_IMPORTED_MODULE_1__.BaseUnitClass {\n    constructor(userInput) {\n        super((0,_pageData__WEBPACK_IMPORTED_MODULE_0__.getStoredUserInput)(userInput, \"addUnits\"), (0,_pageData__WEBPACK_IMPORTED_MODULE_0__.getStoredUserInput)(userInput, \"addUnitsWounds\"));\n    }\n    applyWoundsToUnit(woundsToApply, damage) {\n        const result = this.applyWounds(woundsToApply, damage);\n        return result;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/UnitGroups/additionalUnits.ts?");

/***/ }),

/***/ "./res/ts/UnitGroups/leaderSoloUnitLmaoLoser.ts":
/*!******************************************************!*\
  !*** ./res/ts/UnitGroups/leaderSoloUnitLmaoLoser.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LeaderUnitClass: () => (/* binding */ LeaderUnitClass)\n/* harmony export */ });\n/* harmony import */ var _pageData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pageData */ \"./res/ts/pageData.ts\");\n/* harmony import */ var _BaseUnit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseUnit */ \"./res/ts/UnitGroups/BaseUnit.ts\");\n\n\nclass LeaderUnitClass extends _BaseUnit__WEBPACK_IMPORTED_MODULE_1__.BaseUnitClass {\n    isLeaderPresent;\n    constructor(userInput) {\n        super(1, (0,_pageData__WEBPACK_IMPORTED_MODULE_0__.getStoredUserInput)(userInput, \"leaderWounds\"));\n        this.isLeaderPresent = (0,_pageData__WEBPACK_IMPORTED_MODULE_0__.getStoredUserInput)(userInput, \"leaderWounds\") > 0;\n    }\n    applyWoundsToUnit(woundsToApply, damage) {\n        const result = this.applyWounds(woundsToApply, damage);\n        let leaderKilled = result.modelsRemaining === 0;\n        let leaderWoundsRemaining = result.lastModelAttackedWounds;\n        return { leaderKilled, leaderWoundsRemaining };\n    }\n    hasALeader(leaderWounds) {\n        if (typeof leaderWounds === undefined) {\n            throw new Error(`someting went wrong uwu`);\n        }\n        return leaderWounds > 0;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/UnitGroups/leaderSoloUnitLmaoLoser.ts?");

/***/ }),

/***/ "./res/ts/UnitGroups/mainUnit.ts":
/*!***************************************!*\
  !*** ./res/ts/UnitGroups/mainUnit.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MainUnitClass: () => (/* binding */ MainUnitClass)\n/* harmony export */ });\n/* harmony import */ var _pageData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pageData */ \"./res/ts/pageData.ts\");\n/* harmony import */ var _BaseUnit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseUnit */ \"./res/ts/UnitGroups/BaseUnit.ts\");\n\n\nclass MainUnitClass extends _BaseUnit__WEBPACK_IMPORTED_MODULE_1__.BaseUnitClass {\n    constructor(userInput) {\n        super((0,_pageData__WEBPACK_IMPORTED_MODULE_0__.getStoredUserInput)(userInput, \"defModels\"), (0,_pageData__WEBPACK_IMPORTED_MODULE_0__.getStoredUserInput)(userInput, \"wounds\"));\n    }\n    applyWoundsToUnit(woundsToApply, damage) {\n        const result = this.applyWounds(woundsToApply, damage);\n        return result;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/UnitGroups/mainUnit.ts?");

/***/ }),

/***/ "./res/ts/pageData.ts":
/*!****************************!*\
  !*** ./res/ts/pageData.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getPageValues: () => (/* binding */ getPageValues),\n/* harmony export */   getStoredUserInput: () => (/* binding */ getStoredUserInput)\n/* harmony export */ });\nconst htmlIds = [\n    //attack fields\n    \"models\", \"attacks\", \"skill\", \"str\", \"ap\", \"dmg\", \"hitMod\", \"lethHit\", \"susHits\", \"hitCrit\", \"critRolls\", \"reroll\", \"woundMod\", \"devastWound\", \"woundCrit\", \"woundRoll\", \"woundReroll\",\n    //defense fields\n    \"defModels\", \"tough\", \"save\", \"invuln\", \"wounds\", \"saveMod\", \"cover\", \"saveReroll\", \"noPain\", \"addUnits\", \"addUnitsWounds\", \"leaderWounds\"\n];\nconst devValues = {\n    \"models\": \"3\",\n    \"attacks\": \"5\",\n    \"skill\": \"3\",\n    \"str\": \"4\",\n    \"ap\": \"1\",\n    \"dmg\": \"2\",\n    \"woundMod\": \"\",\n    \"hitMod\": \"\",\n    \"devastWound\": false,\n    \"woundCrit\": \"\",\n    \"woundRoll\": \"NONE\",\n    \"woundReroll\": \"NONE\",\n    \"defModels\": \"2\",\n    \"tough\": \"2\",\n    \"save\": \"2\",\n    \"invuln\": \"0\",\n    \"wounds\": \"5\", //hp\n    \"saveMod\": \"\",\n    \"cover\": false,\n    \"saveReroll\": \"\",\n    \"noPain\": \"\",\n    \"addUnits\": \"2\",\n    \"addUnitsWounds\": \"2\",\n    \"leaderWounds\": \"0\"\n};\nfunction getPageValues(devMode = false) {\n    const fieldValues = {};\n    //testing block - remember to remove bool param!//////////////////////////////\n    if (devMode) {\n        htmlIds.forEach(htmlId => {\n            const element = document.getElementById(htmlId);\n            if (element) {\n                const inputElement = element;\n                inputElement.value = devValues[htmlId].toString();\n            }\n        });\n        return devValues;\n    }\n    ////////////////////////////////////////////////////////////////////////////\n    htmlIds.forEach(htmlId => {\n        const element = document.getElementById(htmlId);\n        if (element) {\n            fieldValues[htmlId] = getInputValue(element);\n        }\n    });\n    return fieldValues;\n}\nfunction getStoredUserInput(storedValues, propertyKey) {\n    if (storedValues[propertyKey] === null || storedValues[propertyKey] === undefined) {\n        return 0;\n    }\n    return +storedValues[propertyKey];\n}\nfunction getInputValue(element) {\n    const inputElement = element;\n    if (inputElement.type === \"checkbox\") {\n        return inputElement.checked;\n    }\n    return inputElement.value;\n}\n\n\n//# sourceURL=webpack://page/./res/ts/pageData.ts?");

/***/ }),

/***/ "./res/ts/scripts.ts":
/*!***************************!*\
  !*** ./res/ts/scripts.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pageData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageData */ \"./res/ts/pageData.ts\");\n/* harmony import */ var _RollGroups_hitRolls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RollGroups/hitRolls */ \"./res/ts/RollGroups/hitRolls.ts\");\n/* harmony import */ var _RollGroups_woundRolls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RollGroups/woundRolls */ \"./res/ts/RollGroups/woundRolls.ts\");\n/* harmony import */ var _RollGroups_saveRolls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RollGroups/saveRolls */ \"./res/ts/RollGroups/saveRolls.ts\");\n/* harmony import */ var _UnitGroups_mainUnit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UnitGroups/mainUnit */ \"./res/ts/UnitGroups/mainUnit.ts\");\n/* harmony import */ var _UnitGroups_additionalUnits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UnitGroups/additionalUnits */ \"./res/ts/UnitGroups/additionalUnits.ts\");\n/* harmony import */ var _UnitGroups_leaderSoloUnitLmaoLoser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UnitGroups/leaderSoloUnitLmaoLoser */ \"./res/ts/UnitGroups/leaderSoloUnitLmaoLoser.ts\");\n\n\n\n\n\n\n\nfunction clickRollBtn() {\n    const userInputValues = (0,_pageData__WEBPACK_IMPORTED_MODULE_0__.getPageValues)();\n    const hitRolls = new _RollGroups_hitRolls__WEBPACK_IMPORTED_MODULE_1__.HitRolls(userInputValues);\n    const woundRolls = new _RollGroups_woundRolls__WEBPACK_IMPORTED_MODULE_2__.WoundRolls(hitRolls.successValues.length, userInputValues);\n    const saveRolls = new _RollGroups_saveRolls__WEBPACK_IMPORTED_MODULE_3__.SaveRolls(woundRolls.successValues.length, userInputValues);\n    const totalWoundsInflicted = getTotalWounds(saveRolls.failValues.length, +userInputValues.dmg);\n    const mainUnitAttack = new _UnitGroups_mainUnit__WEBPACK_IMPORTED_MODULE_4__.MainUnitClass(userInputValues);\n    const mainUnitAttackResults = mainUnitAttack.applyWoundsToUnit(totalWoundsInflicted, +userInputValues.dmg);\n    const additionalUnitAttack = new _UnitGroups_additionalUnits__WEBPACK_IMPORTED_MODULE_5__.AdditionalUnitClass(userInputValues);\n    const additionalUnitAttackResults = additionalUnitAttack.applyWoundsToUnit(mainUnitAttackResults.attackWoundsRemaining, +userInputValues.dmg);\n    const leaderAttack = new _UnitGroups_leaderSoloUnitLmaoLoser__WEBPACK_IMPORTED_MODULE_6__.LeaderUnitClass(userInputValues);\n    const leaderAttackResults = leaderAttack.applyWoundsToUnit(additionalUnitAttackResults.attackWoundsRemaining, +userInputValues.dmg);\n    //testing values/////////////////////////////////////////////////\n    let calculatedData = {};\n    calculatedData.hitRolls = hitRolls;\n    calculatedData.woundRoll = woundRolls;\n    calculatedData.saveRoll = saveRolls;\n    calculatedData.mainUnitAttack = mainUnitAttack;\n    calculatedData.mainUnitAttackResults = mainUnitAttackResults;\n    calculatedData.additionalUnitAttack = additionalUnitAttack;\n    calculatedData.additionalUnitAttackResults = additionalUnitAttackResults;\n    calculatedData.leaderAttack = leaderAttack;\n    calculatedData.leaderAttackResults = leaderAttackResults;\n    //calculatedData.additionalModelsRemaining = additionalModelsRemaining;\n    //calculatedData.entireUnitDestroyed = entireUnitDestroyed;\n    //calculatedData.leaderDead = leaderDead; \n    calculatedData.userInput = userInputValues;\n    addResultsToGlobalWindow(calculatedData);\n    writeToTestArea(calculatedData, \"testArea\");\n    ///////////////////////////////////////////////////////////////\n}\nfunction getTotalWounds(fails, damage) {\n    return fails * damage;\n}\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const rollButton = document.getElementById(\"rollButton\");\n    if (rollButton) {\n        rollButton.addEventListener(\"click\", clickRollBtn);\n    }\n});\nfunction checkUnitExists(unit) {\n    //com\n}\n//for Nacho testing\nfunction writeToTestArea(dataObject, testAreaId) {\n    const testArea = document.getElementById(testAreaId);\n    if (!testArea) {\n        throw new Error(\"you done goofed the test area id smh\");\n    }\n    testArea.innerHTML = \"\"; // wipe the test area. (rerolls)\n    const formatValue = (value, indent = \"&nbsp;&nbsp;\") => {\n        if (Array.isArray(value)) {\n            return `[ ${value.map((item) => formatValue(item)).join(\", \")} ]`;\n        }\n        else if (typeof value === \"object\" && value !== null) {\n            return `{<br>${Object.entries(value)\n                .map(([subKey, subValue]) => `${indent}${subKey}: ${formatValue(subValue, indent + \"&nbsp;&nbsp;\")}`)\n                .join(\"<br>\")}<br>}`;\n        }\n        return String(value);\n    };\n    Object.entries(dataObject).forEach(([key, value]) => {\n        const paraElement = document.createElement(\"p\");\n        if (typeof value !== \"object\" || value === null || Array.isArray(value)) {\n            paraElement.innerHTML = `<strong>${key}:</strong> ${formatValue(value)}`;\n        }\n        else {\n            paraElement.innerHTML = `<strong>${key}:</strong> <br>${formatValue(value)}`;\n        }\n        testArea.appendChild(paraElement);\n    });\n}\nfunction addResultsToGlobalWindow(results) {\n    const key = \"turnResults\";\n    if (!Array.isArray(window[key])) {\n        window[key] = [];\n    }\n    window[key].push(results);\n}\n\n\n//# sourceURL=webpack://page/./res/ts/scripts.ts?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./res/ts/scripts.ts");
/******/ 	
/******/ })()
;