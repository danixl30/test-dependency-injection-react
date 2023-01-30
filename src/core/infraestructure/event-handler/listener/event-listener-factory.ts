import { EventHandler } from '../../../application/event-handler/event-handler'
import { EventListener } from '../../../application/event-handler/listener/event-listener'
import { EventBase } from '../../../application/event-handler/types/event'
import { OnInit } from '../../../application/on-init/on-init'

export const eventListenerFactory =
    (onInit: OnInit, eventHandler: EventHandler): EventListener =>
    <T extends EventBase>(event: string, callback: (event: T) => void) => {
        onInit(() => {
            const subscription = eventHandler.subscribe(event, callback)
            return () => {
                subscription()
            }
        })
    }
