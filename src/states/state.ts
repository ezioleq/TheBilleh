export interface State {
	update(): void;
	draw(ctx: CanvasRenderingContext2D, step: number): void;
}
