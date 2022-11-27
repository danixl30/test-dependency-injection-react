import { RequestConfiguration } from './config/request-config'
import { RequestJob } from './job/request-job'

export type HttpHandler = {
    get<T, U>(config: RequestConfiguration<T>): RequestJob<U>
    post<T, U>(config: RequestConfiguration<T>): RequestJob<U>
    put<T, U>(config: RequestConfiguration<T>): RequestJob<U>
    delete<T, U>(config: RequestConfiguration<T>): RequestJob<U>
}
