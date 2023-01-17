import { EventBase } from '../../../core/application/event-handler/types/event'

export const MAIN_INPUT_CHANGE_EVENT = 'MAIN_INPUT_CHANGE_EVENT'
export type MainInputChange = EventBase & {
    text: string
}

export const mainInputChangeEventFactory = (text: string): MainInputChange => ({
    text,
    timestamp: new Date(),
    id: crypto.randomUUID(),
    name: MAIN_INPUT_CHANGE_EVENT,
})
