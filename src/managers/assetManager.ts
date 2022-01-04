export class AssetManager {
	private static _instance: AssetManager;

	private textures: Map<string, HTMLImageElement> = new Map();
	private sounds: Map<string, HTMLAudioElement> = new Map();

	public static get Instance(): AssetManager {
		return this._instance || (this._instance = new this());
	}

	public loadTexture(name: string, path: string) {
		let texture: HTMLImageElement = new Image();
		texture.src = path;

		this.textures.set(name, texture);
	}

	public getTexture(name: string): HTMLImageElement {
		return this.textures.get(name);
	}

	public loadSound(name: string, path: string) {
		let sound: HTMLAudioElement = new Audio();
		sound.src = path;

		this.sounds.set(name, sound);
	}

	public getSound(name: string): HTMLAudioElement {
		return this.sounds.get(name);
	}
}

export const Assets = AssetManager.Instance;
