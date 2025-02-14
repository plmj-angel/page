import { FieldValues, getPageValues } from "./pageData";

class RollsGroup {
	rollSimulationResults: number[] = [];
	successValues: number[] = [];
	failValues: number[] = [];
	rolledAOne: number = 0;
	threshold: number = 0;
}



function clickRollBtn(): void {
	const pageValues: FieldValues = getPageValues();

	const firstRolls = new RollsGroup();
	const woundRolls = new RollsGroup();
	const saveRolls = new RollsGroup();


	const totalRolls: number = getTotalRolls(+pageValues.models, +pageValues.attacks);
	firstRolls.successValues = getHitRolls(totalRolls, firstRolls);
	woundRolls.successValues = getWoundRollSuccesses(firstRolls.successValues.length, +pageValues.str, +pageValues.tough, woundRolls);
	saveRolls.failValues = getThirdRollFails(woundRolls.successValues.length, +pageValues.save, saveRolls);
	const totalWounds: number = getTotalWounds(saveRolls.failValues.length, +pageValues.dmg);

	let calculatedData: Record<string, any> = {};
	calculatedData.firstRolls = totalRolls;
	calculatedData.firstRoll = firstRolls;
	calculatedData.woundRoll = woundRolls;
	calculatedData.saveRoll = saveRolls
	calculatedData.totalWounds = totalWounds;
	console.log(pageValues);
	writeToTestArea(calculatedData, "testArea");
}


function writeToTestArea(dataObject: FieldValues, testAreaId: string): void {
	const testArea = document.getElementById(testAreaId);
	if (!testArea) {
		throw new Error("you done goofed the test area id smh");
	}

	testArea.innerHTML = ""; // wipe the test area

	const formatValue = (value: unknown, indent = "&nbsp;&nbsp;"): string => {
		if (Array.isArray(value)) {
			// Keep arrays on a single line
			return `[ ${value.map((item) => formatValue(item)).join(", ")} ]`;
		} else if (typeof value === "object" && value !== null) {
			// Always format objects with new lines and indentation
			return `{<br>${Object.entries(value)
				.map(([subKey, subValue]) => `${indent}${subKey}: ${formatValue(subValue, indent + "&nbsp;&nbsp;")}`)
				.join("<br>")}<br>}`;
		}
		// Primitive values (string, number, boolean) stay on the same line
		return String(value);
	};

	Object.entries(dataObject).forEach(([key, value]) => {
		const paraElement = document.createElement("p");

		// If the value is a primitive or an array, keep it on one line
		if (typeof value !== "object" || value === null || Array.isArray(value)) {
			paraElement.innerHTML = `<strong>${key}:</strong> ${formatValue(value)}`;
		} else {
			// If it's an object, format it with new lines
			paraElement.innerHTML = `<strong>${key}:</strong> <br>${formatValue(value)}`;
		}

		testArea.appendChild(paraElement);
	});
}

function performRoll(dieSides: number = 6): number {
	return Math.floor(Math.random() * dieSides) + 1;
}

function simulateRolls(
	rollsAmount: number,
	rollCallback: (rollResult: number) => number | null,
	dieSides: number = 6
): number[] {
	const simulationResults: number[] = [];
	for (let i = 0; i < rollsAmount; i++) {
		const rollResult = performRoll(dieSides);
		const result = rollCallback(rollResult);
		if (result !== null) {
			simulationResults.push(result);
		}
	}
	return simulationResults;
}

function getTotalRolls(models: number, attacks: number): number {
	return models * attacks;
}

function getHitRolls(rollsAmmount: number, firstRolls: RollsGroup): number[] {
	const hitRolls = simulateRolls(rollsAmmount, (rollResult) => {
		if (rollResult > 1) {
			return rollResult
		} else { //TESTING ELSE BLOCK!
			firstRolls.rolledAOne++;
			console.log("rolled a 1");
			return null;
		}
	});
	return hitRolls;
}

function getWoundRollSuccesses(hitRolls: number, str: number, tough:number, woundRolls: RollsGroup): number[] {
	woundRolls.threshold = getWoundThreshold(str, tough);
	const woundSuccesses = simulateRolls(hitRolls, (rollResult) => {
		woundRolls.rollSimulationResults.push(rollResult);
		if (rollResult > 1) {
			if (rollResult >= woundRolls.threshold){
				return rollResult
			}
			return null;
		} else { //TESTING ELSE BLOCK!
			woundRolls.rolledAOne++;
			console.log("rolled a 1 (wound roll)");
			return null;
		}
	});
	return woundSuccesses;
}

function getWoundThreshold (str: number, tough:number): number {
	if (str >= tough * 2) {
		return 2;
	} else if (str > tough) {
		return 3;
	} else if (str === tough) {
		return 4;
	} else if (str < tough && str > tough/2) {
		return 5;
	} else if (str <= tough/2) {
		return 6;
	} else {
		throw new Error(
			`Error Calculating wound threshold roll. Roll with the value for the strength of ${str} and toughness of ${tough}`
		);
	}
}

function getThirdRollFails(threshold: number, save: number, saveRolls: RollsGroup): number[] {
	const thirdRollFails = simulateRolls(threshold, (rollResult) => {
		if (rollResult > save) {
			return rollResult
		}
		saveRolls.rolledAOne++;
		return null;
	});
	return thirdRollFails;
}

function getTotalWounds(fails: number, damage: number): number {
	return fails * damage;
}

document.addEventListener("DOMContentLoaded", () => {
    const rollButton = document.getElementById("rollButton");

    if (rollButton) {
        rollButton.addEventListener("click", clickRollBtn);
	}
});