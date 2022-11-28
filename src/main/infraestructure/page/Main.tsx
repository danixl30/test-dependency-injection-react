import { ChangeEvent } from 'react'
import { useLayoutEffectInitLayout } from '../../../core/infraestructure/initLayout/useLayoutEffectOnInit'
import { useEffectOnInit } from '../../../core/infraestructure/on-init/useEffectOnInit'
import { useEffectStateObserver } from '../../../core/infraestructure/state-observer/useEffectStateObserver'
import { useStateFactory } from '../../../core/infraestructure/state/useStateProvider'
import { mainPageLogic } from '../../application/logic/main-page-logic'

export default function Main() {
    const { inputValue, onChangeInput } = mainPageLogic(
        useEffectOnInit,
        useLayoutEffectInitLayout,
        useStateFactory,
        useEffectStateObserver,
    )

    const onChangeInputPage = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeInput(e.target.value)
    return (
        <>
            <h1>Hello world</h1>
            <h2>{inputValue}</h2>
            <input value={inputValue} onChange={onChangeInputPage} />
        </>
    )
}
