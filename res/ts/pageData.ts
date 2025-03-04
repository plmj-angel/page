import { 
	UserInputSchema, userInputValue, userInputClass, FieldValues 
} from "./userInputModel";



export class UserInput implements UserInputSchema {
	//default values
	attackModels: number = 0;
    attacks: number = 0;
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
    wounds: number = 0;
    saveMod: number = 0;
    cover: boolean = false;
    saveReroll: number = 0;
    feelNoPain: number = 0;
    addUnits: number = 0;
    addUnitsWounds: number = 0;
    leaderWounds: number = 0;

	constructor() {
		const parsedUserData = parseUserInput();
		Object.assign(this, parsedUserData);
	}

}

//helpers
function getNumberValue(id: string): number {
    const input = document.getElementById(id) as HTMLInputElement;
    return input ? Number(input.value) || 0 : 0;
}

function getCheckboxValue(id: string): boolean {
    const input = document.getElementById(id) as HTMLInputElement;
    return input ? input.checked : false;
}

function getStringValue(id: string): string {
    const input = document.getElementById(id) as HTMLInputElement;
    return input ? input.value : '';
}

function parseUserInput(): UserInputSchema {
    return {
        attackModels: getNumberValue('attackModels'),
        attacks: getNumberValue('attacks'),
        skill: getNumberValue('skill'),
        strength: getNumberValue('strength'),
        ap: getNumberValue('ap'),
        damage: getNumberValue('damage'),
        hitMod: getNumberValue('hitMod'),
        woundMod: getNumberValue('woundMod'),
        devastWound: getCheckboxValue('devastWound'),
        woundCrit: getNumberValue('woundCrit'),
        woundRoll: getStringValue('woundRoll'),
        woundReroll: getStringValue('woundReroll'),
        defenseModels: getNumberValue('defenseModels'),
        toughness: getNumberValue('toughness'),
        save: getNumberValue('save'),
        invulnrable: getNumberValue('invulnrable'),
        wounds: getNumberValue('wounds'),
        saveMod: getNumberValue('saveMod'),
        cover: getCheckboxValue('cover'),
        saveReroll: getNumberValue('saveReroll'),
        feelNoPain: getNumberValue('feelNoPain'),
        addUnits: getNumberValue('addUnits'),
        addUnitsWounds: getNumberValue('addUnitsWounds'),
        leaderWounds: getNumberValue('leaderWounds'),
    };
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