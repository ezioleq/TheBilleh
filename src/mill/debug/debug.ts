declare let process: any;
const env = process.env.NODE_ENV;

export class Debug {
	/** Is it debug build? */
	public static readonly isDebug: boolean = !(env === "production");
}
