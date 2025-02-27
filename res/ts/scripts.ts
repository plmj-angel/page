import { FieldValues, getPageValues, getStoredUserInput } from "./pageData";
import { UnitAttackResults } from "./UnitGroups/BaseUnit";
import { HitRolls } from "./RollGroups/hitRolls";
import { WoundRolls } from "./RollGroups/woundRolls";
import { SaveRolls } from "./RollGroups/saveRolls";
import { MainUnitClass } from "./UnitGroups/mainUnit";
import { AdditionalUnitClass } from "./UnitGroups/additionalUnits";
import { LeaderUnitClass } from "./UnitGroups/leaderSoloUnitLmaoLoser";

function clickRollBtn(): void {
	const userInputValues: FieldValues = getPageValues();
	
	const hitRolls = new HitRolls(userInputValues);
	const woundRolls = new WoundRolls(hitRolls.successValues.length, userInputValues);
	const saveRolls = new SaveRolls(woundRolls.successValues.length, userInputValues);
	
	const totalWoundsInflicted: number = getTotalWounds(
		saveRolls.failValues.length, +userInputValues.dmg
	);


	const mainUnitAttack = new MainUnitClass(userInputValues);
	const mainUnitAttackResults = mainUnitAttack.applyWoundsToUnit(
		totalWoundsInflicted, +userInputValues.dmg);

	const additionalUnitAttack = new AdditionalUnitClass(userInputValues);
	const additionalUnitAttackResults = additionalUnitAttack.applyWoundsToUnit			(mainUnitAttackResults.attackWoundsRemaining, +userInputValues.dmg)

	const leaderAttack = new LeaderUnitClass(userInputValues);
	const leaderAttackResults = leaderAttack.applyWoundsToUnit(
		additionalUnitAttackResults.attackWoundsRemaining, +userInputValues.dmg
	);

	
	//testing values/////////////////////////////////////////////////
	let calculatedData: Record<string, any> = {};
	calculatedData.hitRolls = hitRolls;
	calculatedData.woundRoll = woundRolls;
	calculatedData.saveRoll = saveRolls;
	calculatedData.mainUnitAttack = mainUnitAttack;
	calculatedData.mainUnitAttackResults = mainUnitAttackResults
	calculatedData.additionalUnitAttack = additionalUnitAttack;
	calculatedData.additionalUnitAttackResults = additionalUnitAttackResults;
	calculatedData.leaderAttack = leaderAttack;
	calculatedData.leaderAttackResults = leaderAttackResults;
	//calculatedData.additionalModelsRemaining = additionalModelsRemaining;
	//calculatedData.entireUnitDestroyed = entireUnitDestroyed;
    //calculatedData.leaderDead = leaderDead; 
	calculatedData.userInput = userInputValues;
	addResultsToGlobalWindow(calculatedData);

	writeToTestArea(calculatedData, "testArea");
	///////////////////////////////////////////////////////////////
}

function getTotalWounds(fails: number, damage: number): number {
	return fails * damage;
}


