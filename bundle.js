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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HitRolls: () => (/* binding */ HitRolls)\n/* harmony export */ });\n/* harmony import */ var _rollgroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rollgroups */ \"./res/ts/RollGroups/rollgroups.ts\");\n\nclass HitRolls extends _rollgroups__WEBPACK_IMPORTED_MODULE_0__.RollsGroup {\n    hitModifier;\n    constructor(userInputValues) {\n        super();\n        this.hitModifier = userInputValues.hitMod;\n        this.totalRolls = userInputValues.attackModels * userInputValues.attacks;\n        this.rolledAOne = 0;\n        this.getHitRolls(+userInputValues.skill);\n        this.successes = this.successValues.length;\n    }\n    getHitRolls(skill) {\n        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {\n            rollResult = this.applyModifierToResult(this.hitModifier, rollResult);\n            if (rollResult === 1) {\n                this.rolledAOne++;\n                //console.log(\"rolled a 1\");\n                this.failValues.push(rollResult);\n                return null;\n            }\n            if (rollResult >= skill) {\n                return rollResult;\n            }\n            else {\n                this.failValues.push(rollResult);\n                return null;\n            }\n        });\n        this.fails = this.failValues.length;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/RollGroups/hitRolls.ts?");

/***/ }),

/***/ "./res/ts/RollGroups/rollgroups.ts":
/*!*****************************************!*\
  !*** ./res/ts/RollGroups/rollgroups.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RollsGroup: () => (/* binding */ RollsGroup)\n/* harmony export */ });\nclass RollsGroup {\n    allRollSimulationResults = [];\n    successValues = [];\n    successes = 0;\n    failValues = [];\n    fails = 0;\n    rolledAOne = 0;\n    totalRolls = 0;\n    performRoll(dieSides = 6) {\n        return Math.floor(Math.random() * dieSides) + 1;\n    }\n    simulateRolls(rollsAmount, rollCallback, dieSides = 6) {\n        this.totalRolls = rollsAmount;\n        this.allRollSimulationResults = [];\n        const simulationResults = [];\n        for (let i = 0; i < rollsAmount; i++) {\n            const rollResult = this.performRoll(dieSides);\n            this.allRollSimulationResults.push(rollResult);\n            const result = rollCallback(rollResult);\n            if (result !== null) {\n                simulationResults.push(result);\n            }\n        }\n        return simulationResults;\n    }\n    applyModifierToResult(modifier, rollResult, clamped = true) {\n        if (rollResult === 6 || rollResult === 1) {\n            return rollResult;\n        }\n        if (clamped) {\n            if (modifier > 1 || modifier < -1) {\n                throw new Error(`invalid modifier value: ${modifier}`);\n            }\n        }\n        return rollResult + modifier;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/RollGroups/rollgroups.ts?");

/***/ }),

/***/ "./res/ts/RollGroups/saveRolls.ts":
/*!****************************************!*\
  !*** ./res/ts/RollGroups/saveRolls.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SaveRolls: () => (/* binding */ SaveRolls)\n/* harmony export */ });\n/* harmony import */ var _rollgroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rollgroups */ \"./res/ts/RollGroups/rollgroups.ts\");\n\nclass SaveRolls extends _rollgroups__WEBPACK_IMPORTED_MODULE_0__.RollsGroup {\n    save;\n    ap;\n    invulnrable;\n    useInvulnSave;\n    constructor(totalWounds, userInputValues) {\n        super();\n        this.save = userInputValues.save;\n        this.ap = userInputValues.ap;\n        this.invulnrable = userInputValues.invulnrable;\n        this.useInvulnSave = this.invulnrable < this.save + this.ap;\n        this.totalRolls = totalWounds;\n        const saveValueToUse = this.useInvulnSave ? this.invulnrable : this.save;\n        this.rollSaves(saveValueToUse, this.ap);\n        this.successes = this.successValues.length;\n    }\n    rollSaves(usedSaveValue, ap) {\n        this.simulateRolls(this.totalRolls, (rollResult) => {\n            rollResult = this.applyModifierToResult(-ap, rollResult, false);\n            if (rollResult === 1) {\n                this.rolledAOne++;\n                //console.log(\"rolled a 1 (save roll)\");\n                this.failValues.push(rollResult);\n                return null;\n            }\n            if (rollResult < usedSaveValue) {\n                this.failValues.push(rollResult);\n                return null;\n            }\n            else {\n                this.successValues.push(rollResult);\n                return rollResult;\n            }\n        });\n        this.fails = this.failValues.length;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/RollGroups/saveRolls.ts?");

