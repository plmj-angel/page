"use strict";
const htmlIds = [
    //attack fields
    "models", "attacks", "skill", "str", "ap", "dmg", "hitMod", "lethHit", "susHits", "hitCrit", "critRolls", "reroll", "woundMod", "devastWound", "woundCrit", "woundRoll", "woundReroll",
    //defense fields
    "defModels", "tough", "save", "invuln", "wounds", "saveMod", "cover", "saveReroll", "noPain"
];
let ignoredRolls = 0;
let ignoredWoundRolls = 0;
let woundRolls = [];
function clickRollBtn() {
    const pageValues = getValues(htmlIds);
    const totalRolls = getTotalRolls(+pageValues.models, +pageValues.attacks);
    const hitRolls = getHitRolls(totalRolls);
    const woundThresholds = getWoundRollThresholds(hitRolls.length, +pageValues.str, +pageValues.tough);
    let calculatedData = {};
    calculatedData.firstRolls = totalRolls;
    calculatedData.hits = hitRolls;
    calculatedData.rolledAOne = ignoredRolls;
    calculatedData.woundRolls = woundRolls.length;
    calculatedData.woundRollValues = woundRolls;
    calculatedData.woundThresholds = woundThresholds;
    calculatedData.ignoredWoundRollsByRollingAOne = ignoredWoundRolls;
    console.log(pageValues);
    writeToTestArea(calculatedData, "testArea");
}
function getValues(htmlIds) {
    const fieldValues = {};
    htmlIds.forEach(htmlId => {
        const element = document.getElementById(htmlId);
        if (element) {
            fieldValues[htmlId] = getInputValue(element);
        }
    });
    return fieldValues;
}
function getInputValue(element) {
    const inputElement = element;
    if (inputElement.type === "checkbox") {
        return inputElement.checked;
    }
    return inputElement.value;
}
function writeToTestArea(dataObject, testAreaId) {
    const testArea = document.getElementById(testAreaId);
    if (!testArea) {
        throw new Error("you done goofed the test area id smh");
    }
    testArea.innerHTML = ""; // wipe the test area
    Object.entries(dataObject).forEach(([key, value]) => {
        const paraElement = document.createElement("p");
        paraElement.textContent = `${key}: ${value}`;
        testArea.appendChild(paraElement);
    });
}
function getTotalRolls(models, attacks) {
    return models * attacks;
}
function simulateRoll(dieSides = 6) {
    return Math.floor(Math.random() * dieSides) + 1;
}
function getHitRolls(rollsAmmount) {
    let successfullRolls = [];
    for (let i = 0; i < rollsAmmount; i++) {
        const rollResult = simulateRoll();
        if (rollResult > 1) {
            successfullRolls.push(rollResult);
        }
        else { //TESTING ELSE BLOCK!
            ignoredRolls++;
            console.log("rolled a 1");
        }
    }
    return successfullRolls;
}
function getWoundRollThresholds(hitRolls, str, tough) {
    let woundThresholds = [];
    for (let i = 0; i < hitRolls; i++) {
        const rollResult = simulateRoll();
        woundRolls.push(rollResult);
        if (rollResult > 1) {
            let woundThreshold;
            if (str === tough * 2) {
                woundThreshold = 2;
            }
            else if (str > tough * 2) {
                woundThreshold = 3;
            }
            else if (str === tough) {
                woundThreshold = 4;
            }
            else if (str < tough && str > tough / 2) {
                woundThreshold = 5;
            }
            else if (str <= tough / 2) {
                woundThreshold = 6;
            }
            else {
                throw new Error(`Error Calculating wound threshold roll. Roll number ${i + 1} with the value of ${rollResult}`);
            }
            woundThresholds.push(woundThreshold);
        }
        else { //TESTING ELSE BLOCK!
            ignoredWoundRolls++;
            console.log("rolled a 1 (wound roll)");
        }
    }
    return woundThresholds;
}
