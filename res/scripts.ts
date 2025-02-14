import { FieldValues, getPageValues } from "./pageData";
import { HitRolls } from "./hitRolls";
import { WoundRolls } from "./woundRolls";
import { SaveRolls } from "./saveRolls";


function clickRollBtn(): void {
	const userInputValues: FieldValues = getPageValues();

	const hitRolls = new HitRolls(userInputValues);
	const woundRolls = new WoundRolls(hitRolls.successValues.length ,userInputValues);
	const saveRolls = new SaveRolls(woundRolls.successValues.length, userInputValues);

	const totalWoundsInflicted: number = getTotalWounds(
		saveRolls.failValues.length, +userInputValues.dmg
	);
    const { modelsKilled, remainingWounds, unitDestroyed } = getModelsKilled(
        totalWoundsInflicted,
        +userInputValues.wounds,
        +userInputValues.defModels,
		+userInputValues.damage
    );

	//testing values/////////////////////////////////////////////////
	let calculatedData: Record<string, any> = {};
	calculatedData.firstRoll = hitRolls;
	calculatedData.woundRoll = woundRolls;
	calculatedData.saveRoll = saveRolls
	calculatedData.totalWounds = totalWoundsInflicted;
	calculatedData.modelsKilled = modelsKilled;
	calculatedData.remainingWounds = remainingWounds;
	calculatedData.entireUnitDestroyed = unitDestroyed;
	console.log(userInputValues);
	writeToTestArea(calculatedData, "testArea");
	/////////////////////////////////////////////////////////////////
}

function getTotalWounds(fails: number, damage: number): number {
	return fails * damage;
}

function getModelsKilled(
    totalWounds: number, 
    modelWounds: number, 
    totalModels: number, 
    damagePerHit: number 
): { modelsKilled: number; remainingWounds: number; unitDestroyed: boolean } {

    if (modelWounds <= 0 || totalModels <= 0 || damagePerHit <= 0) {
        throw new Error("Invalid enemy model wounds, total models, or damage per hit value.");
    }

    let woundsRemaining = totalWounds;
    let modelsKilled = 0;
    let lastModelWounds = modelWounds;

    while (woundsRemaining >= damagePerHit && modelsKilled < totalModels) {
        if (damagePerHit >= lastModelWounds) {
            woundsRemaining -= damagePerHit;
            modelsKilled++;
            lastModelWounds = modelWounds;
        } else {
            lastModelWounds -= damagePerHit;
            woundsRemaining -= damagePerHit;
        }
    }

    const unitDestroyed = modelsKilled >= totalModels;
    const remainingWounds = modelsKilled < totalModels ? lastModelWounds : 0;

    return { modelsKilled, remainingWounds, unitDestroyed };
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