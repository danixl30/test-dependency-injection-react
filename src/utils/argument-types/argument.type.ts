export type ArgumentTypes<F extends Function> = F extends (
    ...args: infer A
) => any
    ? Partial<A>
    : never
