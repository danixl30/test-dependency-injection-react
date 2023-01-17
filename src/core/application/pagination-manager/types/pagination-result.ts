import { Optional } from '../../../../utils/optional/optional'
import { StateViewer } from '../../state/state-provider'

export type PaginationResult<T> = {
    data: StateViewer<T[]>
    error: StateViewer<Optional<Error>>
    isLoading: StateViewer<boolean>
    page: StateViewer<number>
    isTop: StateViewer<boolean>
    reset(): void
    increment(): void
    previousPage(): void
    setPage(page: number): void
}
