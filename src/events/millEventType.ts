/**
 * A handy list of all major events in the engine needed
 * to make it work properly.
 */
export enum MillEventType {
	// Scene management
	/** Dispatched when a new scene was loaded */
	SceneLoaded = "sceneloaded",

	// ECS
	/** Dispatched when a new entity was added to a scene */
	EntityAdded = "entityadded",
	/** Dispatched when an entity was destroyed (removed from the scene) */
	EntityDestroyed = "entitydestroyed",
	/** Dispatched when a new component was added to an entity */
	EntityComponentAdded = "entitycomponentadded",
	/** Dispatched when a component was removed from an entity */
	EntityComponentRemoved = "entitycomponentremoved",
};