/***/ }),

/***/ "./res/ts/RollGroups/woundRolls.ts":
/*!*****************************************!*\
  !*** ./res/ts/RollGroups/woundRolls.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WoundRolls: () => (/* binding */ WoundRolls)\n/* harmony export */ });\n/* harmony import */ var _rollgroups__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rollgroups */ \"./res/ts/RollGroups/rollgroups.ts\");\n\nclass WoundRolls extends _rollgroups__WEBPACK_IMPORTED_MODULE_0__.RollsGroup {\n    threshold;\n    woundMod;\n    constructor(totalHits, userInputValues) {\n        super();\n        this.woundMod = userInputValues.woundMod;\n        this.totalRolls = totalHits;\n        this.threshold = this.getWoundThreshold(userInputValues.strength, userInputValues.toughness);\n        this.getWoundRollSuccesses();\n        this.successes = this.successValues.length;\n    }\n    getWoundRollSuccesses() {\n        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {\n            rollResult = this.applyModifierToResult(this.woundMod, rollResult);\n            if (rollResult >= this.threshold) {\n                return rollResult;\n            }\n            else {\n                if (rollResult === 1) {\n                    this.rolledAOne++;\n                    //console.log(\"rolled a 1 (wound roll)\"); \n                }\n                this.failValues.push(rollResult);\n                return null;\n            }\n        });\n        this.fails = this.failValues.length;\n    }\n    getWoundThreshold(strength, toughness) {\n        if (strength === 0 && toughness === 0)\n            return 0;\n        if (strength >= toughness * 2)\n            return 2;\n        if (strength > toughness)\n            return 3;\n        if (strength === toughness)\n            return 4;\n        if (strength < toughness && strength > toughness / 2)\n            return 5;\n        return 6;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/RollGroups/woundRolls.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AdditionalUnitClass: () => (/* binding */ AdditionalUnitClass)\n/* harmony export */ });\n/* harmony import */ var _BaseUnit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseUnit */ \"./res/ts/UnitGroups/BaseUnit.ts\");\n\nclass AdditionalUnitClass extends _BaseUnit__WEBPACK_IMPORTED_MODULE_0__.BaseUnitClass {\n    constructor(userInput) {\n        super(userInput.addUnits, userInput.addUnitsWounds);\n    }\n    applyWoundsToUnit(woundsToApply, damage) {\n        const result = this.applyWounds(woundsToApply, damage);\n        return result;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/UnitGroups/additionalUnits.ts?");

/***/ }),

/***/ "./res/ts/UnitGroups/leaderSoloUnit.ts":
/*!*********************************************!*\
  !*** ./res/ts/UnitGroups/leaderSoloUnit.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   LeaderUnitClass: () => (/* binding */ LeaderUnitClass)\n/* harmony export */ });\n/* harmony import */ var _BaseUnit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseUnit */ \"./res/ts/UnitGroups/BaseUnit.ts\");\n\nclass LeaderUnitClass extends _BaseUnit__WEBPACK_IMPORTED_MODULE_0__.BaseUnitClass {\n    isLeaderPresent;\n    constructor(userInput) {\n        super(1, userInput.leaderWounds);\n        this.isLeaderPresent = userInput.leaderWounds > 0;\n    }\n    applyWoundsToUnit(woundsToApply, damage) {\n        const result = this.applyWounds(woundsToApply, damage);\n        let leaderKilled = result.modelsRemaining === 0;\n        let leaderWoundsRemaining = result.lastModelAttackedWounds;\n        return { leaderKilled, leaderWoundsRemaining };\n    }\n    hasALeader(leaderWounds) {\n        if (typeof leaderWounds === undefined) {\n            throw new Error(`someting went wrong uwu`);\n        }\n        return leaderWounds > 0;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/UnitGroups/leaderSoloUnit.ts?");

