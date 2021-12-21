import { State } from "../states/state";

export class StateManager {
	private _currentState: State;

	constructor(state?: State) {
		this._currentState = state;
	}

	public get currentState() {
		return this._currentState;
	}

	public set currentState(state: State) {
		this._currentState = state;
	}
}
