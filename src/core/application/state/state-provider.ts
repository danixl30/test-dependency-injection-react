export type StateViewer<T> = {
    get value(): T
    subscribe(subs: (state: T) => void): void
}

export type StateProvider<T> = {
    state: StateViewer<T>
    setState(value: T): void
}
