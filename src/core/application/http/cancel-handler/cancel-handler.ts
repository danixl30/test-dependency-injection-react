export type CancelHandler = {
    subscribeCancel(cancel: () => void): void
    unsubscribeCancel(cancel: () => void): void
}
