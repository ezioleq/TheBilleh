/**
 * Asset manager is responsible for loading and managing assets of the game.
 */
export class AssetManager {
	private static _instance: AssetManager;

	private textures: Map<string, HTMLImageElement> = new Map();
	private sounds: Map<string, HTMLAudioElement> = new Map();

	/**
	 * Get instance of the AssetManager.
	 */
	public static get Instance(): AssetManager {
		return this._instance || (this._instance = new this());
	}

	/**
	 * Load a texture with a given name.
	 * @param name Name of the texture.
	 * @param path Path to the texture file.
	 */
	public loadTexture(name: string, path: string) {
		let texture: HTMLImageElement = new Image();
		texture.src = path;

		this.textures.set(name, texture);
	}

	/**
	 * Get a texture with the given name.
	 * @param name Name of the texture.
	 * @returns Texture with the given name or undefined if not found.
	 */
	public getTexture(name: string): HTMLImageElement | undefined {
		return this.textures.get(name);
	}

	/**
	 * Load a sound with a given name.
	 * @param name Name of the sound.
	 * @param path Path to the sound file.
	 */
	public loadSound(name: string, path: string) {
		let sound: HTMLAudioElement = new Audio();
		sound.src = path;

		this.sounds.set(name, sound);
	}

	/**
	 * Get a sound with the given name.
	 * @param name Name of the sound.
	 * @returns Sound with the given name or undefined if not found.
	 */
	public getSound(name: string): HTMLAudioElement | undefined {
		return this.sounds.get(name);
	}
}

/** Global engine asset manager. */
export const Assets = AssetManager.Instance;
