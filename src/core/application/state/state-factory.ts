import { StateProvider } from './state-provider'

export type StateFactory = <T>(initialValue: T) => StateProvider<T>
