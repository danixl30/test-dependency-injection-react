import { CancelHandler } from '../../../application/http/cancel-handler/cancel-handler'
import { OnInit } from '../../../application/on-init/on-init'
import { StateFactory } from '../../../application/state/state-factory'

export const cancelHandler = (
    stateFactory: StateFactory,
    onInit: OnInit,
): CancelHandler => {
    const cancelState = stateFactory<(() => void)[]>([])

    onInit(() => () => cancelState.state.value.forEach((e) => e()))

    return {
        subscribeCancel(cancel: () => void) {
            cancelState.setState([...cancelState.state.value, cancel])
        },
        unsubscribeCancel(cancel: () => void) {
            cancelState.setState(
                cancelState.state.value.filter((e) => e !== cancel),
            )
        },
    }
}
