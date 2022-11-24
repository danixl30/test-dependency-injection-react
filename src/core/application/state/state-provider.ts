export type StateProvider<T> = {
    get state(): T
    setState(value: T): void
    subscribe(subs: (state: T) => void): void
}
