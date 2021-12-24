import { GlobalState } from "./managers/stateManager";
import { GameState } from "./states/gameState";
import { Config } from "./config";
import * as Stats from "stats.js";

export class Game {
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	stats: Stats;

	// Fixed timestep specific
	readonly timePerTick: number = 1 / Config.tps;
	lastTickTime: number = new Date().getTime() / 1000;
	lagTime: number = 0;
	ticks: number = 0;

	// Main loop arrow function hack
	private mainLoop: any;

	constructor() {
		this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
		this.ctx = this.canvas.getContext("2d", { alpha: false });

		if (Config.isDebug) {
			this.stats = new Stats();
			// 0: FPS, 1: Frametime, 2: Memory
			let panels = [0, 1, 2];
			Array.from((this.stats.dom as HTMLDivElement).children).forEach((child, i) => {
				(child as HTMLCanvasElement).style.display = panels.includes(i) ? "inline-block" : "none";
			});
			document.body.appendChild(this.stats.dom);
		}

		// Set the canvas size to the in-game screen size
		this.canvas.width = Config.gameWidth;
		this.canvas.height = Config.gameHeight;

		// Handle window resizes
		window.addEventListener("resize", () => {
			let screenWidth = window.innerWidth;
			let screenHeight = window.innerHeight;

			// Where should we put the black bars?
			let horizontal: boolean =
				(screenWidth / screenHeight) > (Config.gameWidth / Config.gameHeight);

			if (horizontal) {
				this.canvas.style.height = "100vh";
				this.canvas.style.removeProperty("width");
			} else {
				this.canvas.style.width = "100vw";
				this.canvas.style.removeProperty("height");
			}
		});
		window.dispatchEvent(new Event("resize"));

		// Set the initial state
		GlobalState.current = new GameState();

		// Set our main loop
		this.mainLoop = () => {
			if (Config.isDebug) {
				this.stats.end();
				this.stats.begin();
			}
			this.update();
			this.draw();
		}

		// Start the game loop by requesting a frame
		window.requestAnimationFrame(this.mainLoop);
	}

	update() {
		let newTickTime = new Date().getTime() / 1000;
		let deltaTime = newTickTime - this.lastTickTime;
		this.lastTickTime = newTickTime;
		this.lagTime += deltaTime;

		while (this.lagTime >= this.timePerTick) {
			// Update current state
			GlobalState.current.update(this.ticks);
			this.lagTime -= this.timePerTick;
			this.ticks++;
		}
	}

	draw() {
		// Clear the screen
		this.ctx.fillStyle = "rgb(255, 255, 255)";
		this.ctx.fillRect(0, 0, Config.gameWidth, Config.gameHeight);
		this.ctx.fillStyle = "rgb(0, 0, 0)";

		// Draw current state
		let step = this.lagTime / this.timePerTick;
		GlobalState.current.draw(this.ctx, step);

		// Request a new frame
		window.requestAnimationFrame(this.mainLoop);
	}
}
