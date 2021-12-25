export class AssetManager {
	private static _instance: AssetManager;

	private textures: { [k: string]: HTMLImageElement } = {};
	private sounds: { [k: string]: HTMLAudioElement } = {};

	public static get Instance(): AssetManager {
		return this._instance || (this._instance = new this());
	}

	public loadTexture(name: string, path: string) {
		let texture: HTMLImageElement = new Image();
		texture.src = path;

		this.textures[name] = texture;
	}

	public getTexture(name: string): HTMLImageElement {
		return this.textures[name];
	}

	public loadSound(name: string, path: string) {
		let sound: HTMLAudioElement = new Audio();
		sound.src = path;

		this.sounds[name] = sound;
	}

	public getSound(name: string): HTMLAudioElement {
		return this.sounds[name];
	}
}

export const Assets = AssetManager.Instance;
