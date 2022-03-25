export class InputManager {
	private static _instance: InputManager;
	private keys: Map<string, boolean> = new Map();

	private constructor() {
		window.addEventListener('keydown', (e) => {
			this.keys.set(e.key.toLowerCase(), true);
		});

		window.addEventListener('keyup', (e) => {
			this.keys.set(e.key.toLowerCase(), false);
		});
	}

	public static get Instance(): InputManager {
		return this._instance || (this._instance = new this());
	}

	public pressed(key: string): boolean {
		return this.keys.get(key);
	}

	public any(): boolean {
		return Array.from(this.keys.values()).some(e => e === true);
	}
}

export const Input = InputManager.Instance;
