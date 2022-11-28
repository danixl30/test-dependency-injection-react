import { Optional } from '../../../utils/optional/optional'
import { OnInitJob } from '../../application/on-init-job/on-init-job'
import { OnInit } from '../../application/on-init/on-init'
import { StateObserver } from '../../application/state-observers/state-observer'
import { StateFactory } from '../../application/state/state-factory'
import { StateProvider } from '../../application/state/state-provider'

export const nativeOnInitJob =
    (
        stateFactory: StateFactory,
        stateObserver: StateObserver,
        onInit: OnInit,
    ): OnInitJob =>
    <T, U>(callback: () => Promise<T>, ...args: StateProvider<U>[]) => {
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
            reloadingState.setState(true)
            job()
        }

        stateObserver(reload, ...args)

        return {
            reload,
            get data(): Optional<T> {
                return dataState.state
            },
            subscribeData: dataState.subscribe,
            get error(): Optional<Error> {
                return errorState.state
            },
            subscribeError: errorState.subscribe,
            get isLoading(): boolean {
                return loadingState.state
            },
            subscribeLoading: loadingState.subscribe,
            get isReloading(): boolean {
                return reloadingState.state
            },
            subscribeIsReloading: reloadingState.subscribe,
        }
    }
