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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BaseUnitClass: () => (/* binding */ BaseUnitClass)\n/* harmony export */ });\nclass BaseUnitClass {\n    unitModels;\n    woundsPerModel;\n    constructor(unitModels, wounds) {\n        this.unitModels = unitModels;\n        this.woundsPerModel = wounds;\n        if (this.woundsPerModel < 0 || this.unitModels < 0) {\n            throw new Error(\"Invalid enemy unit values.\");\n        }\n    }\n    applyWounds(totalWoundsToApply, attackDamage, modelsInUnit = this.unitModels, modelHealth = this.woundsPerModel) {\n        let modelsKilled = 0;\n        let modelsRemaining = modelsInUnit;\n        let attackWoundsRemaining = totalWoundsToApply;\n        let lastModelAttackedWounds = modelHealth;\n        while (attackWoundsRemaining > 0 && modelsRemaining > 0) {\n            //apply wounds in dmg chuncks\n            if (attackWoundsRemaining >= attackDamage) {\n                attackWoundsRemaining -= attackDamage;\n                lastModelAttackedWounds -= attackDamage;\n            }\n            else {\n                lastModelAttackedWounds -= attackWoundsRemaining;\n                attackWoundsRemaining = 0;\n            }\n            //handle deaths\n            if (lastModelAttackedWounds <= 0) {\n                lastModelAttackedWounds = 0; //lower cap\n                lastModelAttackedWounds = modelHealth;\n                modelsKilled++;\n                modelsRemaining--;\n            }\n        }\n        return {\n            modelsKilled, modelsRemaining, attackWoundsRemaining, lastModelAttackedWounds\n        };\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/UnitGroups/BaseUnit.ts?");

/***/ }),

/***/ "./res/ts/UnitGroups/additionalUnits.ts":
/*!**********************************************!*\
  !*** ./res/ts/UnitGroups/additionalUnits.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AdditionalUnitClass: () => (/* binding */ AdditionalUnitClass)\n/* harmony export */ });\n/* harmony import */ var _pageData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pageData */ \"./res/ts/pageData.ts\");\n/* harmony import */ var _BaseUnit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseUnit */ \"./res/ts/UnitGroups/BaseUnit.ts\");\n\n\nclass AdditionalUnitClass extends _BaseUnit__WEBPACK_IMPORTED_MODULE_1__.BaseUnitClass {\n    constructor(userInput) {\n        super((0,_pageData__WEBPACK_IMPORTED_MODULE_0__.getStoredUserInput)(userInput, \"addUnits\"), (0,_pageData__WEBPACK_IMPORTED_MODULE_0__.getStoredUserInput)(userInput, \"addUnitsWounds\"));\n    }\n    applyWoundsToUnit(woundsToApply, damage) {\n        const result = this.applyWounds(woundsToApply, damage);\n        return result;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/UnitGroups/additionalUnits.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getPageValues: () => (/* binding */ getPageValues),\n/* harmony export */   getStoredUserInput: () => (/* binding */ getStoredUserInput)\n/* harmony export */ });\nconst htmlIds = [\n    //attack fields\n    \"models\", \"attacks\", \"skill\", \"str\", \"ap\", \"dmg\", \"hitMod\", \"lethHit\", \"susHits\", \"hitCrit\", \"critRolls\", \"reroll\", \"woundMod\", \"devastWound\", \"woundCrit\", \"woundRoll\", \"woundReroll\",\n    //defense fields\n    \"defModels\", \"tough\", \"save\", \"invuln\", \"wounds\", \"saveMod\", \"cover\", \"saveReroll\", \"noPain\", \"addUnits\", \"addUnitsWounds\", \"leaderWounds\"\n];\nconst devValues = {\n    \"models\": \"3\",\n    \"attacks\": \"5\",\n    \"skill\": \"3\",\n    \"str\": \"4\",\n    \"ap\": \"1\",\n    \"dmg\": \"2\",\n    \"woundMod\": \"\",\n    \"hitMod\": \"\",\n    \"devastWound\": false,\n    \"woundCrit\": \"\",\n    \"woundRoll\": \"NONE\",\n    \"woundReroll\": \"NONE\",\n    \"defModels\": \"2\",\n    \"tough\": \"2\",\n    \"save\": \"2\",\n    \"invuln\": \"0\",\n    \"wounds\": \"5\", //hp\n    \"saveMod\": \"\",\n    \"cover\": false,\n    \"saveReroll\": \"\",\n    \"noPain\": \"\",\n    \"addUnits\": \"2\",\n    \"addUnitsWounds\": \"2\",\n    \"leaderWounds\": \"1\"\n};\nfunction getPageValues(devMode = false) {\n    const fieldValues = {};\n    //testing block - remember to remove bool param!//////////////////////////////\n    if (devMode) {\n        htmlIds.forEach(htmlId => {\n            const element = document.getElementById(htmlId);\n            if (element) {\n                const inputElement = element;\n                inputElement.value = devValues[htmlId].toString();\n            }\n        });\n        return devValues;\n    }\n    ////////////////////////////////////////////////////////////////////////////\n    htmlIds.forEach(htmlId => {\n        const element = document.getElementById(htmlId);\n        if (element) {\n            fieldValues[htmlId] = getInputValue(element);\n        }\n    });\n    return fieldValues;\n}\nfunction getStoredUserInput(storedValues, propertyKey) {\n    if (storedValues[propertyKey] === null || storedValues[propertyKey] === undefined) {\n        return 0;\n    }\n    return +storedValues[propertyKey];\n}\nfunction getInputValue(element) {\n    const inputElement = element;\n    if (inputElement.type === \"checkbox\") {\n        return inputElement.checked;\n    }\n    return inputElement.value;\n}\n\n\n//# sourceURL=webpack://page/./res/ts/pageData.ts?");

