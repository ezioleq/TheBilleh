import * as Mill from "../mill";
import { Assets, Game, SpriteRenderer, Vector2 } from "../mill";

export class Player extends Mill.Component {
	private sr: SpriteRenderer = new SpriteRenderer();

	override awake() {
		this.entity.addComponent(this.sr);

		this.sr.texture = Assets.getTexture("player");

		this.entity.transform.size = new Vector2(100, 100);
		this.entity.transform.position = new Vector2(
			Game.width / 2 - this.entity.transform.size.x / 2,
			Game.height / 2 - this.entity.transform.size.y / 2
		);
	}

	override start() {

	}

	override update() {

	}
}
