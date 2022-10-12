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

	/**
	 * Get instance of the InputManager.
	 */
	public static get Instance(): InputManager {
		return this._instance || (this._instance = new this());
	}

	/**
	 * Check if given key is pressed.
	 * @param key Key to check.
	 * @returns True when key is pressed, false when not.
	 */
	public pressed(key: string): boolean {
		return this.keys.get(key);
	}

	/**
	 * Check if any key is pressed.
	 * @returns True when any key is pressed, false when not.
	 */
	public any(): boolean {
		return Array.from(this.keys.values()).some(e => e === true);
	}
}

/** Global engine input manager. */
export const Input = InputManager.Instance;
