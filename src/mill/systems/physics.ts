import { Collider, Entity, Rigidbody, Vector2 } from "..";

export const physics = (entity: Entity) => {
	let rb = entity.getComponent(Rigidbody);
	let col = entity.getComponent(Collider);

	if (col) {
		Array.from(entity.scene.entities.values()).forEach(other => {
			if (other == entity)
				return;

			let otherCol = other.getComponent(Collider);
			if (!col.rect.intersects(otherCol.rect))
				return;

			let deltaX = other.transform.position.x - entity.transform.position.x;
			let deltaY = other.transform.position.y - entity.transform.position.y;
			let intersectX = Math.abs(deltaX) - (otherCol.rect.halfSize.x + col.rect.halfSize.x);
			let intersectY = Math.abs(deltaY) - (otherCol.rect.halfSize.y + col.rect.halfSize.y);

			if (intersectX < 0 && intersectY < 0) {
				let push = 1;

				if (intersectX > intersectY) {
					if (deltaX > 0) {
						entity.transform.translate(new Vector2(intersectX * (1 - push), 0));
						otherCol.entity.transform.translate(new Vector2(-intersectX * push, 0));
					} else {
						entity.transform.translate(new Vector2(-intersectX * (1 - push), 0));
						otherCol.entity.transform.translate(new Vector2(intersectX * push, 0));
					}
				} else {
					if (deltaY > 0) {
						entity.transform.translate(new Vector2(0, intersectY * (1 - push)));
						otherCol.entity.transform.translate(new Vector2(0, -intersectY * push));
					} else {
						entity.transform.translate(new Vector2(0, -intersectY * (1 - push)));
						otherCol.entity.transform.translate(new Vector2(0, intersectY * push));
					}
				}
			}
		});
	}

	if (rb) {
		rb.velocity.x += rb.acceleration.x;
		rb.velocity.y += rb.acceleration.y;
		rb.acceleration = new Vector2();

		Object.assign(entity.transform.previousPosition, entity.transform.position);
		entity.transform.position.x += rb.velocity.x;
		entity.transform.position.y += rb.velocity.y;

		rb.velocity.x *= rb.friction;
		rb.velocity.y *= rb.friction;
	}
}
