import { UserInput } from "./pageData";
import { HitRolls } from "./RollGroups/hitRolls";
import { WoundRolls } from "./RollGroups/woundRolls";
import { SaveRolls } from "./RollGroups/saveRolls";

export class TurnManager {
	hitRolls: HitRolls;
	woundRolls: WoundRolls;
	saveRolls: SaveRolls;
	woundsToRoll: number;
	additionalSaveRolls: number;
	damageOutput: number = 0;


	constructor(formData: UserInput) {
		this.hitRolls = new HitRolls(formData);
		this.woundsToRoll = this.hitRolls.totalSuccesses;
		this.additionalSaveRolls = this.hitRolls.lethalHits;
		//space for more hit rolls stuffs

		this.woundRolls = new WoundRolls(this.hitRolls.totalSuccesses, formData);
		//space for more wound rolls stuffs


		this.saveRolls = new SaveRolls(this.woundRolls.totalSuccesses, formData);
		this.damageOutput = this.saveRolls.totalFails + this.woundRolls.devastatingWounds;
		//space for more save rolls stuffs	
	} 

}