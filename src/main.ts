import { Vector2 } from "./math/vector";
import { Direction } from "./components/direction";
import { Transform } from "./components/transform";
import { Bullet } from "./entities/bullet";

class Player {
	transform: Transform;
	vel: Vector2;
	acc: Vector2;
	texture: HTMLImageElement;
	moveSpeed: number;
	dir: Direction;

	constructor(x: number, y: number) {
		this.transform = new Transform(x, y, 100, 100);
		this.vel = new Vector2(0, 0);
		this.acc = new Vector2(0, 0);
		this.texture = new Image();
		this.texture.src = "assets/img/p.png";
		this.moveSpeed = 1;
		this.dir = Direction.Up;
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(
			this.texture,
			this.transform.position.x,
			this.transform.position.y,
			this.transform.size.x,
			this.transform.size.y
		);
	}
}

window.addEventListener("DOMContentLoaded", () => {
	var canvas: any = document.getElementById("canvas");
	var ctx: CanvasRenderingContext2D = canvas.getContext('2d');

	// init
	var player = new Player(1280/2-50, 720/2-50);

	var keyboard: {[k: string]: any} = {};
	let bullets: Bullet[] = [];

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
			let moveDir = new Vector2(0, 0);
			if (keyboard['w']) {
				moveDir.y = -1;
				player.dir = Direction.Up;
			}
			
			if (keyboard['s']) {
				moveDir.y = 1;
				player.dir = Direction.Down;
			}
			
			if (keyboard['a']) {
				moveDir.x = -1;
				player.dir = Direction.Left;
			}
			
			if (keyboard['d']) {
				moveDir.x = 1;
				player.dir = Direction.Right;
			}

			if (keyboard['arrowleft']) {
				bullets.push(new Bullet(
					player.transform.position.x + player.transform.size.x/2 - 25,
					player.transform.position.y + player.transform.size.y/2 - 25,
					Direction.Left
				));
			}

			if (keyboard['arrowright']) {
				bullets.push(new Bullet(
					player.transform.position.x + player.transform.size.x/2 - 25,
					player.transform.position.y + player.transform.size.y/2 - 25,
					Direction.Right
				));
			}

			if (keyboard['arrowup']) {
				bullets.push(new Bullet(
					player.transform.position.x + player.transform.size.x/2 - 25,
					player.transform.position.y + player.transform.size.y/2 - 25,
					Direction.Up
				));
			}

			if (keyboard['arrowdown']) {
				bullets.push(new Bullet(
					player.transform.position.x + player.transform.size.x/2 - 25,
					player.transform.position.y + player.transform.size.y/2 - 25,
					Direction.Down
				));
			}

			if (moveDir.magnitude() > 1) {
				moveDir.x = moveDir.normalize().x;
				moveDir.y = moveDir.normalize().y;
			}

			player.acc.x += moveDir.x * player.moveSpeed;
			player.acc.y += moveDir.y * player.moveSpeed;

			player.vel.x += player.acc.x;
			player.vel.y += player.acc.y;
			player.acc = new Vector2(0, 0);

			player.transform.position.x += player.vel.x;
			player.transform.position.y += player.vel.y;
			player.vel.x *= 0.91;
			player.vel.y *= 0.91;

			bullets.forEach((e, i) => {
				e.update();
				if (e.ttl <= 0)
					bullets.splice(i, 1);
			});
		})();

		// draw
		(() => {
			// clear
			ctx.fillStyle = "rgb(255, 255, 255)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "rgb(0, 0, 0)";

			player.draw(ctx);

			bullets.forEach(e => {
				e.draw(ctx);
			});

			ctx.font = "30px Roboto"
			ctx.fillText(`Speed: ${player.moveSpeed}\n`, 10, 230);
			ctx.fillText(`Dir: ${player.dir.toString()}\n`, 10, 260);
			ctx.fillText(`Bullets: ${bullets.length}\n`, 10, 290);
			ctx.fillText(`Vel mag: ${Math.round(player.vel.magnitude() * 100)/100}`, 10, 320);
		})();
	}, 16);
});
