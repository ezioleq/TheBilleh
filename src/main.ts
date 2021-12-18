import { Vector2 } from "./math/vector";
import { Player } from "./entities/player";

window.addEventListener("DOMContentLoaded", () => {
	var canvas: any = document.getElementById("canvas");
	var ctx: CanvasRenderingContext2D = canvas.getContext('2d');

	// init
	var player = new Player(1280 / 2 - 50, 720 / 2 - 50);
	var keyboard: { [k: string]: any } = {};

	window.addEventListener('keydown', (e) => {
		keyboard[e.key.toLowerCase()] = true;
	});

	window.addEventListener('keyup', (e) => {
		keyboard[e.key.toLowerCase()] = false;
	});

	// main loop
	setInterval(() => {
		// update
		(() => {
			player.update(keyboard);
		})();

		// draw
		(() => {
			// clear
			ctx.fillStyle = "rgb(255, 255, 255)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "rgb(0, 0, 0)";

			player.draw(ctx);

			ctx.font = "30px Roboto"
			ctx.fillText(`Speed: ${player.moveSpeed}\n`, 10, 230);
			ctx.fillText(`Dir: ${player.dir.toString()}\n`, 10, 260);
			ctx.fillText(`Bullets: ${player.bullets.length}\n`, 10, 290);
			ctx.fillText(`Vel mag: ${Math.round(player.vel.magnitude() * 100) / 100}`, 10, 320);
		})();
	}, 16);
});
