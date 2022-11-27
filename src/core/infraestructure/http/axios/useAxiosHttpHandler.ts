import axios from 'axios'
import { HttpHandler } from '../../../application/http/http-handler'
import { RequestJob } from '../../../application/http/job/request-job'
import { RequestConfiguration } from '../../../application/http/config/request-config'
import { Response } from '../../../application/http/job/response'
import { abortControllerBuilder } from './abort-builder/abort-controller-builder'

export const useAxiosHttp = (baseURL: string): HttpHandler => {
    const core = axios.create({
        baseURL,
    })
    const get = <T, U>(data: RequestConfiguration<T>): RequestJob<U> => {
        const body = data.body || {}
        const headers = data.headers || {}
        const { signal, cancel } = abortControllerBuilder.build()
        const job = async (): Promise<Response<U>> => {
            const resp = await core.get<U>(data.url, {
                params: data.queries || {},
                headers,
                signal,
                ...body,
            })
            return {
                status: resp.status,
                body: resp.data,
            }
        }
        return {
            job,
            cancel,
        }
    }

    const post = <T, U>(data: RequestConfiguration<T>): RequestJob<U> => {
        const body = data.body || {}
        const headers = data.headers || {}
        const { signal, cancel } = abortControllerBuilder.build()
        const job = async (): Promise<Response<U>> => {
            const resp = await core.post<U>(
                data.url,
                {
                    signal,
                    ...body,
                },
                {
                    headers,
                },
            )
            return {
                status: resp.status,
                body: resp.data,
            }
        }
        return {
            job,
            cancel,
        }
    }

    const put = <T, U>(data: RequestConfiguration<T>): RequestJob<U> => {
        const body = data.body || {}
        const headers = data.headers || {}
        const { signal, cancel } = abortControllerBuilder.build()
        const job = async (): Promise<Response<U>> => {
            const resp = await core.put<U>(
                data.url,
                {
                    signal,
                    ...body,
                },
                {
                    headers,
                },
            )
            return {
                status: resp.status,
                body: resp.data,
            }
        }
        return {
            job,
            cancel,
        }
    }

    const deleteReq = <T, U>(data: RequestConfiguration<T>): RequestJob<U> => {
        const body = data.body || {}
        const headers = data.headers || {}
        const { signal, cancel } = abortControllerBuilder.build()
        const job = async (): Promise<Response<U>> => {
            const resp = await core.delete<U>(data.url, {
                headers,
                signal,
                ...body,
            })
            return {
                status: resp.status,
                body: resp.data,
            }
        }
        return {
            job,
            cancel,
        }
    }

    return {
        get,
        post,
        put,
        delete: deleteReq,
    }
}
