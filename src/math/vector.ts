export class Vector2 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	magnitude() {
		return Math.sqrt(
			Math.pow(this.x, 2) + Math.pow(this.y, 2)
		);
	}

	normalize() {
		return new Vector2(
			this.x / this.magnitude(),
			this.y / this.magnitude()
		);
	}
}
