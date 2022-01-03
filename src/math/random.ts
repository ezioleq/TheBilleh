import seedrandom from "seedrandom";

export class Random {
	private static prng = seedrandom();

	static setSeed(seed: string) {
		Random.prng = seedrandom(seed);
	}

	static next() {
		return Random.prng();
	}

	static int32() {
		return Random.prng.int32();
	}

	static quick() {
		return Random.prng.quick();
	}

	static range(min: number, max: number) {
		return Math.floor(Random.next() * (max - min + 1) + min);
	}

	static choose(choices: Array<any>) {
		let index = Math.floor(Random.next() * choices.length);
		return choices[index];
	}

	static generateUid(length: number) {
		let set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
		let result = "";

		for (let i = 0; i < length; i++)
			result += this.choose(set);

		return result;
	}
}
