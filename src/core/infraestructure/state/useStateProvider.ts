import { useEffect, useState } from 'react'
import { StateProvider } from '../../application/state/state-provider'

export const useStateFactory = <T>(initialize: T): StateProvider<T> => {
    const [subcriptors, setSubscriptors] = useState<((value: T) => void)[]>([])
    const [state, setState] = useState<T>(initialize)

    useEffect(() => subcriptors.forEach((e) => e(state)), [state])

    return {
        get state(): T {
            return state
        },
        subscribe(callback: (value: T) => void) {
            setSubscriptors([...subcriptors, callback])
        },
        setState(value: T) {
            setState(value)
        },
    }
}
