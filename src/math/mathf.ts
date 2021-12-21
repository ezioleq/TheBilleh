export class Mathf {
	public static lerp(a: number, b: number, t: number) {
		return (1 - t) * a + t * b;
	}
}
