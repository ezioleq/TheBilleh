export interface State {
	update(tick: number): void;
	draw(ctx: CanvasRenderingContext2D, step: number): void;
}
