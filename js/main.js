class Vector2 {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Rect {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

class Transform {
	constructor(x, y, w, h) {
		this.position = new Vector2(x, y);
		this.scale = new Vector2(w, h);
	}
}

const Up = Symbol("up");
const Down = Symbol("down");
const Left = Symbol("left");
const Right = Symbol("right");

class Bullet {
	constructor(x, y, dir) {
		this.transform = new Transform(x, y, 50, 50);
		this.vel = new Vector2(0, 0);
		this.dir = dir;
		this.speed = 10;
		this.texture = new Image();
		this.texture.src = "img/b.png";
		this.ttl = 6;

		switch (dir) {
			case Up:
				this.vel.y -= this.speed;
				break;
			case Down:
				this.vel.y += this.speed;
				break;
			case Left:
				this.vel.x -= this.speed;
				break;
			case Right:
				this.vel.x += this.speed;
				break;
		}
	}

	update() {
		this.transform.position.x += this.vel.x;
		this.transform.position.y += this.vel.y;
		this.ttl -= 0.016;
	}

	draw(ctx) {
		ctx.drawImage(
			this.texture,
			this.transform.position.x,
			this.transform.position.y,
			this.transform.scale.x,
			this.transform.scale.y
		);
	}
}

class Player {
	constructor(x, y) {
		this.transform = new Transform(x, y, 100, 100);
		this.vel = new Vector2(0, 0);
		this.acc = new Vector2(0, 0);
		this.texture = new Image();
		this.texture.src = "img/p.png";
		this.moveSpeed = 1;
		this.dir = Up;
	}

	draw(ctx) {
		ctx.drawImage(
			this.texture,
			this.transform.position.x,
			this.transform.position.y,
			this.transform.scale.x,
			this.transform.scale.y
		);
	}
}

window.addEventListener("DOMContentLoaded", () => {
	var canvas = document.getElementById("canvas");
	/** @type {CanvasRenderingContext2D} */
	var ctx = canvas.getContext('2d');
	
	// init
	var player = new Player(1280/2-50, 720/2-50);
	console.log(player);

	var keyboard = new Object();
	let bullets = [];

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
			if (keyboard['w']) {
				player.acc.y -= player.moveSpeed;
				player.dir = Up;
			}
			
			if (keyboard['s']) {
				player.acc.y += player.moveSpeed;
				player.dir = Down;
			}
			
			if (keyboard['a']) {
				player.acc.x -= player.moveSpeed;
				player.dir = Left;
			}
			
			if (keyboard['d']) {
				player.acc.x += player.moveSpeed;
				player.dir = Right;
			}

			if (keyboard['arrowleft']) {
				bullets.push(new Bullet(
					player.transform.position.x + player.transform.scale.x/2 - 25,
					player.transform.position.y + player.transform.scale.y/2 - 25,
					Left
				));
			}

			if (keyboard['arrowright']) {
				bullets.push(new Bullet(
					player.transform.position.x + player.transform.scale.x/2 - 25,
					player.transform.position.y + player.transform.scale.y/2 - 25,
					Right
				));
			}

			if (keyboard['arrowup']) {
				bullets.push(new Bullet(
					player.transform.position.x + player.transform.scale.x/2 - 25,
					player.transform.position.y + player.transform.scale.y/2 - 25,
					Up
				));
			}

			if (keyboard['arrowdown']) {
				bullets.push(new Bullet(
					player.transform.position.x + player.transform.scale.x/2 - 25,
					player.transform.position.y + player.transform.scale.y/2 - 25,
					Down
				));
			}

			player.vel.x += player.acc.x;
			player.vel.y += player.acc.y;
			player.acc = {x: 0, y: 0};

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

			player.draw(ctx);

			bullets.forEach(e => {
				e.draw(ctx);
			});

			ctx.fillStyle = "rgb(0, 0, 0)";
			ctx.font = "30px Roboto"
			ctx.fillText(`Speed: ${player.moveSpeed}\n`, 10, 230);
			ctx.fillText(`Dir: ${player.dir.toString()}\n`, 10, 260);
			ctx.fillText(`Bullets: ${bullets.length}\n`, 10, 290);
		})();
	}, 16);
});
