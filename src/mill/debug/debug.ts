import { Game, Rect, Vector2 } from "..";

declare let process: any;
const env = process.env.NODE_ENV;

abstract class DebugDrawable {
	color: string = "rgb(0, 255, 0)";
	fill: boolean = false;
	lineWidth: number = 2;

	public abstract draw(): void;
}

class DebugRect extends DebugDrawable {
	public rect: Rect;

	constructor(rect: Rect, color: string, fill: boolean) {
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
