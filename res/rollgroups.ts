import { FieldValues } from "./pageData";

export class RollsGroup {
	totalRolls: number = 0;
	allRollSimulationResults: number[] = [];
	successValues: number[] = [];
	failValues: number[] = [];
	rolledAOne: number = 0;

	private performRoll(dieSides: number = 6): number {
		return Math.floor(Math.random() * dieSides) + 1;
	}

	protected simulateRolls(
		rollsAmount: number,
		rollCallback: (rollResult: number) => number | null,
		dieSides: number = 6
	): number[] {
		const simulationResults: number[] = [];
		for (let i = 0; i < rollsAmount; i++) {
			const rollResult = this.performRoll(dieSides);
			this.allRollSimulationResults.push(rollResult);
			const result = rollCallback(rollResult);
			if (result !== null) {
				simulationResults.push(result);
			}
		}
		return simulationResults;
	}
}

export class HitRolls extends RollsGroup {
    constructor(pageValues: FieldValues) {
        super();
        this.totalRolls = +pageValues.models * +pageValues.attacks;
		this.getHitRolls(+pageValues.skill);
    }

    getHitRolls(skill: number): void {
        this.successValues = this.simulateRolls(this.totalRolls, (rollResult) => {
            if (rollResult >= skill) {
				return rollResult; 
			} else {
				if (rollResult === 1) {
					this.rolledAOne++;
					console.log("rolled a 1");
				}
				this.failValues.push(rollResult);
				return null;
			}
        });
    }
}

export class WoundRolls extends RollsGroup {
    threshold: number = 0;

    constructor(totalHits: number, pageValues: FieldValues) {
        super();
        this.totalRolls = totalHits;
        this.threshold = this.getWoundThreshold(+pageValues.str, +pageValues.tough);

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
        if (strength >= toughness * 2) return 2;
        if (strength > toughness) return 3;
        if (strength === toughness) return 4;
        if (strength < toughness && strength > toughness / 2) return 5;
        return 6;
    }
}

export class SaveRolls extends RollsGroup {
    constructor(totalWounds: number, pageValues: FieldValues) { 
        super();
        this.totalRolls = totalWounds;

        this.rollSaves(+pageValues.save);
    }

    rollSaves(save: number): void {
        this.failValues = [];
        this.successValues = [];

        this.simulateRolls(this.totalRolls, (rollResult) => {
            if (rollResult === 1) {
                this.rolledAOne++;
                console.log("rolled a 1 (save roll)");
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