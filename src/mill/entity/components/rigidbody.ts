import { Component } from ".";
import { Vector2 } from "../..";

/**
 * The rigidbody component is used to apply forces to an entity and detect collisions.
 */
export class Rigidbody extends Component {
	/**
	 * The rigidbody velocity.
	 */
	public velocity: Vector2 = new Vector2();

	/**
	 * The rigidbody acceleration.
	 */
	public acceleration: Vector2 = new Vector2();

	/**
	 * Gravity should be applied to the rigidbody.
	 */
	public useGravity: boolean = true;

	/**
	 * Friction of the rigidbody.
	 */
	public friction: number = 1;

	/**
	 * Add force to the rigidbody.
	 * @param force The force to apply.
	 */
	public addForce(force: Vector2): void {
		this.acceleration.x += force.x;
		this.acceleration.y += force.y;
	}
}
