import { RollsGroup } from "./rollgroups";
import { UserInput } from ".././pageData";

export class WoundRolls extends RollsGroup {
    threshold: number;
	woundMod: number;
	devastatingWoundTicked: boolean;
	devastatingWounds: number = 0;

    constructor(totalHits: number, userInputValues: UserInput) {
        super();
		this.woundMod = userInputValues.woundMod;
        this.totalRolls = totalHits;
        this.threshold = this.getWoundThreshold(userInputValues.strength, userInputValues.toughness);
		
		this.devastatingWoundTicked = userInputValues.devastWound;
        this.getWoundRollSuccesses(this.devastatingWoundTicked);
		this.successes = this.successValues.length;
    }

    getWoundRollSuccesses(devastatingWoundTicked: boolean): void {
        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {
			if (devastatingWoundTicked && rollResult === 6) {
				this.devastatingWounds++;
				return rollResult;
			}
			rollResult = this.applyModifierToResult(this.woundMod, rollResult);
            if (rollResult >= this.threshold) {
                return rollResult;
            } else {
                if (rollResult === 1) { 
                    this.rolledAOne++;
                    //console.log("rolled a 1 (wound roll)"); 
                }

                this.failValues.push(rollResult);
                return null;
            }
        });
		this.fails = this.failValues.length;
    }


    private getWoundThreshold(strength: number, toughness: number): number {
		if (strength === 0 && toughness === 0) return 0;
        if (strength >= toughness * 2) return 2;
        if (strength > toughness) return 3;
        if (strength === toughness) return 4;
        if (strength < toughness && strength > toughness / 2) return 5;
        return 6;
    }
}