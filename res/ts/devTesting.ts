import { FieldValues } from "./userInputModel";

const devValues: FieldValues = {
    "attackModels": "3",
    "attacks": "5",
    "skill": "3",
    "strength": "4",
    "ap": "1",
    "damage": "2",
    "woundMod": "",
	"hitMod": "",
    "devastWound": false,
    "woundCrit": "",
    "woundRoll": "NONE",
    "woundReroll": "NONE",
    "defenseModels": "2",
    "toughness": "2",
    "save": "2",
    "invulnrable": "3",
    "wounds": "5", //hp
    "saveMod": "",
    "cover": false,
    "saveReroll": "",
    "feelNoPain": "",
	"addUnits": "2",
	"addUnitsWounds": "2",
	"leaderWounds": "0"
}

export function writeTestValuesToPage(): void {
	htmlIds.forEach(htmlId => {
		const element = document.getElementById(htmlId);
		if (element) {
			const inputElement = element as HTMLInputElement;
			inputElement.value = devValues[htmlId].toString();
		}
	});
}

const htmlIds: string[] = [
	//attack fields
	"attackModels", "attacks", "skill", "strength", "ap", "damage", "hitMod", "lethHit", "susHits", "hitCrit", "critRolls", "reroll", "woundMod", "devastWound", "woundCrit", "woundRoll", "woundReroll",

	//defense fields
	"defenseModels", "toughness", "save", "invulnrable", "wounds", "saveMod", "cover", "saveReroll", "feelNoPain", "addUnits", "addUnitsWounds", "leaderWounds"
];