import { UserInputSchema } from "./userInputModel";

class DevTestProfile implements UserInputSchema {
	attackModels = 5;
	attacks = 5;
	skill = 3;
	strength = 4;
	ap = 3;
	damage = 1;
	hitMod = 0;
	woundMod = 0;
	devastWound = true;
	lethalHit = true;
	woundCrit = 0;
	woundRoll = "NONE";
	woundReroll = "NONE";
	defenseModels = 10;
	toughness = 3;
	save = 4;
	invulnrable = 6;
	wounds = 1;
	saveMod = "";
	cover = false;
	saveReroll = 0;
	feelNoPain = 0;
	addUnits = 2;
	addUnitsWounds = 2;
	leaderWounds = 6
}

export function writeTestValuesToPage(): void {
	const devTestValues = new DevTestProfile();
	let TestValueKey: keyof typeof devTestValues;
	for (TestValueKey in devTestValues) {
		const element = document.getElementById(TestValueKey);
		if (element) {
			const inputElement = element as HTMLInputElement;;
			if (inputElement.type === 'checkbox') {
				inputElement.checked = Boolean(devTestValues[TestValueKey]);
			} else {
				inputElement.value = devTestValues[TestValueKey].toString();
			}
		}
	}
}