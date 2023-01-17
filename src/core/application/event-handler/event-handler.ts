import { EventBase } from './types/event'
import { Subscription } from './types/subscription'

export type EventHandler = {
    subscribe<T extends EventBase>(
        event: string,
        callback: (event: T) => void,
    ): Subscription
    publish(event: EventBase): void
}
