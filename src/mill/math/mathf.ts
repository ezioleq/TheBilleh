/**
 * A set of some mathematical functions.
 */
export class Mathf {
	/**
	 * @param a Start value.
	 * @param b End value.
	 * @param t Progress between 0 and 1.
	 * @returns Interpolated value, equals to `(1 - t) * a + t * b`.
	 */
	public static lerp(a: number, b: number, t: number): number {
		return (1 - t) * a + t * b;
	}

	/**
	 * @param n Value.
	 * @param min Minimum value.
	 * @param max Maximum value.
	 * @returns Value between min and max.
	 */
	public static clamp(n: number, min: number, max: number): number {
		return Math.min(Math.max(n, min), max);
	}
}
