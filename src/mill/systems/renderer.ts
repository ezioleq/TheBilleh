import { Entity, Game, SpriteRenderer, Vector2 } from "..";

export const renderer = (entity: Entity, step: number) => {
	let sr = entity.getComponent(SpriteRenderer);

	if (!sr.initialized)
		return;

	let position: Vector2 = Vector2.lerp(entity.transform.previousPosition, entity.transform.position, step);

	Game.ctx.drawImage(
		sr.texture,
		(0.5 + position.x) | 0,
		(0.5 + position.y) | 0,
		(0.5 + entity.transform.size.x) | 0,
		(0.5 + entity.transform.size.y) | 0
	);
}
