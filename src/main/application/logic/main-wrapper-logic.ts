import { StateFactory } from '../../../core/application/state/state-factory'

export const mainWrapperLogic = (stateFactory: StateFactory) => {
    const openState = stateFactory(false)

    const onOpenClose = () => {
        openState.setState(!openState.state.value)
    }

    return {
        get openSate() {
            return openState.state
        },
        onOpenClose,
    }
}
