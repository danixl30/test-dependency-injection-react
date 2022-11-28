import { ArgumentTypes } from '../../../../utils/argument-types/argument.type'
import { Optional } from '../../../../utils/optional/optional'
import { Subscribe } from '../on-init-job'

export type JobStateLazy<T, U extends Function> = {
    get data(): Optional<T>
    subscribeData: Subscribe<Optional<T>>
    get isLoading(): boolean
    subscribeLoading: Subscribe<boolean>
    get error(): Optional<Error>
    subscribeError: Subscribe<Optional<Error>>
    do: (...args: ArgumentTypes<U>) => Promise<T>
}

export type OnInitJobLazy = <T, U extends Function>(
    callback: (...args: ArgumentTypes<U>) => Promise<T>,
) => JobStateLazy<T, U>
