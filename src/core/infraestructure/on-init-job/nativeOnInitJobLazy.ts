import { ArgumentTypes } from '../../../utils/argument-types/argument.type'
import { Optional } from '../../../utils/optional/optional'
import {
    JobStateLazy,
    OnInitJobLazy,
} from '../../application/on-init-job/lazy/on-init-job-lazy'
import { StateFactory } from '../../application/state/state-factory'

export const nativeOnInitJob =
    (stateFactory: StateFactory): OnInitJobLazy =>
    <T, U extends Function>(
        callback: (...args: ArgumentTypes<U>) => Promise<T>,
    ): JobStateLazy<T, U> => {
        const dataState = stateFactory<Optional<T>>(null)
        const loadingState = stateFactory(false)
        const errorState = stateFactory<Optional<Error>>(null)

        const doJob = async (...args: ArgumentTypes<U>) => {
            dataState.setState(null)
            errorState.setState(null)
            loadingState.setState(true)
            try {
                const res = await callback(...args)
                dataState.setState(res)
                loadingState.setState(false)
                return res
            } catch (e) {
                errorState.setState(e as Error)
                loadingState.setState(false)
                throw e
            }
        }

        return {
            do: doJob,
            data: {
                value: dataState.state,
                subscribe: dataState.subscribe,
            },
            error: {
                value: errorState.state,
                subscribe: errorState.subscribe,
            },
            isLoading: {
                value: loadingState.state,
                subscribe: loadingState.subscribe,
            },
        }
    }
