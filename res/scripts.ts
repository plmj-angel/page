interface FieldValues {
	[key: string]: string | boolean;
}

const htmlIds: string[] = [
	//attack fields
	"models", "attacks", "skill", "str", "ap", "dmg", "hitMod", "lethHit", "susHits", "hitCrit", "critRolls", "reroll", "woundMod", "devastWound", "woundCrit", "woundRoll", "woundReroll",

	//defense fields
	"defModels", "tough", "save", "invuln", "wounds", "saveMod", "cover", "saveReroll", "noPain"
];

let ignoredRolls: number = 0;
let ignoredWoundRolls: number = 0;
let woundRolls: number[] = [];
function clickRollBtn(): void {
	const pageValues: FieldValues = getValues(htmlIds);
	const totalRolls: number = getTotalRolls(+pageValues.models, +pageValues.attacks);
	const hitRolls: number[] = getHitRolls(totalRolls);
	const woundThresholds: number[] = getWoundRollThresholds(hitRolls.length, +pageValues.str, +pageValues.tough);

	let calculatedData: Record<string, any> = {};
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
	Object.entries(dataObject).forEach(([key, value]) => {
		const paraElement = document.createElement("p");
		paraElement.textContent = `${key}: ${value}`;
		testArea.appendChild(paraElement);
	});
}

function getTotalRolls(models: number, attacks: number): number {
	return models * attacks;
}

function simulateRoll(dieSides: number = 6): number {
	return Math.floor(Math.random() * dieSides) + 1;
}

function getHitRolls(rollsAmmount: number): number[] {
	let successfullRolls: number[] = [];
	for (let i = 0; i < rollsAmmount; i++) {
		const rollResult = simulateRoll();
		if (rollResult > 1) {
			successfullRolls.push(rollResult);
		} else { //TESTING ELSE BLOCK!
			ignoredRolls++;
			console.log("rolled a 1");
		}
	}
	return successfullRolls;
}

function getWoundRollThresholds(hitRolls: number, str: number, tough:number) {
	let woundThresholds: number[] = [];
	for (let i = 0; i < hitRolls; i++) {
		const rollResult = simulateRoll();
		woundRolls.push(rollResult);
		if (rollResult > 1) {
			let woundThreshold: number;
			if (str === tough * 2) {
				woundThreshold = 2;
			} else if (str > tough * 2) {
				woundThreshold = 3;
			} else if (str === tough) {
				woundThreshold = 4;
			} else if (str < tough && str > tough/2) {
				woundThreshold = 5;
			} else if (str <= tough/2) {
				woundThreshold = 6;
			} else {
				throw new Error(
					`Error Calculating wound threshold roll. Roll number ${ i + 1 } with the value of ${rollResult}`
				);
			}
			woundThresholds.push(woundThreshold);

		} else { //TESTING ELSE BLOCK!
			ignoredWoundRolls++;
			console.log("rolled a 1 (wound roll)");
		}
	}
	return woundThresholds;
}