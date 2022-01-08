import { Entity, Rigidbody, Vector2 } from "..";

export const physics = (entity: Entity) => {
	let rb = entity.getComponent(Rigidbody);

	rb.velocity.x += rb.acceleration.x;
	rb.velocity.y += rb.acceleration.y;
	rb.acceleration = new Vector2();

	Object.assign(entity.transform.previousPosition, entity.transform.position);
	entity.transform.position.x += rb.velocity.x;
	entity.transform.position.y += rb.velocity.y;

	rb.velocity.x *= rb.friction;
	rb.velocity.y *= rb.friction;
}
