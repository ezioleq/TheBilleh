export class Rect {
	x: number;
	y: number;
	w: number;
	h: number;

	constructor(x: number, y: number, w: number, h: number) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	left(): number {
		return this.x;
	}

	right(): number {
		return this.x + this.w;
	}

	top(): number {
		return this.y;
	}

	bottom(): number {
		return this.y + this.h;
	}

	intersects(other: Rect): boolean {
		return !(
			other.left() > this.right() ||
			other.right() < this.left() ||
			other.top() > this.bottom() ||
			other.bottom() < this.top()
		);
	}
}
