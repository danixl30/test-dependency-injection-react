import { Optional } from '../../../utils/optional/optional'
import { StateProvider } from '../state/state-provider'

export type ObservableData<T> = {
    value: T
    subscribe(callback: (value: T) => void): void
}

export type JobState<T> = {
    data: ObservableData<Optional<T>>
    isLoading: ObservableData<boolean>
    error: ObservableData<Optional<Error>>
    isReloading: ObservableData<boolean>
    reload: () => void
}

export type OnInitJob = <T, U>(
    callback: () => Promise<T>,
    ...states: StateProvider<U>[]
) => JobState<T>
