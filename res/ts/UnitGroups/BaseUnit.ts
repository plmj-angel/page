export interface UnitAttackResults {
	modelsKilled: number;
	modelsRemaining: number;
	attackWoundsRemaining: number;
	lastModelAttackedWounds: number;
}

export class BaseUnitClass {
	unitModels: number;
	woundsPerModel: number;

	constructor (unitModels: number, wounds: number) {
		this.unitModels = unitModels;
		this.woundsPerModel = wounds;
		if (this.woundsPerModel < 0 || this.unitModels < 0) {
			throw new Error("Invalid enemy unit values.");
		}
	}

	protected applyWounds(totalWoundsToApply: number, 
		attackDamage: number,
		modelsInUnit: number = this.unitModels, 
		modelHealth: number = this.woundsPerModel
	): UnitAttackResults {
		let modelsKilled: number = 0;
		let modelsRemaining = modelsInUnit;
		let attackWoundsRemaining = totalWoundsToApply;
		let lastModelAttackedWounds = modelHealth;

		while (attackWoundsRemaining > 0 && modelsRemaining > 0) {
			
			//apply wounds in dmg chuncks
			if (attackWoundsRemaining >= attackDamage) {
				attackWoundsRemaining -= attackDamage;
				lastModelAttackedWounds -= attackDamage;
			} else {
				lastModelAttackedWounds -= attackWoundsRemaining;
				attackWoundsRemaining = 0;
			}

			//handle deaths
			if (lastModelAttackedWounds <= 0) { 
				lastModelAttackedWounds = 0; //lower cap
				lastModelAttackedWounds = modelHealth;
				modelsKilled++;
				modelsRemaining--;
			}
		}
		return {
			modelsKilled, modelsRemaining, attackWoundsRemaining, lastModelAttackedWounds
		};
	}
}