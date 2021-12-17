import { Vector2 } from "../math/vector";

export class Transform {
	position: Vector2;
	scale: Vector2;

	constructor(x: number, y: number, w: number, h: number) {
		this.position = new Vector2(x, y);
		this.scale = new Vector2(w, h);
	}
}
