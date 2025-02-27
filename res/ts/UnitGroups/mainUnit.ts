import { FieldValues, getStoredUserInput} from "../pageData";
import { BaseUnitClass, UnitAttackResults } from "./BaseUnit";

export class MainUnitClass extends BaseUnitClass {
	constructor(userInput: FieldValues) {
		super(
			getStoredUserInput(userInput, "defModels"), 
			getStoredUserInput(userInput, "wounds")
		);
	}

	public applyWoundsToUnit(woundsToApply: number, damage: number): UnitAttackResults {
		const result = this.applyWounds(woundsToApply, damage);
		return result;

	}
}