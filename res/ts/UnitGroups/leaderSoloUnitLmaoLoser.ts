import { FieldValues, getStoredUserInput} from "../pageData";
import { BaseUnitClass, UnitAttackResults } from "./BaseUnit";

export class LeaderUnitClass extends BaseUnitClass {
	constructor(userInput: FieldValues) {
		super(1, getStoredUserInput(userInput, "leaderWounds"));
	}

	public applyWoundsToUnit(woundsToApply: number, damage: number): UnitAttackResults {
		const result = this.applyWounds(woundsToApply, damage);
		return result;

	}
}