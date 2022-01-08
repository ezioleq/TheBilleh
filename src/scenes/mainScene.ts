import { Assets, Vector2, SpriteRenderer, Transform } from "../mill";
import { Scene } from "../mill/scene";
import { Player } from "../scripts/player";

export class MainScene extends Scene {
	override init() {
		let player = this.createEntity("Player");
		player.addComponent(new Player());
	}
}
