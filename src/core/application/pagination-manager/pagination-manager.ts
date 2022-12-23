import { PaginationResult } from './types/pagination-result'

export type PaginationManager = <T>(
    callback: (page: number) => Promise<T[]>,
    dataTransform: (res: T[], prev: T[]) => T[],
) => PaginationResult<T>
