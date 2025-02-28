export interface FieldValues {
	[key: string]: string | boolean;
}

const htmlIds: string[] = [
	//attack fields
	"models", "attacks", "skill", "str", "ap", "dmg", "hitMod", "lethHit", "susHits", "hitCrit", "critRolls", "reroll", "woundMod", "devastWound", "woundCrit", "woundRoll", "woundReroll",

	//defense fields
	"defModels", "tough", "save", "invuln", "wounds", "saveMod", "cover", "saveReroll", "noPain", "addUnits", "addUnitsWounds", "leaderWounds"
];

//lethalhits: bool, crititalHits: number, reRolls: string, sustainHits: number, critHitRolls: string 

const devValues: FieldValues = {
    "models": "3",
    "attacks": "5",
    "skill": "3",
    "str": "4",
    "ap": "1",
    "dmg": "2",
    "woundMod": "",
	"hitMod": "",
    "devastWound": false,
    "woundCrit": "",
    "woundRoll": "NONE",
    "woundReroll": "NONE",
    "defModels": "2",
    "tough": "2",
    "save": "2",
    "invuln": "0",
    "wounds": "5", //hp
    "saveMod": "",
    "cover": false,
    "saveReroll": "",
    "noPain": "",
	"addUnits": "2",
	"addUnitsWounds": "2",
	"leaderWounds": "0"
}

export function getPageValues(devMode = false): FieldValues {
	const fieldValues: FieldValues = {};

	//testing block - remember to remove bool param!//////////////////////////////
	if (devMode){
		htmlIds.forEach(htmlId => {
			const element = document.getElementById(htmlId);
			if (element) {
				const inputElement = element as HTMLInputElement;
				inputElement.value = devValues[htmlId].toString();
			}
		});
		return devValues;
	}
	////////////////////////////////////////////////////////////////////////////

	htmlIds.forEach(htmlId => {
		const element = document.getElementById(htmlId);
		if (element) {
			fieldValues[htmlId] = getInputValue(element);
		}
	});
	return fieldValues;
}

export function getStoredUserInput(storedValues: FieldValues, propertyKey: string): number {
	if (storedValues[propertyKey] === null || storedValues[propertyKey] === undefined ) {
		return 0;
	}
	return +storedValues[propertyKey];
}

function getInputValue(element: HTMLElement): string | boolean {
	const inputElement = element as HTMLInputElement;
	if (inputElement.type === "checkbox") {
		return inputElement.checked;
	}
	return inputElement.value;
}
