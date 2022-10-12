import { Debug } from "..";
import { Entity } from "../entity";
import { SpriteRenderer, Rigidbody, Collider } from "../entity/components";
import { MillEvents, MillEventType } from "../events";
import { renderer, physics } from "../systems";

/**
 * The scene class is the base class for all scenes.
 */
export class Scene {
	/**
	 * Map of entities in the scene
	 * where the key is the entity id and the value is the entity object.
	 */
	public entities: Map<string, Entity> = new Map();

	/**
	 * Construct a new scene.
	 */
	public constructor() {
		MillEvents.on(MillEventType.EntityAdded, (e: Entity) => {
			e.awake();
			e.start();
		});
	}

	/**
	 * Initialize the scene.
	 */
	public init(): void {}

	/**
	 * Called before start.
	 */
	public awake(): void {
		this.entities.forEach(e => e.awake());
		MillEvents.dispatch(MillEventType.SceneLoaded, this);
	}


	/**
	 * Called after awake.
	 */
	public start(): void {
		this.entities.forEach(e => e.start());
	}

	/**
	 * Called every tick.
	 */
	public update(): void {
		this.entities.forEach(e => {
			if (e.getComponent(Rigidbody) || e.getComponent(Collider))
				physics(e);
		});
		this.entities.forEach(e => e.update());
	}

	/**
	 * Called every tick after the update.
	 */
	public lateUpdate(): void {
		this.entities.forEach(e => e.lateUpdate());
	}

	/**
	 * Called every frame.
	 * @param step Step between the previous and current frame. Used for interpolation.
	 */
	public draw(step: number): void {
		// TODO: There is no EntityQuery moment
		this.entities.forEach(e => {
			let sr = e.getComponent(SpriteRenderer);
			if (sr && sr.initialized) {
				renderer(e, step);
			}
		});
		Debug.draw();
	}

	/**
	 * Add an entity to the scene.
	 * @param entity Entity to add.
	 */
	public addEntity(entity: Entity) {
		entity.scene = this;
		this.entities.set(entity.id, entity);
		MillEvents.dispatch(MillEventType.EntityAdded, entity);
	}

	/**
	 * Create a new entity and add it to the scene.
	 * @param name Name of the entity.
	 * @returns The created entity.
	 */
	public createEntity(name?: string): Entity {
		let e = new Entity(name);
		this.addEntity(e);
		return e;
	}

	/**
	 * Remove an entity from the scene.
	 * @param entity Entity to remove.
	 */
	public destroyEntity(entity: Entity) {
		this.entities.delete(entity.id);
		MillEvents.dispatch(MillEventType.EntityDestroyed);
	}

	/**
	 * Get all entities in the scene.
	 * @returns Array of all entities in the scene.
	 */
	public getEntities(): Array<Entity> {
		return Array.from(this.entities.values());
	}

	/**
	 * Get an entity by its id.
	 * @param id Id of the entity.
	 * @returns The entity with the given id or
	 * undefined if no entity with the given id was found.
	 */
	public getEntityById(id: string): Entity | undefined {
		return this.entities.get(id);
	}

	/**
	 * Get an entity by its name.
	 * @param name Name of the entity.
	 * @returns The entity with the given name or
	 * undefined if no entity with the given name was found.
	 */
	public getEntityByName(name: string): Entity {
		return this.getEntitiesByName(name)[0];
	}

	/**
	 * Get all entities with the given name.
	 * @param name Name of the entities.
	 * @returns Array of all entities with the given name.
	 */
	public getEntitiesByName(name: string): Array<Entity> {
		return Array.from(this.entities.values()).filter(e => e.name === name);
	}
}
