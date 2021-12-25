/**
 * See [easings.net](https://easings.net/)
 */
export class Easings {
	public static easeInSine(x: number): number {
		return 1 - Math.cos((x * Math.PI) / 2);
	}

	public static easeOutSine(x: number): number {
		return Math.sin((x * Math.PI) / 2);
	}

	public static easeInOutSine(x: number): number {
		return -(Math.cos(Math.PI * x) - 1) / 2;
	}

	public static easeInQuad(x: number): number {
		return x * x;
	}

	public static easeOutQuad(x: number): number {
		return 1 - (1 - x) * (1 - x);
	}

	public static easeInOutQuad(x: number): number {
		return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
	}

	public static easeInQuart(x: number): number {
		return x * x * x * x;
	}

	public static easeOutQuart(x: number): number {
		return 1 - Math.pow(1 - x, 4);
	}

	public static easeInOutQuart(x: number): number {
		return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
	}

	public static easeInBack(x: number): number {
		const c1 = 1.70158;
		const c3 = c1 + 1;

		return c3 * x * x * x - c1 * x * x;
	}

	public static easeOutBack(x: number): number {
		const c1 = 1.70158;
		const c3 = c1 + 1;

		return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
	}

	public static easeInOutBack(x: number): number {
		const c1 = 1.70158;
		const c2 = c1 * 1.525;

		return x < 0.5
			? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
			: (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
	}

	public static easeInBounce(x: number): number {
		return 1 - Easings.easeOutBounce(1 - x);
	}

	public static easeOutBounce(x: number): number {
		const n1 = 7.5625;
		const d1 = 2.75;

		if (x < 1 / d1) {
			return n1 * x * x;
		} else if (x < 2 / d1) {
			return n1 * (x -= 1.5 / d1) * x + 0.75;
		} else if (x < 2.5 / d1) {
			return n1 * (x -= 2.25 / d1) * x + 0.9375;
		} else {
			return n1 * (x -= 2.625 / d1) * x + 0.984375;
		}
	}

	public static easeInOutBounce(x: number): number {
		return x < 0.5
			? (1 - Easings.easeOutBounce(1 - 2 * x)) / 2
			: (1 + Easings.easeOutBounce(2 * x - 1)) / 2;
	}
}
