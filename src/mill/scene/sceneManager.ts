import { Scene } from ".";

export class SceneManager {
	private static _instance: SceneManager;
	private _currentScene: Scene;

	public static get Instance(): SceneManager {
		return this._instance || (this._instance = new this());
	}

	public get current() {
		return this._currentScene;
	}

	public set current(scene: Scene) {
		this._currentScene = scene;
		scene.awake();
	}
}

export const SceneEngine = SceneManager.Instance;
