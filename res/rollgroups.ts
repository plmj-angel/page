export class RollsGroup {
    allRollSimulationResults: number[] = [];
    successValues: number[] = [];
    failValues: number[] = [];
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
}