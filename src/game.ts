import { StateManager } from "./states/stateManager";
import { GameState } from "./states/gameState";

export class Game {
	readonly gameWidth: number = 1280;
	readonly gameHeight: number = 720;
	stateManager: StateManager;
	canvas: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;

	// Main loop arrow function hack
	private mainLoop: any;

	constructor() {
		this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
		this.ctx = this.canvas.getContext("2d");

		// Set the canvas size to the in-game screen size
		this.canvas.width = this.gameWidth;
		this.canvas.height = this.gameHeight;

		// Handle window resizes
		window.addEventListener("resize", () => {
			let screenWidth = window.innerWidth;
			let screenHeight = window.innerHeight;

			// Where should we put the black bars?
			let horizontal: boolean = (screenWidth / screenHeight) > (this.gameWidth / this.gameHeight);

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
		this.stateManager = new StateManager(new GameState());

		// Set our main loop
		this.mainLoop = () => {
			this.update();
			this.draw();
		}

		// Start the game loop by requesting a frame
		window.requestAnimationFrame(this.mainLoop);
	}

	update() {
		// Update current state
		this.stateManager.getState().update();
	}

	draw() {
		// Clear the screen
		this.ctx.fillStyle = "rgb(255, 255, 255)";
		this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
		this.ctx.fillStyle = "rgb(0, 0, 0)";

		// Draw current state
		this.stateManager.getState().draw(this.ctx, 1);

		// Request a new frame
		window.requestAnimationFrame(this.mainLoop);
	}
}