/***/ }),

/***/ "./res/ts/UnitGroups/mainUnit.ts":
/*!***************************************!*\
  !*** ./res/ts/UnitGroups/mainUnit.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MainUnitClass: () => (/* binding */ MainUnitClass)\n/* harmony export */ });\n/* harmony import */ var _BaseUnit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseUnit */ \"./res/ts/UnitGroups/BaseUnit.ts\");\n\nclass MainUnitClass extends _BaseUnit__WEBPACK_IMPORTED_MODULE_0__.BaseUnitClass {\n    constructor(userInput) {\n        super(userInput.defenseModels, userInput.wounds);\n    }\n    applyWoundsToUnit(woundsToApply, damage) {\n        const result = this.applyWounds(woundsToApply, damage);\n        return result;\n    }\n}\n\n\n//# sourceURL=webpack://page/./res/ts/UnitGroups/mainUnit.ts?");

/***/ }),

/***/ "./res/ts/devTesting.ts":
/*!******************************!*\
  !*** ./res/ts/devTesting.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   writeTestValuesToPage: () => (/* binding */ writeTestValuesToPage)\n/* harmony export */ });\nconst devValues = {\n    \"attackModels\": \"3\",\n    \"attacks\": \"5\",\n    \"skill\": \"3\",\n    \"strength\": \"4\",\n    \"ap\": \"1\",\n    \"damage\": \"2\",\n    \"woundMod\": \"\",\n    \"hitMod\": \"\",\n    \"devastWound\": false,\n    \"woundCrit\": \"\",\n    \"woundRoll\": \"NONE\",\n    \"woundReroll\": \"NONE\",\n    \"defenseModels\": \"2\",\n    \"toughness\": \"2\",\n    \"save\": \"2\",\n    \"invulnrable\": \"3\",\n    \"wounds\": \"5\", //hp\n    \"saveMod\": \"\",\n    \"cover\": false,\n    \"saveReroll\": \"\",\n    \"feelNoPain\": \"\",\n    \"addUnits\": \"2\",\n    \"addUnitsWounds\": \"2\",\n    \"leaderWounds\": \"0\"\n};\nfunction writeTestValuesToPage() {\n    htmlIds.forEach(htmlId => {\n        const element = document.getElementById(htmlId);\n        if (element) {\n            const inputElement = element;\n            inputElement.value = devValues[htmlId].toString();\n        }\n    });\n}\nconst htmlIds = [\n    //attack fields\n    \"attackModels\", \"attacks\", \"skill\", \"strength\", \"ap\", \"damage\", \"hitMod\", \"lethHit\", \"susHits\", \"hitCrit\", \"critRolls\", \"reroll\", \"woundMod\", \"devastWound\", \"woundCrit\", \"woundRoll\", \"woundReroll\",\n    //defense fields\n    \"defenseModels\", \"toughness\", \"save\", \"invulnrable\", \"wounds\", \"saveMod\", \"cover\", \"saveReroll\", \"feelNoPain\", \"addUnits\", \"addUnitsWounds\", \"leaderWounds\"\n];\n\n\n//# sourceURL=webpack://page/./res/ts/devTesting.ts?");

/***/ }),

