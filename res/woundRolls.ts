import { RollsGroup } from "./rollgroups";
import { FieldValues } from "./pageData";

export class WoundRolls extends RollsGroup {
    threshold: number;

    constructor(totalHits: number, userInputValues: FieldValues) {
        super();
        this.totalRolls = totalHits;
        this.threshold = this.getWoundThreshold(+userInputValues.str, +userInputValues.tough);

        this.getWoundRollSuccesses();
    }

    getWoundRollSuccesses(): void {
        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {
            if (rollResult >= this.threshold) {
                return rollResult;
            } else {
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