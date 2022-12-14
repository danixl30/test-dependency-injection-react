import { Optional } from '../../../utils/optional/optional'
import { OnInit } from '../../application/on-init/on-init'
import { PaginationManager } from '../../application/pagination-manager/pagination-manager'
import { StateObserver } from '../../application/state-observers/state-observer'
import { StateFactory } from '../../application/state/state-factory'
import { normalDataTransform } from './data-transforms/normal'

export const usePaginationManager =
    (
        stateFactory: StateFactory,
        stateObserver: StateObserver,
        onInit: OnInit,
    ): PaginationManager =>
    <T>(
        callback: (page: number) => Promise<T[]>,
        dataTransform: (res: T[], prev: T[]) => T[] = normalDataTransform<T>(),
    ) => {
        const pageState = stateFactory<number>(1)
        const dataState = stateFactory<T[]>([])
        const errorState = stateFactory<Optional<Error>>(null)
        const loadingState = stateFactory<boolean>(false)
        const isTopState = stateFactory(false)

        const job = async () => {
            if (loadingState.state) return
            loadingState.setState(true)
            errorState.setState(null)
            try {
                const data = await callback(pageState.state)
                if (data.length === 0) isTopState.setState(true)
                dataState.setState(dataTransform(data, dataState.state))
            } catch (e) {
                errorState.setState(e as Error)
            }
            loadingState.setState(false)
        }

        onInit(() => {
            job()
        })

        stateObserver(() => {
            job()
        }, pageState)

        const increment = () => pageState.setState(pageState.state + 1)

        const reset = () => {
            isTopState.setState(false)
            dataState.setState([])
            pageState.setState(1)
        }

        const previousPage = () => {
            isTopState.setState(false)
            if (pageState.state > 2) pageState.setState(pageState.state - 1)
        }

        const setPage = (page: number) => {
            isTopState.setState(false)
            if (page < 1 || Math.ceil(page) !== page)
                throw new Error('Invalid page')
            pageState.setState(page)
        }

        return {
            get data(): T[] {
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
            subscribeIsLoading: loadingState.subscribe,
            increment,
            reset,
            get page(): number {
                return pageState.state
            },
            subscribePage: pageState.subscribe,
            previousPage,
            setPage,
            get isTop() {
                return isTopState.state
            },
            subscribeIsTop: isTopState.subscribe,
        }
    }
