import { RollsGroup } from "./rollgroups";
import { UserInput } from ".././pageData";

export class HitRolls extends RollsGroup {
	hitModifier: number;

    constructor(userInputValues: UserInput) {
        super();
		this.hitModifier = userInputValues.hitMod;
        this.totalRolls = userInputValues.attackModels * userInputValues.attacks;
        this.rolledAOne = 0;

        this.getHitRolls(+userInputValues.skill);
		this.successes = this.successValues.length;
    }

    getHitRolls(skill: number): void {
        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {
			rollResult = this.applyModifierToResult(this.hitModifier, rollResult);
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
		this.fails = this.failValues.length;
    }
}