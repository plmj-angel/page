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
let ignoredThirdRolls = 0;
function clickRollBtn() {
    //reset for reclicks
    ignoredRolls = 0;
    ignoredWoundRolls = 0;
    woundRolls = [];
    ignoredThirdRolls = 0;
    const pageValues = getValues(htmlIds);
    const totalRolls = getTotalRolls(+pageValues.models, +pageValues.attacks);
    const hitRolls = getHitRolls(totalRolls);
    const woundThresholds = getWoundRollThresholds(hitRolls.length, +pageValues.str, +pageValues.tough);
    const thirdRollFails = getThirdRollFails(woundThresholds.length, +pageValues.save);
    const totalWounds = getTotalWounds(thirdRollFails.length, +pageValues.dmg);
    let calculatedData = {};
    calculatedData.firstRolls = totalRolls;
    calculatedData.hits = hitRolls;
    calculatedData.rolledAOne = ignoredRolls;
    calculatedData.woundRolls = woundRolls.length;
    calculatedData.woundRollValues = woundRolls;
    calculatedData.woundThresholds = woundThresholds;
    calculatedData.ignoredWoundRollsByRollingAOne = ignoredWoundRolls;
    calculatedData.thirdRollFails = thirdRollFails;
    calculatedData.thirdRollsUnderSave = ignoredThirdRolls;
    calculatedData.totalWounds = totalWounds;
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
function performRoll(dieSides = 6) {
    return Math.floor(Math.random() * dieSides) + 1;
}
function simulateRolls(rollsAmount, rollCallback, dieSides = 6) {
    const simulationResults = [];
    for (let i = 0; i < rollsAmount; i++) {
        const rollResult = performRoll(dieSides);
        const result = rollCallback(rollResult);
        if (result !== null) {
            simulationResults.push(result);
        }
    }
    return simulationResults;
}
function getTotalRolls(models, attacks) {
    return models * attacks;
}
function getHitRolls(rollsAmmount) {
    const hitRolls = simulateRolls(rollsAmmount, (rollResult) => {
        if (rollResult > 1) {
            return rollResult;
        }
        else { //TESTING ELSE BLOCK!
            ignoredRolls++;
            console.log("rolled a 1");
            return null;
        }
    });
    return hitRolls;
}
function getWoundRollThresholds(hitRolls, str, tough) {
    const woundThresholds = simulateRolls(hitRolls, (rollResult) => {
        woundRolls.push(rollResult);
        if (rollResult > 1) {
            let woundThreshold;
            if (str >= tough * 2) {
                woundThreshold = 2;
            }
            else if (str > tough) {
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
                throw new Error(`Error Calculating wound threshold roll. Roll with the value of ${rollResult}`);
            }
            return woundThreshold;
        }
        else { //TESTING ELSE BLOCK!
            ignoredWoundRolls++;
            console.log("rolled a 1 (wound roll)");
            return null;
        }
    });
    return woundThresholds;
}
function getThirdRollFails(threshold, save) {
    const thirdRollFails = simulateRolls(threshold, (rollResult) => {
        if (rollResult > save) {
            return rollResult;
        }
        ignoredThirdRolls++;
        return null;
    });
    return thirdRollFails;
}
function getTotalWounds(fails, damage) {
    return fails * damage;
}
