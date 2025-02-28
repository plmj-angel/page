import { RollsGroup } from "./rollgroups";
import { FieldValues, getStoredUserInput } from ".././pageData";

export class SaveRolls extends RollsGroup {
	ap: number;
	//invulnrable: number;
    constructor(totalWounds: number, userInputValues: FieldValues) {
        super();
		this.ap = getStoredUserInput(userInputValues, "ap");
        this.totalRolls = totalWounds;

        this.rollSaves(+userInputValues.save);
		this.successes = this.successValues.length;
    }

    rollSaves(save: number): void {
        this.simulateRolls(this.totalRolls, (rollResult) => {
			rollResult = this.applyModifierToResult(-this.ap, rollResult, false)
            if (rollResult === 1) {
                this.rolledAOne++;
                //console.log("rolled a 1 (save roll)");
                this.failValues.push(rollResult);
                return null;
            }

            if (rollResult < save) {
                this.failValues.push(rollResult);
                return null;
            } else {
                this.successValues.push(rollResult);
                return rollResult;
            }
        });
		this.fails = this.failValues.length;
    }
}