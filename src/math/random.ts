import seedrandom from "seedrandom";

export let rand = seedrandom();

export class Random {
	static setSeed(seed: string) {
		rand = seedrandom(seed);
	}

	static next() {
		return rand();
	}

	static int32() {
		return rand.int32();
	}

	static quick() {
		return rand.quick();
	}

	static range(min: number, max: number) {
		return Math.floor(Random.next() * (max - min + 1) + min);
	}

	static choose(choices: Array<any>) {
		let index = Math.floor(Math.random() * choices.length);
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
