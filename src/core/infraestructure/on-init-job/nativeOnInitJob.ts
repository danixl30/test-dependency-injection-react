import { Optional } from '../../../utils/optional/optional'
import { OnInitJob } from '../../application/on-init-job/on-init-job'
import { OnInit } from '../../application/on-init/on-init'
import { StateObserver } from '../../application/state-observers/state-observer'
import { StateFactory } from '../../application/state/state-factory'
import { StateViewer } from '../../application/state/state-provider'

export const nativeOnInitJob =
    (
        stateFactory: StateFactory,
        stateObserver: StateObserver,
        onInit: OnInit,
    ): OnInitJob =>
    <T, U>(callback: () => Promise<T>, ...args: StateViewer<U>[]) => {
        const dataState = stateFactory<Optional<T>>(null)
        const loadingState = stateFactory(false)
        const errorState = stateFactory<Optional<Error>>(null)
        const reloadingState = stateFactory(false)

        const job = async () => {
            dataState.setState(null)
            errorState.setState(null)
            try {
                const res = await callback()
                dataState.setState(res)
            } catch (e) {
                errorState.setState(e as Error)
            }
            loadingState.setState(false)
            reloadingState.setState(false)
        }

        onInit(() => {
            loadingState.setState(true)
            job()
        })

        const reload = () => {
            if (reloadingState.state.value || loadingState.state.value)
                throw new Error('Is in job')
            reloadingState.setState(true)
            job()
        }

        stateObserver(reload, ...args)

        return {
            reload,
            data: dataState.state,
            error: errorState.state,
            isLoading: loadingState.state,
            isReloading: reloadingState.state,
        }
    }
