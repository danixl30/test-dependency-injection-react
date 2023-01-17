import { StateViewer } from '../state/state-provider'

export type StateObserver = <T>(
    callback: () => (() => void) | void,
    ...states: StateViewer<T>[]
) => void
