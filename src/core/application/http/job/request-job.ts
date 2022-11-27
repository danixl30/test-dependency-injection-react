import { Response } from './response'

export type RequestJob<T> = {
    job(): Promise<Response<T>>
    cancel(): void
}
