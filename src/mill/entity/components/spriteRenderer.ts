import { Component } from ".";

/**
 * The sprite renderer component is used to render a sprite.
 */
export class SpriteRenderer extends Component {
	private _texture: HTMLImageElement;

	/**
	 * Is the sprite renderer initialized.
	 *
	 * This is used to check if the sprite renderer and its texture is loaded and ready to be used.
	 */
	public initialized: boolean = false;

	/**
	 * Get the sprite renderer's texture.
	 */
	public get texture(): HTMLImageElement {
		return this._texture;
	}

	/**
	 * Set the sprite renderer's texture.
	 */
	public set texture(texture: HTMLImageElement) {
		this._texture = texture;
		this.initialized = true;
	}
}
