import { Component } from "./component";
import { Vector2 } from "../../math";

/**
 * The transform component is used to store the position, rotation and scale of an entity.
 */
export class Transform extends Component {
	/**
	 * Position of the entity.
	 */
	public position: Vector2 = new Vector2();

	/**
	 * Previous position of the entity. Used for interpolation.
	 */
	public previousPosition: Vector2 = new Vector2();

	/**
	 * Size of the entity.
	 */
	public size: Vector2 = new Vector2();

	/**
	 * Scale of the entity.
	 */
	public scale: Vector2 = new Vector2(1, 1);

	/**
	 * Rotation of the entity.
	 */
	public rotation: number = 0;

	/**
	 * Entity's parent in the hierarchy.
	 */
	public parent: Transform = null;

	/**
	 * Children of the entity.
	 */
	public children: Set<Transform> = new Set();

	/**
	 * Tranlates the entity by the given vector.
	 * @param translation The translation vector.
	 */
	public translate(translation: Vector2): void {
		this.position.x += translation.x;
		this.position.y += translation.y;
	}
}
