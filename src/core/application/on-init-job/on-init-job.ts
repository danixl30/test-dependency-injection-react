import { Optional } from '../../../utils/optional/optional'
import { StateProvider } from '../state/state-provider'

export type Subscribe<T> = (callback: (value: T) => void) => void

export type JobState<T> = {
    get data(): Optional<T>
    subscribeData: Subscribe<Optional<T>>
    get isLoading(): boolean
    subscribeLoading: Subscribe<boolean>
    get error(): Optional<Error>
    subscribeError: Subscribe<Optional<Error>>
    get isReloading(): boolean
    subscribeIsReloading: Subscribe<boolean>
    reload: () => void
}

export type OnInitJob = <T, U>(
    callback: () => Promise<T>,
    ...states: StateProvider<U>[]
) => JobState<T>
