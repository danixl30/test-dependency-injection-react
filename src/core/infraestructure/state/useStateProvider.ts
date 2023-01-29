import { useEffect, useRef, useState } from 'react'
import { StateProvider } from '../../application/state/state-provider'

export const useStateFactory = <T>(initialize: T): StateProvider<T> => {
    const subscriptors = useRef<((value: T) => void)[]>([])
    const firstTime = useRef(true)
    const isMounted = useRef(true)
    const [state, setState] = useState<T>(initialize)

    useEffect(() => {
        if (firstTime.current) {
            firstTime.current = false
            return
        }
        subscriptors.current.forEach((e) => e(state))
    }, [state])

    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    return {
        state: {
            get value() {
                return state
            },
            subscribe(callback: (value: T) => void) {
                subscriptors.current.push(callback)
            },
        },
        setState(value: T) {
            if (!isMounted.current) return
            setState(value)
        },
    }
}
