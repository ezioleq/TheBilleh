export class Vector2 {
	x: number;
	y: number;

	static readonly zero: Vector2 = new Vector2(0, 0);
	static readonly one: Vector2 = new Vector2(1, 1);
	static readonly up: Vector2 = new Vector2(0, 1);
	static readonly down: Vector2 = new Vector2(0, -1);
	static readonly right: Vector2 = new Vector2(1, 0);
	static readonly left: Vector2 = new Vector2(-1, 0);

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	// There is no operator overloading section
	add(b: Vector2): Vector2 {
		this.x += b.x;
		this.y += b.y;
		return this;
	}

	sub(b: Vector2): Vector2 {
		this.x -= b.x;
		this.y -= b.y;
		return this;
	}

	mul(b: Vector2): Vector2 {
		this.x *= b.x;
		this.y *= b.y;
		return this;
	}

	div(b: Vector2): Vector2 {
		this.x /= b.x;
		this.y /= b.y;
		return this;
	}

	magnitude() {
		return Math.sqrt(
			Math.pow(this.x, 2) + Math.pow(this.y, 2)
		);
	}

	normalize() {
		let magnitude = this.magnitude();
		return new Vector2(
			this.x / magnitude,
			this.y / magnitude
		);
	}

	dot(b: Vector2) {
		return this.x * b.x + this.y * b.y;
	}

	// Untested, may explode
	move_towards(target: Vector2, max_distance_delta: number): Vector2 {
		let a: Vector2 = new Vector2(this.x - target.x, this.y - target.y);
		let magnitude = a.magnitude();

		if (magnitude <= max_distance_delta || magnitude === 0)
			return target;
		
		// Help
		return new Vector2(this.x, this.y).add(
			new Vector2(a.x / magnitude, a.y / magnitude)
		).mul(
			new Vector2(max_distance_delta, max_distance_delta)
		);
	}
}
