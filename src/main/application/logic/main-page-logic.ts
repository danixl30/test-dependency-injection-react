import { EventHandler } from '../../../core/application/event-handler/event-handler'
import { InitLayout } from '../../../core/application/init-layout/init-layout'
import { InputManager } from '../../../core/application/input-manager/input-manager'
import { OnInitJob } from '../../../core/application/on-init-job/on-init-job'
import { OnInit } from '../../../core/application/on-init/on-init'
import { StateObserver } from '../../../core/application/state-observers/state-observer'
import { StateFactory } from '../../../core/application/state/state-factory'
import { GetPostService } from '../../../post/application/services/get-posts/get-post-service'
import {
    MainInputChange,
    mainInputChangeEventFactory,
    MAIN_INPUT_CHANGE_EVENT,
} from '../events/main-input-change'

export const mainPageLogic = (
    onInit: OnInit,
    initLayout: InitLayout,
    stateFactory: StateFactory,
    stateObserver: StateObserver,
    initJobFactory: OnInitJob,
    getPosts: GetPostService,
    inputManager: InputManager,
    eventHandler: EventHandler,
) => {
    const postJob = initJobFactory(async () => await getPosts.execute())

    const inputState = inputManager(
        '',
        (value: string) => {
            if (value.includes('.')) return 'Not valid input'
            return ''
        },
        (value: string) => value.trim(),
    )

    onInit(() => {
        const onChangeInputEventSubscription = eventHandler.subscribe(
            MAIN_INPUT_CHANGE_EVENT,
            (event: MainInputChange) => {
                console.log('from event: ', event.text)
            },
        )
        return () => {
            onChangeInputEventSubscription()
        }
    })
    initLayout(() => console.log('hello 2'))

    stateObserver(
        () =>
            eventHandler.publish(
                mainInputChangeEventFactory(inputState.value.value),
            ),
        inputState.value,
    )

    return {
        onChangeInput: inputState.onChange,
        inputValue: inputState.value,
        posts: postJob.data,
        errorPosts: postJob.error,
        isLoadingPosts: postJob.isLoading,
        errorInput: inputState.error,
    }
}
