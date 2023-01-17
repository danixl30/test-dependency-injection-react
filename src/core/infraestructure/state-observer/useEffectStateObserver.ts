import { useEffect } from 'react'
import { StateViewer } from '../../application/state/state-provider'

export const useEffectStateObserver = <T>(
    callback: () => (() => void) | void,
    ...states: StateViewer<T>[]
) => {
    useEffect(() => {
        const res = callback()
        return () => {
            res?.()
        }
    }, [...states.map((e) => e.value)])
}
