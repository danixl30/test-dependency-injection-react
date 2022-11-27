import { Dicctionary } from '../../../../utils/dicctionary/dicctionary'

export type RequestConfiguration<T> = {
    url: string
    body?: T
    headers?: Dicctionary<string>
    queries?: Dicctionary<string>
}
