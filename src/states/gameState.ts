import { State } from "./state";
import { Player } from "../entities/player";

export class GameState implements State {
	player: Player;

	constructor() {
		this.player = new Player(1280 / 2 - 50, 720 / 2 - 50);
	}

	update() {
		this.player.update();
	}

	draw(ctx: CanvasRenderingContext2D, step: number) {
		this.player.draw(ctx, step);

		ctx.font = "30px Roboto"
		ctx.fillText(`Speed: ${this.player.moveSpeed}\n`, 10, 230);
		ctx.fillText(`Dir: ${this.player.dir.toString()}\n`, 10, 260);
		ctx.fillText(`Bullets: ${this.player.bullets.length}\n`, 10, 290);
		ctx.fillText(`Vel mag: ${Math.round(this.player.vel.magnitude() * 100) / 100}`, 10, 320);
	}
}
