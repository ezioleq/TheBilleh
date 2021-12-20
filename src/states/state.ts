export interface State {
	update(): void;
	draw(ctx: CanvasRenderingContext2D, delta: number): void;
}
