export type ValueProvider = <T>(initialValue: T) => {
    get value(): T
    set value(value: T)
}
