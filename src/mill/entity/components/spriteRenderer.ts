import { Component } from ".";

export class SpriteRenderer extends Component {
	private _texture: HTMLImageElement;
	public initialized: boolean = false;

	public get texture(): HTMLImageElement {
		return this._texture;
	}

	public set texture(texture: HTMLImageElement) {
		this._texture = texture;
		this.initialized = true;
	}
}
