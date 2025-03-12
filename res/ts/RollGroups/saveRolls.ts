import { RollsGroup } from "./rollgroups";
import { UserInput } from ".././pageData";

export class SaveRolls extends RollsGroup {
	save: number;
	ap: number;
	invulnrable: number;
	useInvulnSave : boolean;
	devastatingWounds: number = 0;
    constructor(totalWounds: number, devastatingWounds: number, userInputValues: UserInput) {
        super();
		this.save = userInputValues.save;
		this.ap = userInputValues.ap;
		this.invulnrable = userInputValues.invulnrable;
		this.useInvulnSave = this.invulnrable < this.save + this.ap;  
        this.totalRolls = totalWounds;
		this.devastatingWounds = devastatingWounds;
		const saveValueToUse = this.useInvulnSave ? this.invulnrable : this.save;
        this.rollSaves(saveValueToUse, this.ap);
		this.successes = this.successValues.length;
		this.fails += this.devastatingWounds
    }

    rollSaves(usedSaveValue: number, ap: number): void {
        this.simulateRolls(this.totalRolls, (rollResult) => {
			rollResult = this.applyModifierToResult(-ap, rollResult, false)
            if (rollResult === 1) {
                this.rolledAOne++;
                this.failValues.push(rollResult);
                return null;
            }

            if (rollResult < usedSaveValue) {
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