import { EventHandler } from '../../application/event-handler/event-handler'
import { EventBase } from '../../application/event-handler/types/event'
import { StateFactory } from '../../application/state/state-factory'

export const useEventHadler = (stateFactory: StateFactory): EventHandler => {
    const callbacksState = stateFactory<{
        [eventName: string]: ((event: EventBase) => void)[]
    }>({})

    const subscribe = <T extends EventBase>(
        event: string,
        callback: (event: T) => void,
    ) => {
        const callbacks = [
            ...(callbacksState.state[event] || []),
            callback as (event: EventBase) => void,
        ]
        callbacksState.setState({ ...callbacksState.state, [event]: callbacks })
        return () => {
            const callbacks =
                callbacksState.state[event]?.filter((e) => e !== callback) || []
            callbacksState.setState({
                ...callbacksState.state,
                event: callbacks,
            })
        }
    }

    const publish = (event: EventBase) => {
        callbacksState.state[event.name]?.forEach((callback) => callback(event))
    }

    return {
        subscribe,
        publish,
    }
}
