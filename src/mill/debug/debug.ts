import { Game, Rect, Vector2 } from "..";

declare let process: any;
const env = process.env.NODE_ENV;

abstract class DebugDrawable {
	color: string = "rgb(0, 255, 0)";
	fill: boolean = false;
	lineWidth: number = 2;

	public abstract draw(): void;
}

class DebugLine extends DebugDrawable {
	startPoint: Vector2;
	endPoint: Vector2;

	public constructor(startPoint: Vector2, endPoint: Vector2, color: string, lineWidth: number) {
		super();
		this.startPoint = startPoint;
		this.endPoint = endPoint;
		this.lineWidth = lineWidth;
		this.color = color;
	}

	public override draw() {
		Game.ctx.strokeStyle = this.color;
		Game.ctx.lineWidth = this.lineWidth;

		Game.ctx.beginPath();
		Game.ctx.moveTo(this.startPoint.x, this.startPoint.y);
		Game.ctx.lineTo(this.endPoint.x, this.endPoint.y);
		Game.ctx.stroke();
	}
}

class DebugRect extends DebugDrawable {
	public rect: Rect;

	public constructor(rect: Rect, color: string, fill: boolean) {
		super();
		this.rect = rect;
		this.color = color;
		this.fill = fill;
	}

	public override draw() {
		if (!this.fill) {
			Game.ctx.strokeStyle = this.color;
			Game.ctx.lineWidth = this.lineWidth;
			Game.ctx.strokeRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
		} else {
			Game.ctx.fillStyle = this.color;
			Game.ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
		}
	}
}

export class DebugRenderer {
	private static _instance: DebugRenderer;
	/** Is it debug build? */
	public readonly isDebug: boolean = !(env === "production");
	private buffer: Array<DebugDrawable> = [];

	public static get Instance(): DebugRenderer {
		return this._instance || (this._instance = new this());
	}

	public drawLine(startPoint: Vector2, endPoint: Vector2, color: string = "rgb(0, 255, 0)", lineWidth: number = 2) {
		this.buffer.push(new DebugLine(startPoint, endPoint, color, lineWidth));
	}

	public drawRect(rect: Rect, color: string = "rgb(0, 255, 0)", fill: boolean = false) {
		this.buffer.push(new DebugRect(rect, color, fill));
	}

	public draw() {
		if (!Debug.isDebug)
			return;

		this.buffer.forEach(e => e.draw());
		this.buffer = [];
	}
}

export const Debug = DebugRenderer.Instance;
