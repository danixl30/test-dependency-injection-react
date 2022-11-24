import { useEffect } from 'react'
import { StateProvider } from '../../application/state/state-provider'

export const useEffectStateObserver = <T>(
    callback: () => (() => void) | void,
    ...states: StateProvider<T>[]
) => {
    useEffect(() => {
        const res = callback()
        return () => {
            res?.()
        }
    }, [...states.map((e) => e.state)])
}
