import * as Stats from "stats.js";
import { SceneEngine } from ".";
import { MainScene } from "../scenes/mainScene";
import { Assets } from "./managers/assetManager";
import { Debug } from "./debug"
import { Rect } from "./math";

export class Game {
	private canvas: HTMLCanvasElement;
	public static ctx: CanvasRenderingContext2D;
	private stats: Stats;

	private static _width: number = 1280;
	private static _height: number = 720;
	private static _tps = 60;

	// Fixed timestep specific
	private readonly timePerTick: number = 1 / Game.tps;
	private lastTickTime: number = new Date().getTime() / 1000;
	private lagTime: number = 0;
	private static _ticks: number = 0;

	// Main loop arrow function hack
	private mainLoop: any;

	// Config
	public constructor() {

	}

	public static get width(): number {
		return Game._width;
	}

	public static get height(): number {
		return Game._height;
	}

	public static get gameRect(): Rect {
		return new Rect(0, 0, Game.width, Game.height);
	}

	public static get tps(): number {
		return Game._tps;
	}

	public static get elapsedTicks(): number {
		return Game._ticks;
	}

	public run() {
		this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
		Game.ctx = this.canvas.getContext("2d", { alpha: false });

		if (Debug.isDebug) {
			this.stats = new Stats();
			// 0: FPS, 1: Frametime, 2: Memory
			let panels = [0, 1, 2];
			Array.from((this.stats.dom as HTMLDivElement).children).forEach((child, i) => {
				(child as HTMLCanvasElement).style.display = panels.includes(i) ? "inline-block" : "none";
			});
			document.body.appendChild(this.stats.dom);
		}

		// Set the canvas size to the in-game screen size
		this.canvas.width = Game.width;
		this.canvas.height = Game.height;

		// Handle window resizes
		window.addEventListener("resize", this.handleResize);
		window.dispatchEvent(new Event("resize"));

		this.loadAssets();

		// Set the initial state
		SceneEngine.current = new MainScene();
		SceneEngine.current.start();

		// Set our main loop
		this.mainLoop = () => {
			if (Debug.isDebug) {
				this.stats.end();
				this.stats.begin();
			}
			this.update();
			this.draw();
		}

		// Start the game loop by requesting a frame
		window.requestAnimationFrame(this.mainLoop);
	}

	private handleResize() {
		let screenWidth = window.innerWidth;
		let screenHeight = window.innerHeight;

		// Where should we put the black bars?
		let horizontal: boolean =
			(screenWidth / screenHeight) > (Game.width / Game.height);

		if (horizontal) {
			this.canvas.style.height = "100vh";
			this.canvas.style.removeProperty("width");
		} else {
			this.canvas.style.width = "100vw";
			this.canvas.style.removeProperty("height");
		}
	}

	private update() {
		let newTickTime = new Date().getTime() / 1000;
		let deltaTime = newTickTime - this.lastTickTime;
		this.lastTickTime = newTickTime;
		this.lagTime += deltaTime;

		while (this.lagTime >= this.timePerTick) {
			// Update current state
			SceneEngine.current.update();
			SceneEngine.current.lateUpdate();
			this.lagTime -= this.timePerTick;
			Game._ticks++;
		}
	}

	private draw() {
		// Clear the screen
		Game.ctx.fillStyle = "rgb(255, 255, 255)";
		Game.ctx.fillRect(0, 0, Game.width, Game.height);
		Game.ctx.fillStyle = "rgb(0, 0, 0)";

		// Draw current state
		let step = this.lagTime / this.timePerTick;
		SceneEngine.current.draw(step);

		// Request a new frame
		window.requestAnimationFrame(this.mainLoop);
	}

	private loadAssets() {
		Assets.loadTexture("player", "assets/img/p.png");
		Assets.loadTexture("bullet", "assets/img/b.png");
	}
}
