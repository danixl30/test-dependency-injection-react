import { InputManagerResult } from './types/input-manager-result'

export type InputManager = <T>(
    initialValue: T,
    validator: (data: T) => string,
    dataTransform: (data: T) => T,
) => InputManagerResult<T>
