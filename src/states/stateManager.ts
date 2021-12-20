import { State } from "./state";

export class StateManager {
	private _state: State;

	constructor(state?: State) {
		this._state = state;
	}

	public setState(state: State) {
		this._state = state;
	}

	public getState() {
		return this._state;
	}
}
