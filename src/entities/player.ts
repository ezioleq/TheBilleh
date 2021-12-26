import { Vector2 } from "../math/vector";
import { Direction } from "../components/direction";
import { Transform } from "../components/transform";
import { Bullet } from "../entities/bullet";
import { Input } from "../managers/inputManager";
import { Assets } from "../managers/assetManager";

export class Player {
	transform: Transform;
	previousPosition: Vector2;
	vel: Vector2;
	acc: Vector2;
	texture: HTMLImageElement;
	moveSpeed: number;
	dir: Direction;
	bullets: Bullet[] = [];

	constructor(x: number = 0, y: number = 0) {
		this.transform = new Transform(x, y, 100, 100);
		this.previousPosition = new Vector2();
		Object.assign(this.previousPosition, this.transform.position);
		this.vel = new Vector2(0, 0);
		this.acc = new Vector2(0, 0);
		this.texture = Assets.getTexture("player");
		this.moveSpeed = 1;
		this.dir = Direction.Up;
	}

	update(tick: number) {
		let moveDir = new Vector2(0, 0);

		if (Input.pressed('w')) {
			moveDir.y = -1;
			this.dir = Direction.Up;
		}

		if (Input.pressed('s')) {
			moveDir.y = 1;
			this.dir = Direction.Down;
		}

		if (Input.pressed('a')) {
			moveDir.x = -1;
			this.dir = Direction.Left;
		}

		if (Input.pressed('d')) {
			moveDir.x = 1;
			this.dir = Direction.Right;
		}

		if (Input.pressed('arrowup'))
			this.spawnBullet(Direction.Up);
		else if (Input.pressed('arrowdown'))
			this.spawnBullet(Direction.Down);
		else if (Input.pressed('arrowleft'))
			this.spawnBullet(Direction.Left);
		else if (Input.pressed('arrowright'))
			this.spawnBullet(Direction.Right);

		if (moveDir.magnitude() > 1) {
			moveDir.x = moveDir.normalize().x;
			moveDir.y = moveDir.normalize().y;
		}

		this.acc.x += moveDir.x * this.moveSpeed;
		this.acc.y += moveDir.y * this.moveSpeed;

		this.vel.x += this.acc.x;
		this.vel.y += this.acc.y;
		this.acc = new Vector2(0, 0);

		Object.assign(this.previousPosition, this.transform.position);
		this.transform.position.x += this.vel.x;
		this.transform.position.y += this.vel.y;

		this.vel.x *= 0.91;
		this.vel.y *= 0.91;

		this.bullets.forEach((e, i) => {
			e.update(tick);
			if (e.ttl <= 0)
				this.bullets.splice(i, 1);
		});
	}

	spawnBullet(dir: Direction) {
		this.bullets.push(new Bullet(
			this.transform.position.x + this.transform.size.x / 2 - 25,
			this.transform.position.y + this.transform.size.y / 2 - 25,
			dir
		));
	}

	draw(ctx: CanvasRenderingContext2D, step: number) {
		let position: Vector2 = this.previousPosition.lerp(this.transform.position, step);

		ctx.drawImage(
			this.texture,
			(0.5 + position.x) | 0,
			(0.5 + position.y) | 0,
			(0.5 + this.transform.size.x) | 0,
			(0.5 + this.transform.size.y) | 0
		);

		this.bullets.forEach(e => {
			e.draw(ctx, step);
		});
	}
}