//need to make this a class...
function getModelsKilled(
    userInputValues: FieldValues,
    totalWounds: number
): { 
    modelsKilled: number; 
    remainingWounds: number; 
    entireUnitDestroyed: boolean; 
    modelsRemaining: number; 
    additionalModelsRemaining: number; 
    leaderDead: boolean 
} {
    const mainModels = +userInputValues.defModels || 0;
    const mainModelWounds = +userInputValues.wounds || 0;
    const additionalModels = +userInputValues.addUnits || 0;
    const additionalModelWounds = +userInputValues.addUnitsWounds || 0;
    const leaderWounds = +userInputValues.leaderWounds || 0;

    if (leaderWounds < 0 || mainModelWounds < 0 || additionalModelWounds < 0 || mainModels < 0 || additionalModels < 0) {
        throw new Error("Invalid enemy unit values.");
    }

    let woundsRemaining = totalWounds;
    let modelsKilled = 0;
    let modelsRemaining = mainModels;
    let additionalModelsRemaining = additionalModels;
    let lastModelWounds = mainModelWounds;

    console.log(`\n🔍 Initial State:`);
    console.log(`Total Wounds Inflicted: ${totalWounds}`);
    console.log(`Main Models: ${mainModels}, Wounds Each: ${mainModelWounds}`);
    console.log(`Additional Models: ${additionalModels}, Wounds Each: ${additionalModelWounds}`);
    console.log(`Leader Wounds: ${leaderWounds}`);

    while (woundsRemaining > 0 && modelsRemaining > 0) {
        console.log(`\n⚔️ Damaging Main Model - Wounds Left: ${lastModelWounds}, Wounds Remaining: ${woundsRemaining}`);
        if (woundsRemaining >= lastModelWounds) {
            woundsRemaining -= lastModelWounds;
            modelsKilled++;
            modelsRemaining--;
            lastModelWounds = mainModelWounds;
            console.log(`💀 Main Model Killed! Remaining Main Models: ${modelsRemaining}`);
        } else {
            lastModelWounds -= woundsRemaining;
            woundsRemaining = 0;
            console.log(`🩸 Main Model Wounded, Remaining Wounds: ${lastModelWounds}`);
        }
    }

    let additionalModelsKilled = 0;
    while (woundsRemaining > 0 && additionalModelsRemaining > 0) {
        console.log(`\n⚔️ Damaging Additional Model - Wounds Left: ${additionalModelWounds}, Wounds Remaining: ${woundsRemaining}`);
        if (woundsRemaining >= additionalModelWounds) {
            woundsRemaining -= additionalModelWounds;
            additionalModelsKilled++;
            additionalModelsRemaining--;
            console.log(`💀 Additional Model Killed! Remaining Additional Models: ${additionalModelsRemaining}`);
        } else {
            lastModelWounds = additionalModelWounds - woundsRemaining;
            woundsRemaining = 0;
            console.log(`🩸 Additional Model Wounded, Remaining Wounds: ${lastModelWounds}`);
        }
    }

    let leaderDead = false;
    let leaderRemainingWounds = leaderWounds;
    if (modelsRemaining === 0 && additionalModelsRemaining === 0 && woundsRemaining > 0) {
        console.log(`\n⚔️ Damaging Leader - Wounds Left: ${leaderRemainingWounds}, Wounds Remaining: ${woundsRemaining}`);
        if (woundsRemaining >= leaderRemainingWounds) {
            woundsRemaining -= leaderRemainingWounds;
            leaderRemainingWounds = 0;
            leaderDead = true;
            console.log(`💀 Leader Killed!`);
        } else {
            leaderRemainingWounds -= woundsRemaining;
            woundsRemaining = 0;
            console.log(`🩸 Leader Wounded, Remaining Wounds: ${leaderRemainingWounds}`);
        }
    }

    const entireUnitDestroyed = modelsRemaining === 0;

    console.log(`\n🔚 Final State:`);
    console.log(`Models Killed: ${modelsKilled}`);
    console.log(`Surviving Main Models: ${modelsRemaining}`);
    console.log(`Surviving Additional Models: ${additionalModelsRemaining}`);
    console.log(`Remaining Wounds on Leader: ${leaderRemainingWounds}`);
    console.log(`Leader Dead: ${leaderDead}`);
    console.log(`Main Unit Destroyed: ${entireUnitDestroyed}`);

    return { 
        modelsKilled, 
        remainingWounds: leaderRemainingWounds, 
        entireUnitDestroyed, 
        modelsRemaining, 
        additionalModelsRemaining, 
        leaderDead 
    };
}

document.addEventListener("DOMContentLoaded", () => {
	const rollButton = document.getElementById("rollButton");

	if (rollButton) {
		rollButton.addEventListener("click", clickRollBtn);
	}
});











//for Nacho testing
function writeToTestArea(dataObject: FieldValues, testAreaId: string): void {
	const testArea = document.getElementById(testAreaId);
	if (!testArea) {
		throw new Error("you done goofed the test area id smh");
	}

	testArea.innerHTML = ""; // wipe the test area. (rerolls)

	const formatValue = (value: unknown, indent = "&nbsp;&nbsp;"): string => {
		if (Array.isArray(value)) {
			return `[ ${value.map((item) => formatValue(item)).join(", ")} ]`;
		} else if (typeof value === "object" && value !== null) {
			return `{<br>${Object.entries(value)
				.map(([subKey, subValue]) => `${indent}${subKey}: ${formatValue(subValue, indent + "&nbsp;&nbsp;")}`)
				.join("<br>")}<br>}`;
		}
		return String(value);
	};

	Object.entries(dataObject).forEach(([key, value]) => {
		const paraElement = document.createElement("p");

		if (typeof value !== "object" || value === null || Array.isArray(value)) {
			paraElement.innerHTML = `<strong>${key}:</strong> ${formatValue(value)}`;
		} else {
			paraElement.innerHTML = `<strong>${key}:</strong> <br>${formatValue(value)}`;
		}

		testArea.appendChild(paraElement);
	});
}

function addResultsToGlobalWindow(results: object): void {
	const key = "turnResults" as keyof Window;

	if (!Array.isArray(window[key])) {
		(window as any)[key] = [];
	}
	(window as any)[key].push(results);
}