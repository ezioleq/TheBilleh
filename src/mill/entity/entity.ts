import { Component } from "./components/component";
import { Class } from "../utils";
import { Tags } from "./tags";
import { Scene } from "../scene";
import { Random } from "../math";
import { Transform } from "./components/transform";

export class Entity {
	private _id: string;
	public name: string;
	public tag: string = Tags.Untagged;
	public scene: Scene;
	public active: boolean = true;
	public components: Set<Component> = new Set();
	public transform: Transform;

	public constructor(name?: string) {
		this._id = Random.generateUid(12);
		this.name = name || "Entity";

		let transform = new Transform();
		this.transform = transform;
		this.addComponent(transform);
	}

	public start(): void {
		this.components.forEach(c => {
			c.start();
		});
	};

	public update(): void {
		this.components.forEach(c => {
			c.update();
		});
	};

	public lateUpdate(): void {
		this.components.forEach(c => {
			c.lateUpdate();
		});
	}

	public get id(): string {
		return this._id;
	}

	public addComponent(component: Component): Component {
		component.entity = this;
		this.components.add(component);
		return component;
	}

	public getComponent<T extends Component>(component: Class<T>): T | null {
		let foundComponent = null;
		// TODO: Do not iterate further components if one's found
		this.components.forEach(c => {
			if (c instanceof component)
				foundComponent = c as T;
		});
		return foundComponent;
	}

	// TODO: Checking if user is trying to delete the Transform component
	public removeComponent<T extends Component>(component: Class<T>): boolean {
		return this.components.delete(this.getComponent(component));
	}
}
