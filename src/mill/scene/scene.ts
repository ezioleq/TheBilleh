import { Game } from "../game"
import { Entity } from "../entity";
import { SpriteRenderer } from "../entity/components";
import { MillEvents, MillEventType } from "../events";

export class Scene {
	public entities: Map<string, Entity> = new Map();

	constructor() {

	}

	public awake(): void {
		MillEvents.dispatch(MillEventType.SceneLoaded, this);
	}

	public start(): void {
		this.entities.forEach(e => {
			e.start();
		});
	}

	public update(): void {
		this.entities.forEach(e => {
			e.update();
		})
	}

	public lateUpdate(): void {
		this.entities.forEach(e => {
			e.lateUpdate();
		})
	}

	public draw(): void {
		// There is no EntityQuery moment
		this.entities.forEach(e => {
			let sr = e.getComponent(SpriteRenderer);
			if (sr && sr.initialized) {
				Game.ctx.drawImage(
					sr.texture,
					e.transform.position.x,
					e.transform.position.y,
					e.transform.size.x,
					e.transform.size.y
				);
			}
		});
	}

	public addEntity(entity: Entity) {
		entity.scene = this;
		this.entities.set(entity.id, entity);
		MillEvents.dispatch(MillEventType.EntityAdded, entity);
	}

	public createEntity(name?: string): Entity {
		let e = new Entity(name);
		this.addEntity(e);
		return e;
	}

	public destroyEntity(entity: Entity) {
		this.entities.delete(entity.id);
		MillEvents.dispatch(MillEventType.EntityDestroyed);
	}

	public getEntities(): Array<Entity> {
		return Array.from(this.entities.values());
	}

	public getEntityById(id: string): Entity {
		return this.entities.get(id);
	}

	public getEntityByName(name: string): Entity {
		return this.getEntitiesByName(name)[0];
	}

	public getEntitiesByName(name: string): Array<Entity> {
		return Array.from(this.entities.values()).filter(e => e.name === name);
	}
}
