import { UserInput } from "./pageData";
import { BaseUnitClass } from "./UnitGroups/BaseUnit";
import { HitRolls } from "./RollGroups/hitRolls";
import { WoundRolls } from "./RollGroups/woundRolls";
import { SaveRolls } from "./RollGroups/saveRolls";
import { MainUnitClass } from "./UnitGroups/mainUnit";
import { AdditionalUnitClass } from "./UnitGroups/additionalUnits";
import { LeaderUnitClass } from "./UnitGroups/leaderSoloUnitLmaoLoser";
import { writeTestValuesToPage } from "./devTesting";

function clickRollBtn(): void {
	const userInputData = new UserInput();

	console.log(userInputData);
	
	const hitRolls = new HitRolls(userInputData);
	const woundRolls = new WoundRolls(hitRolls.successValues.length, userInputData);
	const saveRolls = new SaveRolls(woundRolls.successValues.length, userInputData);
	
	const totalWoundsInflicted: number = getTotalWounds(
		saveRolls.failValues.length, userInputData.damage
	);


	const mainUnitAttack = new MainUnitClass(userInputData);
	const mainUnitAttackResults = mainUnitAttack.applyWoundsToUnit(
		totalWoundsInflicted, userInputData.damage);

	const additionalUnitAttack = new AdditionalUnitClass(userInputData);
	const additionalUnitAttackResults = additionalUnitAttack.applyWoundsToUnit			(mainUnitAttackResults.attackWoundsRemaining, userInputData.damage)

	const leaderAttack = new LeaderUnitClass(userInputData);
	const leaderAttackResults = leaderAttack.applyWoundsToUnit(
		additionalUnitAttackResults.attackWoundsRemaining, userInputData.damage
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
	//calculatedData.userInput = userInputData;
	addResultsToGlobalWindow(calculatedData);

	writeToTestArea(calculatedData, "testArea");
	///////////////////////////////////////////////////////////////
}

function loadTestValues(): void {
	writeTestValuesToPage();
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

document.addEventListener("DOMContentLoaded", () => {
	const testButton = document.getElementById("devTest");

	if (testButton) {
		testButton.addEventListener("click", loadTestValues);
	}
});

//TODO
function checkUnitExists(unit: BaseUnitClass) {
	
}








//for Nacho testing
function writeToTestArea(dataObject: Record<string, any>, testAreaId: string): void {
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