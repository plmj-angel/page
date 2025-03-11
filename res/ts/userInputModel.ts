export interface UserInputSchema {
	attackModels: number;
	attacks: number;
	skill: number;
	strength: number;
	ap: number;
	damage: number;
	hitMod: number;
	woundMod: number;
	devastWound: boolean;
	lethalHit: boolean;
	woundCrit: number;
	woundRoll: string;
	woundReroll: string;
	defenseModels: number;
	toughness: number;
	save: number;
	invulnrable: number;
	wounds: number;
	saveMod: string;
	cover: boolean;
	saveReroll: number;
	feelNoPain: number;
	addUnits: number;
	addUnitsWounds: number;
	leaderWounds: number;
}

export interface userInputValue {
	[key: string]: string | boolean | number;
}

export interface FieldValues {
	[key: string]: string | boolean;
}