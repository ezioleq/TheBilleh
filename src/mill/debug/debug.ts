import { Game, Rect, Vector2 } from "..";

declare let process: any;
const env = process.env.NODE_ENV;

class DebugRect {
	rect: Rect = new Rect();
	color: string;

	constructor(rect: Rect, color: string) {
		this.rect = rect;
		this.color = color;
	}
}

export class DebugRenderer {
	private static _instance: DebugRenderer;
	/** Is it debug build? */
	public readonly isDebug: boolean = !(env === "production");
	private rectBuffer: Array<DebugRect> = [];

	private constructor() {

	}

	public static get Instance(): DebugRenderer {
		return this._instance || (this._instance = new this());
	}

	public drawRect(position: Vector2, size: Vector2, color: string = "rgb(0, 255, 0)", fill: boolean = false) {
		this.rectBuffer.push(new DebugRect(new Rect(position.x, position.y, size.x, size.y), color));
	}

	public draw() {
		this.rectBuffer.forEach(r => {
			Game.ctx.strokeStyle = r.color;
			Game.ctx.lineWidth = 4;
			Game.ctx.strokeRect(r.rect.x, r.rect.y, r.rect.w, r.rect.h);
		});
		this.rectBuffer = [];
	}
}

export const Debug = DebugRenderer.Instance;