/***/ }),

/***/ "./res/ts/scripts.ts":
/*!***************************!*\
  !*** ./res/ts/scripts.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pageData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageData */ \"./res/ts/pageData.ts\");\n/* harmony import */ var _RollGroups_hitRolls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RollGroups/hitRolls */ \"./res/ts/RollGroups/hitRolls.ts\");\n/* harmony import */ var _RollGroups_woundRolls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RollGroups/woundRolls */ \"./res/ts/RollGroups/woundRolls.ts\");\n/* harmony import */ var _RollGroups_saveRolls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RollGroups/saveRolls */ \"./res/ts/RollGroups/saveRolls.ts\");\n/* harmony import */ var _UnitGroups_mainUnit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UnitGroups/mainUnit */ \"./res/ts/UnitGroups/mainUnit.ts\");\n/* harmony import */ var _UnitGroups_additionalUnits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UnitGroups/additionalUnits */ \"./res/ts/UnitGroups/additionalUnits.ts\");\n\n\n\n\n\n\nfunction clickRollBtn() {\n    const userInputValues = (0,_pageData__WEBPACK_IMPORTED_MODULE_0__.getPageValues)(false);\n    const hitRolls = new _RollGroups_hitRolls__WEBPACK_IMPORTED_MODULE_1__.HitRolls(userInputValues);\n    const woundRolls = new _RollGroups_woundRolls__WEBPACK_IMPORTED_MODULE_2__.WoundRolls(hitRolls.successValues.length, userInputValues);\n    const saveRolls = new _RollGroups_saveRolls__WEBPACK_IMPORTED_MODULE_3__.SaveRolls(woundRolls.successValues.length, userInputValues);\n    const mainUnitAttack = new _UnitGroups_mainUnit__WEBPACK_IMPORTED_MODULE_4__.MainUnitClass(userInputValues);\n    const additionalUnitAttack = new _UnitGroups_additionalUnits__WEBPACK_IMPORTED_MODULE_5__.AdditionalUnitClass(userInputValues);\n    const totalWoundsInflicted = getTotalWounds(saveRolls.failValues.length, +userInputValues.dmg);\n    //testing values/////////////////////////////////////////////////\n    let calculatedData = {};\n    calculatedData.firstRoll = hitRolls;\n    calculatedData.woundRoll = woundRolls;\n    calculatedData.saveRoll = saveRolls;\n    calculatedData.mainUnitAttack = mainUnitAttack;\n    calculatedData.mainUnitAttackResults = mainUnitAttack.applyWoundsToUnit(totalWoundsInflicted, +userInputValues.dmg);\n    calculatedData.additionalUnitAttack = additionalUnitAttack;\n    //calculatedData.additionalModelsRemaining = additionalModelsRemaining;\n    //calculatedData.entireUnitDestroyed = entireUnitDestroyed;\n    //calculatedData.leaderDead = leaderDead; \n    calculatedData.userInput = userInputValues;\n    addResultsToGlobalWindow(calculatedData);\n    writeToTestArea(calculatedData, \"testArea\");\n    ///////////////////////////////////////////////////////////////\n}\nfunction getTotalWounds(fails, damage) {\n    return fails * damage;\n}\n//need to make this a class...\nfunction getModelsKilled(userInputValues, totalWounds) {\n    const mainModels = +userInputValues.defModels || 0;\n    const mainModelWounds = +userInputValues.wounds || 0;\n    const additionalModels = +userInputValues.addUnits || 0;\n    const additionalModelWounds = +userInputValues.addUnitsWounds || 0;\n    const leaderWounds = +userInputValues.leaderWounds || 0;\n    if (leaderWounds < 0 || mainModelWounds < 0 || additionalModelWounds < 0 || mainModels < 0 || additionalModels < 0) {\n        throw new Error(\"Invalid enemy unit values.\");\n    }\n    let woundsRemaining = totalWounds;\n    let modelsKilled = 0;\n    let modelsRemaining = mainModels;\n    let additionalModelsRemaining = additionalModels;\n    let lastModelWounds = mainModelWounds;\n    console.log(`\\n🔍 Initial State:`);\n    console.log(`Total Wounds Inflicted: ${totalWounds}`);\n    console.log(`Main Models: ${mainModels}, Wounds Each: ${mainModelWounds}`);\n    console.log(`Additional Models: ${additionalModels}, Wounds Each: ${additionalModelWounds}`);\n    console.log(`Leader Wounds: ${leaderWounds}`);\n    while (woundsRemaining > 0 && modelsRemaining > 0) {\n        console.log(`\\n⚔️ Damaging Main Model - Wounds Left: ${lastModelWounds}, Wounds Remaining: ${woundsRemaining}`);\n        if (woundsRemaining >= lastModelWounds) {\n            woundsRemaining -= lastModelWounds;\n            modelsKilled++;\n            modelsRemaining--;\n            lastModelWounds = mainModelWounds;\n            console.log(`💀 Main Model Killed! Remaining Main Models: ${modelsRemaining}`);\n        }\n        else {\n            lastModelWounds -= woundsRemaining;\n            woundsRemaining = 0;\n            console.log(`🩸 Main Model Wounded, Remaining Wounds: ${lastModelWounds}`);\n        }\n    }\n    let additionalModelsKilled = 0;\n    while (woundsRemaining > 0 && additionalModelsRemaining > 0) {\n        console.log(`\\n⚔️ Damaging Additional Model - Wounds Left: ${additionalModelWounds}, Wounds Remaining: ${woundsRemaining}`);\n        if (woundsRemaining >= additionalModelWounds) {\n            woundsRemaining -= additionalModelWounds;\n            additionalModelsKilled++;\n            additionalModelsRemaining--;\n            console.log(`💀 Additional Model Killed! Remaining Additional Models: ${additionalModelsRemaining}`);\n        }\n        else {\n            lastModelWounds = additionalModelWounds - woundsRemaining;\n            woundsRemaining = 0;\n            console.log(`🩸 Additional Model Wounded, Remaining Wounds: ${lastModelWounds}`);\n        }\n    }\n    let leaderDead = false;\n    let leaderRemainingWounds = leaderWounds;\n    if (modelsRemaining === 0 && additionalModelsRemaining === 0 && woundsRemaining > 0) {\n        console.log(`\\n⚔️ Damaging Leader - Wounds Left: ${leaderRemainingWounds}, Wounds Remaining: ${woundsRemaining}`);\n        if (woundsRemaining >= leaderRemainingWounds) {\n            woundsRemaining -= leaderRemainingWounds;\n            leaderRemainingWounds = 0;\n            leaderDead = true;\n            console.log(`💀 Leader Killed!`);\n        }\n        else {\n            leaderRemainingWounds -= woundsRemaining;\n            woundsRemaining = 0;\n            console.log(`🩸 Leader Wounded, Remaining Wounds: ${leaderRemainingWounds}`);\n        }\n    }\n    const entireUnitDestroyed = modelsRemaining === 0;\n    console.log(`\\n🔚 Final State:`);\n    console.log(`Models Killed: ${modelsKilled}`);\n    console.log(`Surviving Main Models: ${modelsRemaining}`);\n    console.log(`Surviving Additional Models: ${additionalModelsRemaining}`);\n    console.log(`Remaining Wounds on Leader: ${leaderRemainingWounds}`);\n    console.log(`Leader Dead: ${leaderDead}`);\n    console.log(`Main Unit Destroyed: ${entireUnitDestroyed}`);\n    return {\n        modelsKilled,\n        remainingWounds: leaderRemainingWounds,\n        entireUnitDestroyed,\n        modelsRemaining,\n        additionalModelsRemaining,\n        leaderDead\n    };\n}\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const rollButton = document.getElementById(\"rollButton\");\n    if (rollButton) {\n        rollButton.addEventListener(\"click\", clickRollBtn);\n    }\n});\n//for Nacho testing\nfunction writeToTestArea(dataObject, testAreaId) {\n    const testArea = document.getElementById(testAreaId);\n    if (!testArea) {\n        throw new Error(\"you done goofed the test area id smh\");\n    }\n    testArea.innerHTML = \"\"; // wipe the test area. (rerolls)\n    const formatValue = (value, indent = \"&nbsp;&nbsp;\") => {\n        if (Array.isArray(value)) {\n            return `[ ${value.map((item) => formatValue(item)).join(\", \")} ]`;\n        }\n        else if (typeof value === \"object\" && value !== null) {\n            return `{<br>${Object.entries(value)\n                .map(([subKey, subValue]) => `${indent}${subKey}: ${formatValue(subValue, indent + \"&nbsp;&nbsp;\")}`)\n                .join(\"<br>\")}<br>}`;\n        }\n        return String(value);\n    };\n    Object.entries(dataObject).forEach(([key, value]) => {\n        const paraElement = document.createElement(\"p\");\n        if (typeof value !== \"object\" || value === null || Array.isArray(value)) {\n            paraElement.innerHTML = `<strong>${key}:</strong> ${formatValue(value)}`;\n        }\n        else {\n            paraElement.innerHTML = `<strong>${key}:</strong> <br>${formatValue(value)}`;\n        }\n        testArea.appendChild(paraElement);\n    });\n}\nfunction addResultsToGlobalWindow(results) {\n    const key = \"turnResults\";\n    if (!Array.isArray(window[key])) {\n        window[key] = [];\n    }\n    window[key].push(results);\n}\nfunction addScopedPropertyToPrintedTestObject(testObject, ...propertyName) {\n    propertyName.forEach(propertyName => testObject[propertyName]);\n}\n\n\n//# sourceURL=webpack://page/./res/ts/scripts.ts?");

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