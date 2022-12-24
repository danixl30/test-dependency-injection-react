import { Optional } from '../../../../utils/optional/optional'
import { Subscribe } from '../../on-init-job/on-init-job'

export type PaginationResult<T> = {
    get data(): T[]
    subscribeData: Subscribe<T[]>
    get error(): Optional<Error>
    subscribeError: Subscribe<Optional<Error>>
    get isLoading(): boolean
    subscribeIsLoading: Subscribe<boolean>
    get page(): number
    subscribePage: Subscribe<number>
    reset(): void
    increment(): void
    previousPage(): void
    setPage(page: number): void
    get isTop(): boolean
    subscribeIsTop: Subscribe<boolean>
}
