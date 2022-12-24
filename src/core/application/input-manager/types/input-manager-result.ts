import { Subscribe } from '../../on-init-job/on-init-job'

export type InputManagerResult<T> = {
    get value(): T
    subscribeValue: Subscribe<T>
    onChange(data: T): void
    get error(): string
    subscribeError: Subscribe<string>
}
