import { RollsGroup } from "./rollgroups";
import { UserInput } from ".././pageData";

export class HitRolls extends RollsGroup {
	hitModifier: number;
	lethalHitTicked: boolean;
	lethalHits: number = 0;

    constructor(userInputValues: UserInput) {
        super();
		this.hitModifier = userInputValues.hitMod;
        this.totalRolls = userInputValues.attackModels * userInputValues.attacks;
        this.rolledAOne = 0;

		this.lethalHitTicked = userInputValues.lethalHit;
        this.getHitRolls(+userInputValues.skill, this.lethalHitTicked);
		this.successes = this.successValues.length;
		this.successes += this.lethalHits;
    }

    getHitRolls(skill: number, lethalHit:boolean): void {
        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {
			if (lethalHit && rollResult === 6) {
				this.lethalHits++;
				return null;
			}
			let modifiedRollResult = this.applyModifierToResult(this.hitModifier, rollResult);
            if (modifiedRollResult === 1) {
                this.rolledAOne++;
                this.failValues.push(modifiedRollResult);
                return null;
            }

            if (modifiedRollResult >= skill) {
                return modifiedRollResult;
            } else {
                this.failValues.push(modifiedRollResult);
                return null;
            }
        });
		this.fails = this.failValues.length;
    }
}