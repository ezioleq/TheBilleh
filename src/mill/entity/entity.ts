import { Component } from "./components/component";
import { Class } from "../utils";
import { Tags } from "./tags";
import { Scene } from "../scene";
import { Random } from "../math";
import { Transform } from "./components/transform";
import { MillEvents, MillEventType } from "../events";

export class Entity {
	private _id: string;

	/**
	 * Name of the entity.
	 */
	public name: string;

	/**
	 * Tag of the entity.
	 */
	public tag: string = Tags.Untagged;

	/**
	 * Scene that this entity is in.
	 */
	public scene: Scene;

	/**
	 * Is the entity active.
	 */
	public active: boolean = true;

	/**
	 * Entity's components.
	 */
	public components: Set<Component> = new Set();

	/**
	 * Entity's transform component.
	 */
	public transform: Transform;

	/**
	 * Construct a new entity with the given name.
	 * @param name Name of the entity.
	 */
	public constructor(name?: string) {
		this._id = Random.generateUid(12);
		this.name = name || "Entity";

		let transform = new Transform();
		this.transform = transform;
		this.addComponent(transform);
	}

	/**
	 * Awake.
	 */
	public awake(): void {
		this.components.forEach(c => c.awake());
	}

	/**
	 * Start.
	 */
	public start(): void {
		this.components.forEach(c => c.start());
	};

	/**
	 * Update.
	 */
	public update(): void {
		this.components.forEach(c => c.update());
	};

	/**
	 * Late update.
	 */
	public lateUpdate(): void {
		this.components.forEach(c => c.lateUpdate());
	}

	/**
	 * Get the entity's id.
	 */
	public get id(): string {
		return this._id;
	}

	/**
	 * Add a component to the entity.
	 * @param component Component to add.
	 * @returns Added component.
	 */
	public addComponent(component: Component): Component {
		component.entity = this;
		this.components.add(component);
		MillEvents.dispatch(MillEventType.EntityComponentAdded, this);
		return component;
	}

	/**
	 * Get a component from the entity.
	 * @param component Component to get.
	 * @returns Component or null if not found.
	 */
	public getComponent<T extends Component>(component: Class<T>): T | null {
		let foundComponent = null;
		// TODO: Do not iterate further components if one's found
		this.components.forEach(c => {
			if (c instanceof component)
				foundComponent = c as T;
		});
		return foundComponent;
	}

	/**
	 * Remove a component from the entity.
	 * @param component Component to remove.
	 * @returns True if the component was removed, false if not.
	 */
	// TODO: Checking if user is trying to delete the Transform component
	public removeComponent<T extends Component>(component: Class<T>): boolean {
		let removed = this.components.delete(this.getComponent(component));
		MillEvents.dispatch(MillEventType.EntityComponentRemoved, this);
		return removed;
	}
}
