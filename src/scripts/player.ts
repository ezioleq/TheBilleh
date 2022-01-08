import { Assets, Component, Game, Rigidbody, SpriteRenderer, Vector2 } from "../mill";

export class Player extends Component {
	private sr: SpriteRenderer = new SpriteRenderer();
	private rb: Rigidbody = new Rigidbody();

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

	}
}
