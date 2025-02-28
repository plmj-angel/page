import { RollsGroup } from "./rollgroups";
import { FieldValues } from ".././pageData";

export class WoundRolls extends RollsGroup {
    threshold: number;
	woundMod: number;

    constructor(totalHits: number, userInputValues: FieldValues) {
        super();
		this.woundMod = +userInputValues.woundMod;
        this.totalRolls = totalHits;
        this.threshold = this.getWoundThreshold(+userInputValues.str, +userInputValues.tough);

        this.getWoundRollSuccesses();
		this.successes = this.successValues.length;
    }

    getWoundRollSuccesses(): void {
        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {
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