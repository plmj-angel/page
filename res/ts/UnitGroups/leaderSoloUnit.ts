import { UserInput } from "../pageData";
import { BaseUnitClass } from "./BaseUnit";

interface LeaderResults {
	leaderKilled: boolean;
	leaderWoundsRemaining: number;
}


export class LeaderUnitClass extends BaseUnitClass {
	isLeaderPresent: boolean;

	constructor(userInput: UserInput) {
		super(1, userInput.leaderWounds);
		this.isLeaderPresent = userInput.leaderWounds > 0;
	}

	public applyWoundsToUnit(woundsToApply: number, damage: number): LeaderResults {
		const result = this.applyWounds(woundsToApply, damage);



		let leaderKilled: boolean = result.modelsRemaining === 0;
		let leaderWoundsRemaining: number = result.lastModelAttackedWounds;
		return { leaderKilled, leaderWoundsRemaining }
	}

	public hasALeader(leaderWounds: number): boolean {
		if (typeof leaderWounds === undefined){
			throw new Error(`someting went wrong uwu`);
		}
		return leaderWounds > 0;
	}
}