import { State } from "../states/state";

export class StateManager {
	private static _instance: StateManager;
	private _currentState: State;
	public data: Map<string, unknown> = new Map();

	constructor(state?: State) {
		this._currentState = state;
	}

	public static get Instance(): StateManager {
		return this._instance || (this._instance = new this());
	}

	public get current() {
		return this._currentState;
	}

	public set current(state: State) {
		this._currentState = state;
	}
}

export const GlobalState = StateManager.Instance;
