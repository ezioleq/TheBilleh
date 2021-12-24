declare let process: any;
const env = process.env.NODE_ENV;

export const Config = {
	gameWidth: 1280,
	gameHeight: 720,
	tps: 60,
	isDebug: !(env === "production")
};
