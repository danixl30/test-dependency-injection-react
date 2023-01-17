import { ArgumentTypes } from '../../../utils/argument-types/argument.type'
import { Optional } from '../../../utils/optional/optional'
import {
    JobStateLazy,
    OnInitJobLazy,
    OnTask,
} from '../../application/on-init-job/lazy/on-init-job-lazy'
import { StateFactory } from '../../application/state/state-factory'

export const nativeOnInitJob =
    (stateFactory: StateFactory): OnInitJobLazy =>
    <T, U extends Function>(
        callback: (...args: ArgumentTypes<U>) => Promise<T>,
        onTask?: OnTask,
    ): JobStateLazy<T, U> => {
        const dataState = stateFactory<Optional<T>>(null)
        const loadingState = stateFactory(false)
        const errorState = stateFactory<Optional<Error>>(null)

        const doJob = async (...args: ArgumentTypes<U>) => {
            if (loadingState.state) throw new Error('Is in job')
            dataState.setState(null)
            errorState.setState(null)
            loadingState.setState(true)
            const loadingTask = onTask?.()
            try {
                const res = await callback(...args)
                dataState.setState(res)
                loadingState.setState(false)
                loadingTask?.success?.()
                return res
            } catch (e) {
                errorState.setState(e as Error)
                loadingTask?.error?.(e as Error)
                loadingState.setState(false)
                throw e
            }
        }

        return {
            do: doJob,
            data: dataState.state,
            error: errorState.state,
            isLoading: loadingState.state,
        }
    }