/***/ "./res/ts/inputValidation.ts":
/*!***********************************!*\
  !*** ./res/ts/inputValidation.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   startUserInputValidatation: () => (/* binding */ startUserInputValidatation)\n/* harmony export */ });\nfunction startUserInputValidatation() {\n    const fieldsToValidate = [\n        { id: 'attackModels', validate: validatePositiveNumber },\n        { id: 'attacks', validate: validatePositiveNumber },\n        { id: 'skill', validate: validatePositiveNumber },\n        { id: 'strength', validate: validatePositiveNumber },\n        { id: 'ap', validate: validateNonNegativeNumber }, // AP could be 0\n        { id: 'damage', validate: validatePositiveNumber },\n        { id: 'defenseModels', validate: validatePositiveNumber },\n        { id: 'toughness', validate: validatePositiveNumber },\n        { id: 'save', validate: validatePositiveNumber },\n        { id: 'invulnrable', validate: validatePositiveNumber },\n        { id: 'wounds', validate: validatePositiveNumber },\n        { id: 'addUnits', validate: validateNonNegativeNumber },\n        { id: 'addUnitsWounds', validate: validatePositiveNumber },\n        { id: 'leaderWounds', validate: validatePositiveNumber },\n        { id: 'hitMod', validate: (v) => validateModifierRange(v, -1, 1) },\n        { id: 'woundMod', validate: (v) => validateModifierRange(v, -1, 1) },\n        { id: 'saveMod', validate: (v) => validateModifierRange(v, -1, 1) },\n        //TODO think about how to handle this\n        // { id: 'woundRoll', validate: validateWoundRollString },\n        // { id: 'woundReroll', validate: validateWoundRerollString },\n        //{ id: 'saveReroll', validate: validateNonNegativeNumber },\n        //{ id: 'feelNoPain', validate: validateNonNegativeNumber }\n    ];\n    fieldsToValidate.forEach(({ id, validate }) => {\n        const input = document.getElementById(id);\n        if (input) {\n            input.addEventListener('input', () => {\n                validateField(input, validate);\n            });\n        }\n    });\n}\nfunction validateField(input, validateFn) {\n    const error = validateFn(input.value);\n    showFieldError(input, error);\n}\nfunction showFieldError(input, error) {\n    let errorSpan = input.nextElementSibling;\n    if (!errorSpan || !errorSpan.classList.contains('field-error')) {\n        errorSpan = document.createElement('span');\n        errorSpan.className = 'field-error';\n        errorSpan.style.color = 'red';\n        errorSpan.style.fontSize = '0.85em';\n        errorSpan.style.marginLeft = '8px';\n        input.parentNode?.insertBefore(errorSpan, input.nextSibling);\n    }\n    errorSpan.textContent = error || '';\n}\nfunction validatePositiveNumber(value) {\n    const num = Number(value);\n    if (value.trim() === '')\n        return null;\n    if (isNaN(num) || num <= 0)\n        return 'Must be a positive number';\n    return null;\n}\nfunction validateNonNegativeNumber(value) {\n    const num = Number(value);\n    if (value.trim() === '')\n        return null;\n    if (isNaN(num) || num < 0)\n        return 'Cannot be negative';\n    return null;\n}\nfunction validateModifierRange(value, startRange = -1, endRange = 1) {\n    const num = Number(value);\n    if (value.trim() === '')\n        return null;\n    if (isNaN(num) || num < startRange || num > endRange) {\n        return `Must be between ${startRange} and ${endRange}`;\n    }\n    return null;\n}\n\n\n//# sourceURL=webpack://page/./res/ts/inputValidation.ts?");

/***/ }),

