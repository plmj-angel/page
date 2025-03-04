import { UserInput } from "../pageData";
import { BaseUnitClass, UnitAttackResults } from "./BaseUnit";

export class MainUnitClass extends BaseUnitClass {
	constructor(userInput: UserInput) {
		super(userInput.defenseModels, userInput.wounds);
	}

	public applyWoundsToUnit(woundsToApply: number, damage: number): UnitAttackResults {
		const result = this.applyWounds(woundsToApply, damage);
		return result;

	}
}