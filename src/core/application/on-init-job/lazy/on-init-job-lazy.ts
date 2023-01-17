import { ArgumentTypes } from '../../../../utils/argument-types/argument.type'
import { Optional } from '../../../../utils/optional/optional'
import { StateViewer } from '../../state/state-provider'

export type JobStateLazy<T, U extends Function> = {
    data: StateViewer<Optional<T>>
    error: StateViewer<Optional<Error>>
    isLoading: StateViewer<boolean>
    do: (...args: ArgumentTypes<U>) => Promise<T>
}

export type OnInitJobLazy = <T, U extends Function>(
    callback: (...args: ArgumentTypes<U>) => Promise<T>,
) => JobStateLazy<T, U>
