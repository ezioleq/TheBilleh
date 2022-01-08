import { Assets, Component, Game, Input, Rigidbody, SpriteRenderer, Vector2 } from "../mill";

export class Player extends Component {
	private sr: SpriteRenderer = new SpriteRenderer();
	private rb: Rigidbody = new Rigidbody();

	private speed: number = 1;

	override awake() {
		this.entity.addComponent(this.sr);
		this.entity.addComponent(this.rb);

		this.sr.texture = Assets.getTexture("player");

		this.entity.transform.size = new Vector2(100, 100);
		this.entity.transform.position = new Vector2(
			(Game.width - this.entity.transform.size.x) / 2,
			(Game.height - this.entity.transform.size.y) / 2
		);

		this.rb.useGravity = false;
		this.rb.friction = 0.91;
	}

	override start() {

	}

	override update() {
		let moveDir = new Vector2(0, 0);

		if (Input.pressed('w')) {
			moveDir.y = -1;
		}

		if (Input.pressed('s')) {
			moveDir.y = 1;
		}

		if (Input.pressed('a')) {
			moveDir.x = -1;
		}

		if (Input.pressed('d')) {
			moveDir.x = 1;
		}

		if (moveDir.magnitude() > 1) {
			let normalized = moveDir.normalize();
			moveDir.x = normalized.x;
			moveDir.y = normalized.y;
		}

		this.rb.addForce(moveDir);
	}
}
