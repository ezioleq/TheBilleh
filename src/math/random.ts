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
}
