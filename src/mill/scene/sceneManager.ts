import { Scene } from ".";

/**
 * Scene manager.
 *
 * Manages which scene is currently active.
 */
export class SceneManager {
	private static _instance: SceneManager;
	private _currentScene: Scene;

	/**
	 * Get instance of the SceneManager.
	 */
	public static get Instance(): SceneManager {
		return this._instance || (this._instance = new this());
	}

	/**
	 * Get the current scene.
	 * @returns The current active scene.
	 */
	public get current(): Scene {
		return this._currentScene;
	}

	/**
	 * Set the current scene.
	 * @param scene The scene to set as the current one.
	 */
	public set current(scene: Scene) {
		scene.init();
		this._currentScene = scene;
		scene.awake();
	}
}

/** Global engine scene manager. */
export const SceneEngine = SceneManager.Instance;
