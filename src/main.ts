import { StateManager } from "./states/stateManager";
import { GameState } from "./states/gameState";

var canvas: any;
var ctx: CanvasRenderingContext2D;

let gameWidth = 1280;
let gameHeight = 720;

let stateManager: StateManager = new StateManager();

window.addEventListener("DOMContentLoaded", () => {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');

	canvas.width = gameWidth;
	canvas.height = gameHeight;

	stateManager.setState(new GameState());

	window.requestAnimationFrame(update);
	window.dispatchEvent(new Event("resize"));
});

window.addEventListener("resize", () => {
	let screenWidth = window.innerWidth;
	let screenHeight = window.innerHeight;

	let horizontal: boolean = (screenWidth / screenHeight) > (gameWidth / gameHeight);

	if (horizontal) {
		canvas.style.height = "100vh";
		canvas.style.removeProperty("width");
	} else {
		canvas.style.width = "100vw";
		canvas.style.removeProperty("height");
	}
});

let update = () => {
	// update
	stateManager.getState().update();

	// draw
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fillRect(0, 0, gameWidth, gameHeight);
	ctx.fillStyle = "rgb(0, 0, 0)";

	stateManager.getState().draw(ctx, 1);

	window.requestAnimationFrame(update);
}
