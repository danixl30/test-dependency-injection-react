import { InputManager } from '../../application/input-manager/input-manager'
import { StateFactory } from '../../application/state/state-factory'

export const useInputManager =
    (stateFactory: StateFactory): InputManager =>
    <T>(
        initialValue: T,
        validator: (d: T) => string = (_: T) => '',
        dataTransform: (d: T) => T = (d: T) => d,
    ) => {
        const inputState = stateFactory<T>(initialValue)
        const errorState = stateFactory('')

        const onChange = (value: T) => {
            const transformed = dataTransform(value)
            inputState.setState(transformed)
            errorState.setState(validator(transformed))
        }

        return {
            value: inputState.state,
            error: errorState.state,
            onChange,
        }
    }
