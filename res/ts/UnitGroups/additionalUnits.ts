import { FieldValues, getStoredUserInput} from "../pageData";
import { BaseUnitClass, UnitAttackResults } from "./BaseUnit";

export class AdditionalUnitClass extends BaseUnitClass {
	constructor(userInput: FieldValues) {
		super(
			getStoredUserInput(userInput, "addUnits"), 
			getStoredUserInput(userInput, "addUnitsWounds")
		);
	}

	public applyWoundsToUnit(woundsToApply: number, damage: number): UnitAttackResults {
		const result = this.applyWounds(woundsToApply, damage);
		return result;
	}
}