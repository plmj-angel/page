interface FieldValues {
	[key: string]: string | boolean;
}

const htmlIds: string[] = [
	//attack fields
	"models", "attacks", "skill", "str", "ap", "dmg", "hitMod", "lethHit", "susHits", "hitCrit", "critRolls", "reroll", "woundMod", "devastWound", "woundCrit", "woundRoll", "woundReroll",

	//defense fields
	"defModels", "tough", "save", "invuln", "wounds", "saveMod", "cover", "saveReroll", "noPain"
];

/*let firstRolls = {};
let woundRolls = {};
let saveRolls = {};*/

let ignoredRolls: number = 0;
let ignoredWoundRolls: number = 0;
let woundRolls: number[] = [];
let ignoredThirdRolls: number = 0;
function clickRollBtn(): void {
	//reset for reclicks
	ignoredRolls  = 0;
	ignoredWoundRolls = 0;
	woundRolls = [];
	ignoredThirdRolls = 0;

	const pageValues: FieldValues = getValues(htmlIds);
	const totalRolls: number = getTotalRolls(+pageValues.models, +pageValues.attacks);
	const hitRolls: number[] = getHitRolls(totalRolls);
	const woundThresholds: number[] = getWoundRollThresholds(hitRolls.length, +pageValues.str, +pageValues.tough);
	const thirdRollFails: number[] = getThirdRollFails(woundThresholds.length, +pageValues.save);
	const totalWounds: number = getTotalWounds(thirdRollFails.length, +pageValues.dmg);

	let calculatedData: Record<string, any> = {};
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

function getValues(htmlIds: string[]): FieldValues {
	const fieldValues: FieldValues = {};
	htmlIds.forEach(htmlId => {
		const element = document.getElementById(htmlId);
		if (element) {
			fieldValues[htmlId] = getInputValue(element);
		}
	});
	return fieldValues;
}

function getInputValue(element: HTMLElement): string | boolean {
	const inputElement = element as HTMLInputElement;
	if (inputElement.type === "checkbox") {
		return inputElement.checked;
	}
	return inputElement.value;
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

function getHitRolls(rollsAmmount: number): number[] {
	const hitRolls = simulateRolls(rollsAmmount, (rollResult) => {
		if (rollResult > 1) {
			return rollResult
		} else { //TESTING ELSE BLOCK!
			ignoredRolls++;
			console.log("rolled a 1");
			return null;
		}
	});
	return hitRolls;
}

function getWoundRollThresholds(hitRolls: number, str: number, tough:number): number[] {
	const threshold = getWoundThreshold(str, tough);
	const woundThresholds = simulateRolls(hitRolls, (rollResult) => {
		woundRolls.push(rollResult);
		if (rollResult > 1) {
			if (rollResult >= threshold){
				return rollResult
			}
			return null;
		} else { //TESTING ELSE BLOCK!
			ignoredWoundRolls++;
			console.log("rolled a 1 (wound roll)");
			return null;
		}
	});
	return woundThresholds;
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

function getThirdRollFails(threshold: number, save: number): number[] {
	const thirdRollFails = simulateRolls(threshold, (rollResult) => {
		if (rollResult > save) {
			return rollResult
		}
		ignoredThirdRolls++;
		return null;
	});
	return thirdRollFails;
}

function getTotalWounds(fails: number, damage: number): number {
	return fails * damage;
}