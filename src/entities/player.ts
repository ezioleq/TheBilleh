import { Vector2 } from "../math/vector";
import { Direction } from "../components/direction";
import { Transform } from "../components/transform";
import { Bullet } from "../entities/bullet";

export class Player {
	transform: Transform;
	vel: Vector2;
	acc: Vector2;
	texture: HTMLImageElement;
	moveSpeed: number;
	dir: Direction;
	bullets: Bullet[] = [];

	constructor(x: number, y: number) {
		this.transform = new Transform(x, y, 100, 100);
		this.vel = new Vector2(0, 0);
		this.acc = new Vector2(0, 0);
		this.texture = new Image();
		this.texture.src = "assets/img/p.png";
		this.moveSpeed = 1;
		this.dir = Direction.Up;
	}

	update(keyboard: { [k: string]: any }) {
		let moveDir = new Vector2(0, 0);
		if (keyboard['w']) {
			moveDir.y = -1;
			this.dir = Direction.Up;
		}

		if (keyboard['s']) {
			moveDir.y = 1;
			this.dir = Direction.Down;
		}

		if (keyboard['a']) {
			moveDir.x = -1;
			this.dir = Direction.Left;
		}

		if (keyboard['d']) {
			moveDir.x = 1;
			this.dir = Direction.Right;
		}

		if (keyboard['arrowleft']) {
			this.bullets.push(new Bullet(
				this.transform.position.x + this.transform.size.x / 2 - 25,
				this.transform.position.y + this.transform.size.y / 2 - 25,
				Direction.Left
			));
		}

		if (keyboard['arrowright']) {
			this.bullets.push(new Bullet(
				this.transform.position.x + this.transform.size.x / 2 - 25,
				this.transform.position.y + this.transform.size.y / 2 - 25,
				Direction.Right
			));
		}

		if (keyboard['arrowup']) {
			this.bullets.push(new Bullet(
				this.transform.position.x + this.transform.size.x / 2 - 25,
				this.transform.position.y + this.transform.size.y / 2 - 25,
				Direction.Up
			));
		}

		if (keyboard['arrowdown']) {
			this.bullets.push(new Bullet(
				this.transform.position.x + this.transform.size.x / 2 - 25,
				this.transform.position.y + this.transform.size.y / 2 - 25,
				Direction.Down
			));
		}

		if (moveDir.magnitude() > 1) {
			moveDir.x = moveDir.normalize().x;
			moveDir.y = moveDir.normalize().y;
		}

		this.acc.x += moveDir.x * this.moveSpeed;
		this.acc.y += moveDir.y * this.moveSpeed;

		this.vel.x += this.acc.x;
		this.vel.y += this.acc.y;
		this.acc = new Vector2(0, 0);

		this.transform.position.x += this.vel.x;
		this.transform.position.y += this.vel.y;
		this.vel.x *= 0.91;
		this.vel.y *= 0.91;

		this.bullets.forEach((e, i) => {
			e.update();
			if (e.ttl <= 0)
				this.bullets.splice(i, 1);
		});
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.drawImage(
			this.texture,
			this.transform.position.x,
			this.transform.position.y,
			this.transform.size.x,
			this.transform.size.y
		);

		this.bullets.forEach(e => {
			e.draw(ctx);
		});
	}
}
