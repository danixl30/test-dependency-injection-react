import { CancelHandler } from '../../../application/http/cancel-handler/cancel-handler'
import { OnInit } from '../../../application/on-init/on-init'
import { ValueProvider } from '../../../application/value-provider/value-provider'

export const cancelHandler = (
    valueFactory: ValueProvider,
    onInit: OnInit,
): CancelHandler => {
    const cancelState = valueFactory<(() => void)[]>([])

    onInit(() => () => cancelState.value.forEach((e) => e()))

    return {
        subscribeCancel(cancel: () => void) {
            cancelState.value = [...cancelState.value, cancel]
        },
        unsubscribeCancel(cancel: () => void) {
            cancelState.value = cancelState.value.filter((e) => e !== cancel)
        },
    }
}
