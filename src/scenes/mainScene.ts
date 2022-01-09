import { Assets, Vector2, SpriteRenderer, Collider, Entity } from "../mill";
import { Scene } from "../mill/scene";
import { Player } from "../scripts/player";

export class MainScene extends Scene {
	override init() {
		let player = this.createEntity("Player");
		player.addComponent(new Player());

		// The small one
		this.addEntity(this.createObstacle(new Vector2(100, 100), new Vector2(20, 20)));
		// 3 blocks on the left
		this.addEntity(this.createObstacle(new Vector2(200, 200), new Vector2(100, 100)));
		this.addEntity(this.createObstacle(new Vector2(200, 300), new Vector2(100, 100)));
		this.addEntity(this.createObstacle(new Vector2(200, 500), new Vector2(100, 100)));
		// 2x1
		this.addEntity(this.createObstacle(new Vector2(500, 150), new Vector2(200, 100)));
		// Wide and short
		this.addEntity(this.createObstacle(new Vector2(700, 500), new Vector2(200, 50)));
		// The big one
		this.addEntity(this.createObstacle(new Vector2(900, 180), new Vector2(150, 300)));
	}

	createObstacle(position: Vector2, size: Vector2): Entity {
		let obstacle = new Entity("Obstacle");
		obstacle.addComponent(new Collider());
		obstacle.addComponent(new SpriteRenderer());

		obstacle.transform.position = position;
		obstacle.transform.previousPosition = obstacle.transform.position;
		obstacle.transform.size = size;

		let sr = obstacle.getComponent(SpriteRenderer);
		let col = obstacle.getComponent(Collider);

		sr.texture = Assets.getTexture("brick");
		Object.assign(col.size, obstacle.transform.size);

		return obstacle;
	}
}
