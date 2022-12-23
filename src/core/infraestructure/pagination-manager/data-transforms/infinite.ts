export const infiniteDataTransform =
    <T>() =>
    (res: T[], prev: T[]): T[] =>
        [...prev, ...res]
