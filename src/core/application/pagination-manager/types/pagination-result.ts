import { Optional } from '../../../../utils/optional/optional'

export type PaginationResult<T> = {
    get data(): T[]
    subscribeData(callback: (data: T[]) => void): void
    get error(): Optional<Error>
    subscribeError(callback: (e: Optional<Error>) => void): void
    get isLoading(): boolean
    subscribeIsLoading(callback: (loa: boolean) => void): void
    get page(): number
    subscribePage(callback: (page: number) => void): void
    reset(): void
    increment(): void
}
