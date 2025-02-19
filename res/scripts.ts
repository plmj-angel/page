import { FieldValues, getPageValues } from "./pageData";
import { HitRolls } from "./hitRolls";
import { WoundRolls } from "./woundRolls";
import { SaveRolls } from "./saveRolls";


function clickRollBtn(): void {
	const userInputValues: FieldValues = getPageValues();

	const hitRolls = new HitRolls(userInputValues);
	const woundRolls = new WoundRolls(hitRolls.successValues.length, userInputValues);
	const saveRolls = new SaveRolls(woundRolls.successValues.length, userInputValues);

	const totalWoundsInflicted: number = getTotalWounds(
		saveRolls.failValues.length, +userInputValues.dmg
	);
	const { modelsKilled, remainingWounds, unitDestroyed, modelsRemaining, additionalModelsRemaining } = getModelsKilled(userInputValues, totalWoundsInflicted);

	//testing values/////////////////////////////////////////////////
	let calculatedData: Record<string, any> = {};
	calculatedData.firstRoll = hitRolls;
	calculatedData.woundRoll = woundRolls;
	calculatedData.saveRoll = saveRolls
	calculatedData.totalWounds = totalWoundsInflicted;
	calculatedData.modelsKilled = modelsKilled;
	calculatedData.remainingWounds = remainingWounds;
	calculatedData.survivingModels = modelsRemaining;
	calculatedData.additionalModelsRemaining = additionalModelsRemaining;
	calculatedData.entireUnitDestroyed = unitDestroyed;
	calculatedData.userInput = userInputValues;
	addResultsToGlobalWindow(calculatedData);
	console.log(calculatedData);

	writeToTestArea(calculatedData, "testArea");
	/////////////////////////////////////////////////////////////////
}

function getTotalWounds(fails: number, damage: number): number {
	return fails * damage;
}

function getModelsKilled(
    userInputValues: FieldValues,
    totalWounds: number
): { 
    modelsKilled: number; 
    remainingWounds: number; 
    unitDestroyed: boolean; 
    modelsRemaining: number; 
    additionalModelsRemaining: number 
} {
    const mainModels = +userInputValues.defModels;
    const mainModelWounds = +userInputValues.wounds;
    const additionalModels = +userInputValues.addUnits;
    const additionalModelWounds = +userInputValues.addUnitsWounds;
    const leaderWounds = +userInputValues.wounds;

    if (leaderWounds <= 0 || mainModelWounds <= 0 || additionalModelWounds <= 0 || mainModels < 0 || additionalModels < 0) {
        throw new Error("Invalid enemy unit values.");
    }

    let woundsRemaining = totalWounds;
    let modelsKilled = 0;
    let modelsRemaining = mainModels;
    let additionalModelsRemaining = additionalModels;
    let lastModelWounds = mainModelWounds;

    while (woundsRemaining > 0 && modelsRemaining > 0) {
        if (woundsRemaining >= lastModelWounds) {
            woundsRemaining -= lastModelWounds;
            modelsKilled++;
            modelsRemaining--;
            lastModelWounds = mainModelWounds;
        } else {
            lastModelWounds -= woundsRemaining;
            woundsRemaining = 0;
        }
    }

    while (woundsRemaining > 0 && additionalModelsRemaining > 0) {
        if (woundsRemaining >= additionalModelWounds) {
            woundsRemaining -= additionalModelWounds;
            modelsKilled++;
            additionalModelsRemaining--;
        } else {
            lastModelWounds = additionalModelWounds - woundsRemaining;
            woundsRemaining = 0;
        }
    }

    let leaderRemainingWounds = leaderWounds;
    if (modelsRemaining === 0 && additionalModelsRemaining === 0 && woundsRemaining > 0) {
        if (woundsRemaining >= leaderRemainingWounds) {
            woundsRemaining -= leaderRemainingWounds;
            leaderRemainingWounds = 0;
        } else {
            leaderRemainingWounds -= woundsRemaining;
            woundsRemaining = 0;
        }
    }

    const unitDestroyed = modelsRemaining === 0 && additionalModelsRemaining === 0 && leaderRemainingWounds === 0;

    return { 
        modelsKilled, 
        remainingWounds: leaderRemainingWounds, 
        unitDestroyed, 
        modelsRemaining, 
        additionalModelsRemaining 
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
	console.log(window[key]);
}