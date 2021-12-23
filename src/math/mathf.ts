export class Mathf {
	public static lerp(a: number, b: number, t: number) {
		return (1 - t) * a + t * b;
	}

	public static clamp(n: number, min: number, max: number) {
		return Math.min(Math.max(n, min), max);
	}
}
