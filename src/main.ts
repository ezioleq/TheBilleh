import { Vector2 } from "./math/vector";
import { Player } from "./entities/player";

var canvas: any;
var ctx: CanvasRenderingContext2D;

var player: Player;

let gameWidth = 1280;
let gameHeight = 720;

window.addEventListener("DOMContentLoaded", () => {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');

	canvas.width = gameWidth;
	canvas.height = gameHeight;

	// init
	player = new Player(1280 / 2 - 50, 720 / 2 - 50);

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
	player.update();

	// draw
	ctx.fillStyle = "rgb(255, 255, 255)";
	ctx.fillRect(0, 0, gameWidth, gameHeight);
	ctx.fillStyle = "rgb(0, 0, 0)";

	player.draw(ctx);

	ctx.font = "30px Roboto"
	ctx.fillText(`Speed: ${player.moveSpeed}\n`, 10, 230);
	ctx.fillText(`Dir: ${player.dir.toString()}\n`, 10, 260);
	ctx.fillText(`Bullets: ${player.bullets.length}\n`, 10, 290);
	ctx.fillText(`Vel mag: ${Math.round(player.vel.magnitude() * 100) / 100}`, 10, 320);

	window.requestAnimationFrame(update);
}
