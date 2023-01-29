import { EventHandler } from '../../application/event-handler/event-handler'
import { EventBase } from '../../application/event-handler/types/event'
import { ValueProvider } from '../../application/value-provider/value-provider'

export const useEventHadler = (valueFactory: ValueProvider): EventHandler => {
    const callbacksState = valueFactory<{
        [eventName: string]: ((event: EventBase) => void)[]
    }>({})

    const subscribe = <T extends EventBase>(
        event: string,
        callback: (event: T) => void,
    ) => {
        const callbacks = [
            ...(callbacksState.value[event] || []),
            callback as (event: EventBase) => void,
        ]
        callbacksState.value = {
            ...callbacksState.value,
            [event]: callbacks,
        }
        return () => {
            const callbacks =
                callbacksState.value[event]?.filter((e) => e !== callback) || []
            callbacksState.value = {
                ...callbacksState.value,
                event: callbacks,
            }
        }
    }

    const publish = (event: EventBase) => {
        callbacksState.value[event.name]?.forEach((callback) => callback(event))
    }

    return {
        subscribe,
        publish,
    }
}
