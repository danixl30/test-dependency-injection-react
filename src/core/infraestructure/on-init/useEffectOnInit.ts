import { useEffect } from 'react'

export const useEffectOnInit = (callback: () => (() => void) | void) => {
    useEffect(() => {
        const res = callback()
        return () => {
            res?.()
        }
    }, [])
}
