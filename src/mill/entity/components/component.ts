import { Entity } from "../entity";
import { Random } from "../../math";

export class Component {
	private _id: string;
	public entity: Entity;
	public enabled: boolean;

	public constructor() {
		this._id = Random.generateUid(12);
	}

	public get id(): string {
		return this._id;
	}

	public start(): void {}
	public update(): void {}
	public lateUpdate(): void {}
}
