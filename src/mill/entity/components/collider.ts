import { Component } from ".";
import { Rect, Vector2 } from "../..";

/**
 * Collider component is used to detect collisions between entities.
 */
export class Collider extends Component {
	/**
	 * The collider offset.
	 */
	public offset: Vector2 = new Vector2();

	/**
	 * The collider size.
	 */
	public size: Vector2 = new Vector2();

	/**
	 * Is the collider a trigger.
	 */
	public isTrigger: boolean = false;

	/**
	 * Returns the collider bounds.
	 * @returns The collider bounds.
	 */
	public get rect(): Rect {
		return new Rect(
			this.entity.transform.position.x + this.offset.x,
			this.entity.transform.position.y + this.offset.y,
			this.size.x,
			this.size.y
		);
	}
}
