import { Vector2 } from ".";

/**
 * Representation of an rectangle
 */
export class Rect {
	public x: number;
	public y: number;
	public w: number;
	public h: number;

	/**
	 * Constructs a new Rect
	 * @param x X component
	 * @param y Y component
	 * @param w Width
	 * @param h Height
	 */
	public constructor(x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	/**
	 * @returns Left side of this rectangle
	 */
	public get left(): number {
		return this.x;
	}

	/**
	 * @returns Right side of this rectangle
	 */
	public get right(): number {
		return this.x + this.w;
	}

	/**
	 * @returns Top side of this rectangle
	 */
	public get top(): number {
		return this.y;
	}

	/**
	 * @returns Bottom side of this rectangle
	 */
	public get bottom(): number {
		return this.y + this.h;
	}

	public get halfSize(): Vector2 {
		return new Vector2(
			this.w / 2,
			this.h / 2
		);
	}

	/**
	 * @drawing
	 * ```
	 * +---------+
	 * |  a  +---|-----+
	 * |     | i |     |
	 * +-----|---+  b  |
	 *       +---------+
	 * // a - this rect
	 * // b - other rect
	 * // i - intersection, if it happens then this method returns true,
	 * // if not then obviously it's false
	 * ```
	 * @param other Other rectangle to check
	 * @returns True when intersecting, false when not
	 */
	public intersects(other: Rect): boolean {
		return !(
			other.left > this.right ||
			other.right < this.left ||
			other.top > this.bottom ||
			other.bottom < this.top
		);
	}
}
