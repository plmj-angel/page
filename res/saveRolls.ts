import { RollsGroup } from "./rollgroups";
import { FieldValues } from "./pageData";

export class SaveRolls extends RollsGroup {
    constructor(totalWounds: number, userInputValues: FieldValues) {
        super();
        this.totalRolls = totalWounds;

        this.rollSaves(+userInputValues.save);
    }

    rollSaves(save: number): void {
        this.failValues = [];
        this.successValues = [];

        this.simulateRolls(this.totalRolls, (rollResult) => {
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
    }
}