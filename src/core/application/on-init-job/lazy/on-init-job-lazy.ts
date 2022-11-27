import { ArgumentTypes } from '../../../../utils/argument-types/argument.type'
import { Optional } from '../../../../utils/optional/optional'
import { ObservableData } from '../on-init-job'

export type JobStateLazy<T, U extends Function> = {
    data: ObservableData<Optional<T>>
    isLoading: ObservableData<boolean>
    error: ObservableData<Optional<Error>>
    do: (...args: ArgumentTypes<U>) => Promise<T>
}

export type OnInitJobLazy = <T, U extends Function>(
    callback: (...args: ArgumentTypes<U>) => Promise<T>,
) => JobStateLazy<T, U>
