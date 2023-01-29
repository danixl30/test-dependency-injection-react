import { useEffect, useRef } from 'react'
import { StateViewer } from '../../application/state/state-provider'

export const useEffectStateObserver = <T>(
    callback: () => (() => void) | void,
    ...states: StateViewer<T>[]
) => {
    if (states.length === 0) return
    const firstTime = useRef(true)
    useEffect(() => {
        if (firstTime.current) {
            firstTime.current = false
            return
        }
        const res = callback()
        return () => {
            res?.()
        }
    }, [...states.map((e) => e.value)])
}
