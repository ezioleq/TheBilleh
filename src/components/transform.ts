import { Vector2 } from "../math/vector";

export class Transform {
	position: Vector2;
	size: Vector2;
	scale: Vector2;
	rotation: number;

	constructor(x: number, y: number, w: number, h: number) {
		this.position = new Vector2(x, y);
		this.size = new Vector2(w, h);
		this.scale = new Vector2(1, 1);
		this.rotation = 0;
	}

	set_position(x: number, y: number) {
		this.position.x = x;
		this.position.y = y;
	}

	set_size(x: number, y: number) {
		this.size.x = x;
		this.size.y = y;
	}

	set_scale(x: number, y: number) {
		this.scale.x = x;
		this.scale.y = y;
	}

	rotate(n: number) {
		this.rotation += n;
	}
}
