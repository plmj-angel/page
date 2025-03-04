export interface FieldValues {
	[key: string]: string | boolean;
}


export class UserInput {
	//page values
	attackModels: number = 0;
    attacks: number = 0
    skill: number = 0;
    strength: number = 0;
    ap: number = 0;
    damage: number = 0;
	hitMod: number = 0;
    woundMod: number = 0;
    devastWound: boolean = false;
    woundCrit: number = 0;
    woundRoll: string = "";
    woundReroll: string = "";
    defenseModels: number = 0;
    toughness: number = 0;
    save: number = 0;
    invulnrable: number = 0;
    wounds: number = 0; //hp
    saveMod: number = 0;
    cover: boolean = false;
    saveReroll: number = 0;
    feelNoPain: number = 0;
	addUnits: number = 0;
	addUnitsWounds: number = 0;
	leaderWounds: number = 0;
	
	htmlClass: string = "userInput";

	constructor() {
		const pageValues = this.getPageValues(this.htmlClass);
		this.mapPageValuesToProperties(pageValues);
	}

	getPageValues(elementsClass: string): FieldValues {
		let pageValues: FieldValues = {};
		const inputElements = document.querySelectorAll(`.${elementsClass}`);
		inputElements.forEach((element) => {
			const inputElement = element as HTMLElement;
			const elementId = inputElement.id;
			const elementValue = this.getFieldValue(inputElement);
			pageValues[elementId] = elementValue;
		});
		return pageValues;
	}

	private getFieldValue(element: HTMLElement) {
		const inputElement = element as HTMLInputElement;
		if (inputElement.type === "checkbox") {
			return inputElement.checked;
		}
		return inputElement.value;
	}

	// Map the values to class properties
	private mapPageValuesToProperties(pageValues: FieldValues): void {
		for (const key in pageValues) {
			if (Object.prototype.hasOwnProperty.call(this, key)) {
				const value = pageValues[key];

				// Use known property types for assignment
				this.assignProperty(key, value);
			}
		}
	}

	private assignProperty(key: string, value: string | boolean): void {
		if (key in this) {
			// Special cases for boolean properties
			if (typeof (this as any)[key] === 'boolean') {
				(this as any)[key] = Boolean(value);
			}
			// Number properties
			else if (typeof (this as any)[key] === 'number') {
				(this as any)[key] = Number(value);
			}
			// String properties
			else if (typeof (this as any)[key] === 'string') {
				(this as any)[key] = String(value);
			}
		}
	}
}


export function getStoredUserInput(storedValues: FieldValues, propertyKey: string): number {
	if (storedValues[propertyKey] === null || storedValues[propertyKey] === undefined ) {
		return 0;
	}
	return +storedValues[propertyKey];
}

//idr...
//lethalhits: bool, crititalHits: number, reRolls: string, sustainHits: number, critHitRolls: string 

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