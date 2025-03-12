export class RollsGroup {
    allRollSimulationResults: number[] = [];
    successValues: number[] = [];
	successes: number = 0;
    failValues: number[] = [];
	fails: number = 0;
    rolledAOne: number = 0;
    totalRolls: number = 0;

    private performRoll(dieSides: number = 6): number {
        return Math.floor(Math.random() * dieSides) + 1;
    }

    protected simulateRolls(
        rollsAmount: number,
        rollCallback: (rollResult: number) => number | null,
        dieSides: number = 6
    ): number[] {
        this.totalRolls = rollsAmount;
        this.allRollSimulationResults = [];

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

	protected applyModifierToResult(
		modifier: number, 
		rollResult: number, 
		clamped: boolean = true
	): number {
		if (rollResult === 6 || rollResult === 1) {
			return rollResult;
		}
		if (clamped) {
			if (modifier > 1 || modifier < -1) {
				throw new Error(`invalid modifier value: ${modifier}`);
			}
		}
		let modifiedResult: number = rollResult + modifier;
		if (modifiedResult < 1) modifiedResult = 1;
		return modifiedResult;
	}
	protected checkNaturalRollValue (result: number, numberToMatchAgainst: number = 1): number | null {
		if (result === numberToMatchAgainst) {
			return result;
		}
		return null;
	}
}