/***/ "./res/ts/pageData.ts":
/*!****************************!*\
  !*** ./res/ts/pageData.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   UserInput: () => (/* binding */ UserInput)\n/* harmony export */ });\nclass UserInput {\n    //default values\n    attackModels = 0;\n    attacks = 0;\n    skill = 0;\n    strength = 0;\n    ap = 0;\n    damage = 0;\n    hitMod = 0;\n    woundMod = 0;\n    devastWound = false;\n    woundCrit = 0;\n    woundRoll = \"\";\n    woundReroll = \"\";\n    defenseModels = 0;\n    toughness = 0;\n    save = 0;\n    invulnrable = 0;\n    wounds = 0;\n    saveMod = \"\";\n    cover = false;\n    saveReroll = 0;\n    feelNoPain = 0;\n    addUnits = 0;\n    addUnitsWounds = 0;\n    leaderWounds = 0;\n    constructor() {\n        const parsedUserData = parseUserInput();\n        Object.assign(this, parsedUserData);\n    }\n}\n//helpers\nfunction getNumberValue(id) {\n    const input = document.getElementById(id);\n    return input ? Number(input.value) || 0 : 0;\n}\nfunction getCheckboxValue(id) {\n    const input = document.getElementById(id);\n    return input ? input.checked : false;\n}\nfunction getStringValue(id) {\n    const input = document.getElementById(id);\n    return input ? input.value : '';\n}\n//MAP\nfunction parseUserInput() {\n    return {\n        attackModels: getNumberValue('attackModels'),\n        attacks: getNumberValue('attacks'),\n        skill: getNumberValue('skill'),\n        strength: getNumberValue('strength'),\n        ap: getNumberValue('ap'),\n        damage: getNumberValue('damage'),\n        hitMod: getNumberValue('hitMod'),\n        woundMod: getNumberValue('woundMod'),\n        devastWound: getCheckboxValue('devastWound'),\n        woundCrit: getNumberValue('woundCrit'),\n        woundRoll: getStringValue('woundRoll'),\n        woundReroll: getStringValue('woundReroll'),\n        defenseModels: getNumberValue('defenseModels'),\n        toughness: getNumberValue('toughness'),\n        save: getNumberValue('save'),\n        invulnrable: getNumberValue('invulnrable'),\n        wounds: getNumberValue('wounds'),\n        saveMod: getStringValue('saveMod'),\n        cover: getCheckboxValue('cover'),\n        saveReroll: getNumberValue('saveReroll'),\n        feelNoPain: getNumberValue('feelNoPain'),\n        addUnits: getNumberValue('addUnits'),\n        addUnitsWounds: getNumberValue('addUnitsWounds'),\n        leaderWounds: getNumberValue('leaderWounds'),\n    };\n}\n//idr what this is...\n//lethalhits: bool, crititalHits: number, reRolls: string, sustainHits: number, critHitRolls: string \n\n\n//# sourceURL=webpack://page/./res/ts/pageData.ts?");

/***/ }),

