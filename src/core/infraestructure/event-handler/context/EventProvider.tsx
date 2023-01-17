import { createContext, ReactNode, useContext } from 'react'
import { EventHandler } from '../../../application/event-handler/event-handler'
import { useStateFactory } from '../../state/useStateProvider'
import { useEventHadler } from '../useEventHadler'

export const EventContext = createContext<EventHandler | undefined>(undefined)

type EventProviderProps = {
    children: ReactNode | ReactNode[]
}

export const getEventContext = (): EventHandler => useContext(EventContext)!!

export const EventProvider = (props: EventProviderProps) => {
    const eventHandler = useEventHadler(useStateFactory)
    return (
        <EventContext.Provider value={eventHandler}>
            {props.children}
        </EventContext.Provider>
    )
}
