import { Component } from ".";
import { Rect, Vector2 } from "../..";

export class Collider extends Component {
	public offset: Vector2 = new Vector2();
	public size: Vector2 = new Vector2();
	public isTrigger: boolean = false;

	public get rect() {
		return new Rect(
			this.entity.transform.position.x + this.offset.x,
			this.entity.transform.position.y + this.offset.y,
			this.size.x,
			this.size.y
		);
	}
}