/***/ "./res/ts/scripts.ts":
/*!***************************!*\
  !*** ./res/ts/scripts.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pageData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageData */ \"./res/ts/pageData.ts\");\n/* harmony import */ var _inputValidation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inputValidation */ \"./res/ts/inputValidation.ts\");\n/* harmony import */ var _RollGroups_hitRolls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RollGroups/hitRolls */ \"./res/ts/RollGroups/hitRolls.ts\");\n/* harmony import */ var _RollGroups_woundRolls__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./RollGroups/woundRolls */ \"./res/ts/RollGroups/woundRolls.ts\");\n/* harmony import */ var _RollGroups_saveRolls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RollGroups/saveRolls */ \"./res/ts/RollGroups/saveRolls.ts\");\n/* harmony import */ var _UnitGroups_mainUnit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UnitGroups/mainUnit */ \"./res/ts/UnitGroups/mainUnit.ts\");\n/* harmony import */ var _UnitGroups_additionalUnits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UnitGroups/additionalUnits */ \"./res/ts/UnitGroups/additionalUnits.ts\");\n/* harmony import */ var _UnitGroups_leaderSoloUnit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UnitGroups/leaderSoloUnit */ \"./res/ts/UnitGroups/leaderSoloUnit.ts\");\n/* harmony import */ var _devTesting__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./devTesting */ \"./res/ts/devTesting.ts\");\n\n\n\n\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    (0,_inputValidation__WEBPACK_IMPORTED_MODULE_1__.startUserInputValidatation)();\n    const rollButton = document.getElementById(\"rollButton\");\n    const testButton = document.getElementById(\"devTest\");\n    if (rollButton) {\n        rollButton.addEventListener(\"click\", clickRollBtn);\n    }\n    if (testButton) {\n        testButton.addEventListener(\"click\", loadTestValues);\n    }\n});\nfunction clickRollBtn() {\n    const userInputData = new _pageData__WEBPACK_IMPORTED_MODULE_0__.UserInput();\n    const hitRolls = new _RollGroups_hitRolls__WEBPACK_IMPORTED_MODULE_2__.HitRolls(userInputData);\n    const woundRolls = new _RollGroups_woundRolls__WEBPACK_IMPORTED_MODULE_3__.WoundRolls(hitRolls.successValues.length, userInputData);\n    const saveRolls = new _RollGroups_saveRolls__WEBPACK_IMPORTED_MODULE_4__.SaveRolls(woundRolls.successValues.length, userInputData);\n    const totalWoundsInflicted = getTotalWounds(saveRolls.failValues.length, userInputData.damage);\n    const mainUnitAttack = new _UnitGroups_mainUnit__WEBPACK_IMPORTED_MODULE_5__.MainUnitClass(userInputData);\n    const mainUnitAttackResults = mainUnitAttack.applyWoundsToUnit(totalWoundsInflicted, userInputData.damage);\n    const additionalUnitAttack = new _UnitGroups_additionalUnits__WEBPACK_IMPORTED_MODULE_6__.AdditionalUnitClass(userInputData);\n    const additionalUnitAttackResults = additionalUnitAttack.applyWoundsToUnit(mainUnitAttackResults.attackWoundsRemaining, userInputData.damage);\n    const leaderAttack = new _UnitGroups_leaderSoloUnit__WEBPACK_IMPORTED_MODULE_7__.LeaderUnitClass(userInputData);\n    const leaderAttackResults = leaderAttack.applyWoundsToUnit(additionalUnitAttackResults.attackWoundsRemaining, userInputData.damage);\n    //testing values/////////////////////////////////////////////////\n    let calculatedData = {};\n    calculatedData.hitRolls = hitRolls;\n    calculatedData.woundRoll = woundRolls;\n    calculatedData.saveRoll = saveRolls;\n    calculatedData.mainUnitAttack = mainUnitAttack;\n    calculatedData.mainUnitAttackResults = mainUnitAttackResults;\n    calculatedData.additionalUnitAttack = additionalUnitAttack;\n    calculatedData.additionalUnitAttackResults = additionalUnitAttackResults;\n    calculatedData.leaderAttack = leaderAttack;\n    calculatedData.leaderAttackResults = leaderAttackResults;\n    //calculatedData.userInput = userInputData;\n    addResultsToGlobalWindow(calculatedData);\n    writeToTestArea(calculatedData, \"testArea\");\n    ///////////////////////////////////////////////////////////////\n}\nfunction loadTestValues() {\n    (0,_devTesting__WEBPACK_IMPORTED_MODULE_8__.writeTestValuesToPage)();\n}\nfunction getTotalWounds(fails, damage) {\n    return fails * damage;\n}\n//for Nacho testing\nfunction writeToTestArea(dataObject, testAreaId) {\n    const testArea = document.getElementById(testAreaId);\n    if (!testArea) {\n        throw new Error(\"you done goofed the test area id smh\");\n    }\n    testArea.innerHTML = \"\"; // wipe the test area. (rerolls)\n    const formatValue = (value, indent = \"&nbsp;&nbsp;\") => {\n        if (Array.isArray(value)) {\n            return `[ ${value.map((item) => formatValue(item)).join(\", \")} ]`;\n        }\n        else if (typeof value === \"object\" && value !== null) {\n            return `{<br>${Object.entries(value)\n                .map(([subKey, subValue]) => `${indent}${subKey}: ${formatValue(subValue, indent + \"&nbsp;&nbsp;\")}`)\n                .join(\"<br>\")}<br>}`;\n        }\n        return String(value);\n    };\n    Object.entries(dataObject).forEach(([key, value]) => {\n        const paraElement = document.createElement(\"p\");\n        if (typeof value !== \"object\" || value === null || Array.isArray(value)) {\n            paraElement.innerHTML = `<strong>${key}:</strong> ${formatValue(value)}`;\n        }\n        else {\n            paraElement.innerHTML = `<strong>${key}:</strong> <br>${formatValue(value)}`;\n        }\n        testArea.appendChild(paraElement);\n    });\n}\nfunction addResultsToGlobalWindow(results) {\n    const key = \"turnResults\";\n    if (!Array.isArray(window[key])) {\n        window[key] = [];\n    }\n    window[key].push(results);\n}\n\n\n//# sourceURL=webpack://page/./res/ts/scripts.ts?");

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