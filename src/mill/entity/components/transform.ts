import { Component } from "./component";
import { Vector2 } from "../../math";

export class Transform extends Component {
	public position: Vector2 = new Vector2();
	public previousPosition: Vector2 = new Vector2();
	public size: Vector2 = new Vector2();
	public scale: Vector2 = new Vector2(1, 1);
	public rotation: number = 0;

	public parent: Transform = null;
	public childs: Set<Transform> = new Set();

	public override start() {
		this.updatePreviousPosition();
	}

	public override update() {
		this.updatePreviousPosition();
	}

	private updatePreviousPosition() {
		Object.assign(this.previousPosition, this.position);
	}

	public translate(translation: Vector2): void {
		this.position.x += translation.x;
		this.position.y += translation.y;
	}
}
