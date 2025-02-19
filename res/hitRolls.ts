import { RollsGroup } from "./rollgroups";
import { FieldValues } from "./pageData";

export class HitRolls extends RollsGroup {
    constructor(userInputValues: FieldValues) {
        super();
        this.totalRolls = +userInputValues.models * +userInputValues.attacks;
        this.rolledAOne = 0;

        this.getHitRolls(+userInputValues.skill);
    }

    getHitRolls(skill: number): void {
        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {
            if (rollResult === 1) {
                this.rolledAOne++;
                //console.log("rolled a 1");
                this.failValues.push(rollResult);
                return null;
            }

            if (rollResult >= skill) {
                return rollResult;
            } else {
                this.failValues.push(rollResult);
                return null;
            }
        });
    }
}