export type ApplicationService<T, U> = {
    execute(data: T): Promise<U>
}
