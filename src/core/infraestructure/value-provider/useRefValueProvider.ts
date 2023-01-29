import { useRef } from 'react'
import { ValueProvider } from '../../application/value-provider/value-provider'

export const useRefValueProvider =
    (): ValueProvider =>
    <T>(initialValue: T) => {
        const ref = useRef<T>(initialValue)

        return {
            get value(): T {
                return ref.current
            },
            set value(value: T) {
                ref.current = value
            },
        }
    }
