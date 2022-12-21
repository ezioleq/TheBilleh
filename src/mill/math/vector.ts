import { Mathf } from "./mathf";

/**
 * Representation of two dimensional vectors and points.
 */
export class Vector2 {
	/**
	 * X component.
	 */
	public x: number;

	/**
	 * Y component.
	 */
	public y: number;

	/** Shorthand for typing `new Vector(0, 0)`. */
	public static readonly zero: Vector2 = new Vector2(0, 0);
	/** Shorthand for typing `new Vector(1, 1)`. */
	public static readonly one: Vector2 = new Vector2(1, 1);
	/** Shorthand for typing `new Vector(0, 1)`. */
	public static readonly up: Vector2 = new Vector2(0, 1);
	/** Shorthand for typing `new Vector(0, -1)`. */
	public static readonly down: Vector2 = new Vector2(0, -1);
	/** Shorthand for typing `new Vector(1, 0)`. */
	public static readonly right: Vector2 = new Vector2(1, 0);
	/** Shorthand for typing `new Vector(-1, 0)`. */
	public static readonly left: Vector2 = new Vector2(-1, 0);

	/**
	 * Constructs a new 2D vector.
	 * @param x X component.
	 * @param y Y component.
	 *
	 * @example
	 * ```
	 * let v = new Vector2();     // v = [0, 0]
	 * let v = new Vector2(1);    // v = [1, 0]
	 * let v = new Vector2(2, 3); // v = [2, 3]
	 * ```
	 */
	public constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	/**
	 * @param a First vector.
	 * @param b Second vector.
	 * @returns Addition of two vectors.
	 */
	public static add(a: Vector2, b: Vector2): Vector2 {
		return new Vector2(
			a.x + b.x,
			a.y + b.y
		);
	}

	/**
	 * @param a First vector.
	 * @param b Second vector.
	 * @returns Subtraction of two vectors.
	 */
	public static sub(a: Vector2, b: Vector2): Vector2 {
		return new Vector2(
			a.x - b.x,
			a.y - b.y
		);
	}

	/**
	 * @param a First vector.
	 * @param b Second vector.
	 * @returns Multiplication of two vectors.
	 */
	public static mul(a: Vector2, b: Vector2): Vector2 {
		return new Vector2(
			a.x * b.x,
			a.y * b.y
		);
	}

	/**
	 * @param a First vector.
	 * @param b Second vector.
	 * @returns Division of two vectors.
	 */
	public static div(a: Vector2, b: Vector2): Vector2 {
		return new Vector2(
			a.x / b.x,
			a.y / b.y
		);
	}

	/**
	 * Use of squared value is significantly faster, because the square root
	 * calculation is a expensive operation.
	 *
	 * @example
	 * ```
	 * if (v.sqrMagnitude() > a * a) {...}
	 * // vs slower equivalent
	 * if (v.magnitude() > a) {...}
	 * ```
	 *
	 * @returns Squared length of this vector.
	 */
	public sqrMagnitude(): number {
		return Math.pow(this.x, 2) + Math.pow(this.y, 2);
	}

	/**
	 * @returns Length of this vector.
	 */
	public magnitude(): number {
		return Math.sqrt(this.sqrMagnitude());
	}

	/**
	 * @returns This vector with a magnitude of 1.
	 */
	public normalize(): Vector2 {
		let magnitude = this.magnitude();
		return new Vector2(
			this.x / magnitude,
			this.y / magnitude
		);
	}

	/**
	 * @param a Left-hand side vector.
	 * @param b Right-hand side vector.
	 * @returns Dot product between two given vectors.
	 */
	public static dot(a: Vector2, b: Vector2): number {
		return a.x * b.x + a.y * b.y;
	}

	/**
	 * @param a First vector.
	 * @param b Second vector.
	 * @returns Distance between two vectors.
	 */
	public static distance(a: Vector2, b: Vector2): number {
		return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
	}

	/**
	 * Linearly interpolate this vector to vector `b` by `t`.
	 *
	 * @example
	 * ```
	 * let a = new Vector2(-1, -1);
	 * let b = new Vector2(1, 1);
	 *
	 * let v = Vector2.lerp(a, b, 0.5); // v = [0, 0] 
	 * ```
	 *
	 * @param a Start position.
	 * @param b End position.
	 * @param t Progress between 0 and 1.
	 * @returns Interpolated position between vectors.
	 */
	public static lerp(a: Vector2, b: Vector2, t: number): Vector2 {
		return new Vector2(
			Mathf.lerp(a.x, b.x, t),
			Mathf.lerp(a.y, b.y, t)
		);
	}
}
