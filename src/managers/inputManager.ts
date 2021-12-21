export class InputManager {
	private static _instance: InputManager;
	private keys: { [k: string]: boolean } = {};

	private constructor() {
		window.addEventListener('keydown', (e) => {
			this.keys[e.key.toLowerCase()] = true;
		});

		window.addEventListener('keyup', (e) => {
			this.keys[e.key.toLowerCase()] = false;
		});
	}

	public static get Instance(): InputManager {
		return this._instance || (this._instance = new this());
	}

	public pressed(key: string): boolean {
		return this.keys[key];
	}

	public any(): boolean {
		return Object.values(this.keys).some((e) => e === true);
	}
}

export const Input = InputManager.Instance;
