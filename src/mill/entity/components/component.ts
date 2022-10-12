import { Entity } from "../entity";
import { Random } from "../../math";

/**
 * Base class for all components.
 */
export class Component {
	private _id: string;

	/**
	 * Entity that this component is attached to.
	 */
	public entity: Entity;

	/**
	 * Is the component enabled.
	 */
	public enabled: boolean;

	/**
	 * Construct a new component.
	 */
	public constructor() {
		this._id = Random.generateUid(12);
	}

	/**
	 * Returns the component id.
	 * @returns The component id.
	 */
	public get id(): string {
		return this._id;
	}

	/**
	 * Awake.
	 */
	public awake(): void {}

	/**
	 * Start.
	 */
	public start(): void {}

	/**
	 * Update.
	 */
	public update(): void {}

	/**
	 * Late update.
	 */
	public lateUpdate(): void {}
}
