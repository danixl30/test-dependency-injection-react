import { StateViewer } from '../../state/state-provider'

export type InputManagerResult<T> = {
    value: StateViewer<T>
    error: StateViewer<string>
    onChange(data: T): void
}
