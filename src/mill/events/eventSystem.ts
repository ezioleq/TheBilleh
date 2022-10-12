import { MillEventType } from "./millEventType";

export type EventCallback<T> = (data: T) => void;
type EventType = MillEventType | string;

/**
 * The event system is used to communicate between different parts of the engine.
 */
export class EventSystem {
	private subscribers: Map<string, Array<EventCallback<any>>> = new Map();

	/**
	 * Dispatches given event with it's data to all of the subscribers.
	 * @param event Event type.
	 * @param data Event data.
	 * @returns True when successfully dispatched event, false when not.
	 */
	public dispatch<T>(event: EventType, data?: T): boolean {
		const queue = this.subscribers.get(event);

		if (!queue)
			return false;

		for (const callback of queue) {
			callback(data);
		}

		return true;
	}

	/**
	 * Subscribe to the given event with a given callback.
	 * @param event Event type.
	 * @param callback Callback function.
	 * @returns This callback.
	 */
	public on<T>(event: EventType, callback: EventCallback<T>): EventCallback<T> {
		if (!this.subscribers.get(event))
			this.subscribers.set(event, new Array());

		this.subscribers.get(event)!.push(callback);

		return callback;
	}

	/**
	 * Unsubscribe from the given event.
	 *
	 * When the callback is not specified, unsubscribe all the callbacks.
	 * from this event.
	 * @param event Event type.
	 * @param callback Callback function.
	 * @returns
	 */
	public off(event: EventType, callback?: EventCallback<any>) {
		if (!this.subscribers.get(event))
			return;

		if (!callback) {
			this.subscribers.set(event, undefined);
		} else {
			this.subscribers.set(
				event,
				this.subscribers.get(event)!.filter((cb) => {
					return cb !== callback;
				})
			);
		}
	}
}

/** Global engine events manager. */
export const MillEvents = new EventSystem();
