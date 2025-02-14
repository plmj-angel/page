import { FieldValues, getPageValues } from "./pageData";
import { HitRolls, WoundRolls, SaveRolls } from "./rollgroups";


function clickRollBtn(): void {
	window.alert('6');
	const pageValues: FieldValues = getPageValues();

	const hitRolls = new HitRolls(pageValues);
	const woundRolls = new WoundRolls(hitRolls.successValues.length ,pageValues);
	const saveRolls = new SaveRolls(woundRolls.successValues.length, pageValues);

	const totalWounds: number = getTotalWounds(saveRolls.failValues.length, +pageValues.dmg);

	let calculatedData: Record<string, any> = {};
	calculatedData.firstRoll = hitRolls;
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

function getTotalWounds(fails: number, damage: number): number {
	return fails * damage;
}

document.addEventListener("DOMContentLoaded", () => {
    const rollButton = document.getElementById("rollButton");

    if (rollButton) {
        rollButton.addEventListener("click", clickRollBtn);
	}
});