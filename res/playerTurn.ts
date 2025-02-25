import { FieldValues } from "./pageData";

export class TurnManager {
	mainModels: number;
	mainModelWounds: number;
	additionalModels: number;
	additionalModelWounds: number;
	leaderWounds: number;

	constructor (userInputValues: FieldValues) {
		this.mainModels = +userInputValues.defModels || 0;
		this.mainModelWounds = +userInputValues.wounds || 0;
		this.additionalModels = +userInputValues.addUnits || 0;
		this.additionalModelWounds = +userInputValues.addUnitsWounds || 0;
		this.leaderWounds = +userInputValues.leaderWounds || 0;

		if (this.leaderWounds < 0 || 
			this.mainModelWounds < 0 || 
			this.additionalModelWounds < 0 || 
			this.mainModels < 0 || 
			this.additionalModels < 0
		) {
			throw new Error("Invalid enemy unit values.");
		}
	}

	applyWoundsToMainUnit(wounds: number, models: number, damage: number): {
		woundsRemaining: number, 
		modelsRemaining: number, 
		lastModelRemainingWounds: number, 
		modelsKilled: number
	} {
		let woundsRemaining = wounds;
		let modelsRemaining = models;
		let lastModelRemainingWounds = wounds;

		console.log(`before: ${woundsRemaining} & ${lastModelRemainingWounds}`)

		let modelsKilled: number = this.applyWounds(woundsRemaining, modelsRemaining, damage, lastModelRemainingWounds);

		return { modelsKilled, modelsRemaining, woundsRemaining, lastModelRemainingWounds }

	}

	private applyWounds(totalWounds: number, 
		modelsInUnit: number, 
		attackDamage: number,
		modelHealth: number
	): number {
		let modelsKilled: number = 0;

		while (totalWounds > 0 && modelsInUnit > 0) {
			//apply wounds in dmg chuncks
			if (totalWounds >= attackDamage) {
				totalWounds -= attackDamage;
				modelHealth -= attackDamage;
			} else {
				modelHealth -= totalWounds;
				totalWounds = 0;
			}

			//handle deaths
			if (modelHealth <= 0) { 
				modelHealth = 0; //lower cap
				modelsKilled++;
				modelsInUnit--;
			}
		}
		return modelsKilled;
	}
}