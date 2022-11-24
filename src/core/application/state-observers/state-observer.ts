import { StateProvider } from '../state/state-provider'

export type StateObserver = <T>(
    callback: () => (() => void) | void,
    ...states: StateProvider<T>[]
) => void
