import { InitLayout } from '../../../core/application/init-layout/init-layout'
import { OnInit } from '../../../core/application/on-init/on-init'
import { StateObserver } from '../../../core/application/state-observers/state-observer'
import { StateFactory } from '../../../core/application/state/state-factory'

export const mainPageLogic = (
    onInit: OnInit,
    initLayout: InitLayout,
    stateFactory: StateFactory,
    stateObserver: StateObserver,
) => {
    const inputState = stateFactory('')

    onInit(() => console.log('hello world'))
    initLayout(() => console.log('hello 2'))

    const onChangeInput = (value: string) => {
        inputState.setState(value)
    }

    stateObserver(() => console.log(inputState.state), inputState)

    return {
        onChangeInput,
        inputValue: {
            value: inputState.state,
            subscribe: inputState.subscribe,
        },
    }
}
