import { FieldValues, getPageValues } from "./pageData";
import { HitRolls } from "./hitRolls";
import { WoundRolls } from "./woundRolls";
import { SaveRolls } from "./saveRolls";


function clickRollBtn(): void {
	window.alert("8");
	const userInputValues: FieldValues = getPageValues();

	const hitRolls = new HitRolls(userInputValues);
	const woundRolls = new WoundRolls(hitRolls.successValues.length ,userInputValues);
	const saveRolls = new SaveRolls(woundRolls.successValues.length, userInputValues);

	const totalWoundsInflicted : number = getTotalWounds(saveRolls.failValues.length, +userInputValues.dmg);

	let calculatedData: Record<string, any> = {};
	calculatedData.firstRoll = hitRolls;
	calculatedData.woundRoll = woundRolls;
	calculatedData.saveRoll = saveRolls
	calculatedData.totalWounds = totalWoundsInflicted;
	console.log(userInputValues);
	writeToTestArea(calculatedData, "testArea");
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