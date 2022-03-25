import { Component } from ".";
import { Vector2 } from "../..";

export class Rigidbody extends Component {
	public velocity: Vector2 = new Vector2();
	public acceleration: Vector2 = new Vector2();
	public useGravity: boolean = true;
	public friction: number = 1;

	public addForce(force: Vector2) {
		this.acceleration.x += force.x;
		this.acceleration.y += force.y;
	}
}
