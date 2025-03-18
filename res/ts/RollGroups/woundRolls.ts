import { RollsGroup } from "./rollgroups";
import { UserInput } from ".././pageData";

export class WoundRolls extends RollsGroup {
    threshold: number;
	woundMod: number;
	devastatingWoundTicked: boolean;
	devastatingWounds: number = 0;
	lethalHits: number = 0;

    constructor(totalHits: number, automaticSuccesses: number, userInputValues: UserInput) {
        super();
		this.lethalHits = automaticSuccesses;
		this.woundMod = userInputValues.woundMod;
        this.threshold = this.getWoundThreshold(userInputValues.strength, userInputValues.toughness);
		
        this.totalRolls = totalHits;
		if (this.lethalHits > 0) this.totalRolls -= this.lethalHits;
		if (this.totalRolls < 0) {
			throw new Error (`Somehow angel messed up the code and the wound roll is attempting to roll a negative ammount. ${this.totalRolls} to be precise...`);
		}
		
		this.devastatingWoundTicked = userInputValues.devastWound;
        this.getWoundRollSuccesses(this.devastatingWoundTicked, this.lethalHits);
		this.totalFails = this.failValues.length;
		this.successValuesLength = this.successValues.length;
		this.failValuesLength = this.failValues.length;

		this.totalSuccesses = this.successValuesLength;
		this.totalSuccesses += this.lethalHits;
		this.totalSuccesses += this.devastatingWounds;
    }

    getWoundRollSuccesses(devastatingWoundTicked: boolean, lethalHits: number): void {
        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {
			if (devastatingWoundTicked && rollResult === 6) {
				this.devastatingWounds++;
				return null;
			}
			rollResult = this.applyModifierToResult(this.woundMod, rollResult);
            if (rollResult >= this.threshold) {
                return rollResult;
            } else {
                if (rollResult === 1) { 
                    this.rolledAOne++;
                }

                this.failValues.push(rollResult);
                return null;
            }
        });
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