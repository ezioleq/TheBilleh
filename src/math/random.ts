import seedrandom from "seedrandom";

/**
 * Module for generating pseudorandom data
 */
export class Random {
	private static prng = seedrandom();

	/**
	 * Set the generator seed
	 * @param seed seed
	 */
	public static setSeed(seed: string) {
		Random.prng = seedrandom(seed);
	}

	/**
	 * @returns Next pseudorandom value in a range of 0 and 1
	 */
	public static next(): number {
		return Random.prng();
	}

	/**
	 * @returns Next pseudorandom integer value in a range of signed int32
	 */
	public static int32(): number {
		return Random.prng.int32();
	}

	/**
	 * Only 32 bits of randomness in a float.
	 * @returns Next pseudorandom value in a range of 0 an 1
	 */
	public static quick(): number {
		return Random.prng.quick();
	}

	/**
	 * @param min Minimum value
	 * @param max Maximum value
	 * @returns Pseudorandom number in a range of min and max
	 */
	public static range(min: number, max: number): number {
		return Math.floor(Random.next() * (max - min + 1) + min);
	}

	/**
	 * @param choices Array of elements to choose from
	 * @returns Pseudorandom element from the given array
	 */
	public static choose<T>(choices: Array<T>): T {
		let index = Math.floor(Random.next() * choices.length);
		return choices[index] as T;
	}

	/**
	 * Generate (possibly) unique (there's no conflict checking) UID in form of
	 * a string consisting of the letters of the alphabet (lower and upper case)
	 * and numbers (0-9).
	 *
	 * @example
	 * ```
	 * let uid = Random.generateUid(12); // uid = "9hbOknMuqMXE"
	 * ```
	 *
	 * @param length Length of the generated UID
	 * @returns Pseudorandom string UID of given length
	 */
	public static generateUid(length: number): string {
		let set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
		let result = "";

		for (let i = 0; i < length; i++)
			result += this.choose(set);

		return result;
	}
}
