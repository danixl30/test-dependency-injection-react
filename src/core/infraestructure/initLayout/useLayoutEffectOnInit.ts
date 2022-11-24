import { useLayoutEffect } from 'react'

export const useLayoutEffectInitLayout = (callback: () => void) => {
    useLayoutEffect(callback, [])
}
