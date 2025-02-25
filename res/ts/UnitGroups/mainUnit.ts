import { FieldValues } from "../pageData";
import { BaseUnitClass } from "./BaseUnit";

export class MainUnitClass extends BaseUnitClass {
	constructor(userInput: FieldValues) {
		super(userInput);
	}

	public applyWoundsToMainUnit(wounds: number, models: number, damage: number): {
		woundsRemaining: number, 
		modelsRemaining: number, 
		lastModelRemainingWounds: number, 
		modelsKilled: number
	} {
		let woundsRemaining = wounds;
		let modelsRemaining = models;
		let lastModelRemainingWounds = wounds;

		let modelsKilled: number = this.applyWounds(woundsRemaining, modelsRemaining, damage, lastModelRemainingWounds);

		return { modelsKilled, modelsRemaining, woundsRemaining, lastModelRemainingWounds }

	}
}