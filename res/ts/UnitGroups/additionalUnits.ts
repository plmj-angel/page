import { UserInput} from "../pageData";
import { BaseUnitClass, UnitAttackResults } from "./BaseUnit";

export class AdditionalUnitClass extends BaseUnitClass {
	constructor(userInput: UserInput) {
		super(userInput.addUnits, userInput.addUnitsWounds);
	}

	public applyWoundsToUnit(woundsToApply: number, damage: number): UnitAttackResults {
		const result = this.applyWounds(woundsToApply, damage);
		return result;
	}
}