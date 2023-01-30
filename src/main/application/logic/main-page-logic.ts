import { EventHandler } from '../../../core/application/event-handler/event-handler'
import { EventListener } from '../../../core/application/event-handler/listener/event-listener'
import { InitLayout } from '../../../core/application/init-layout/init-layout'
import { InputManager } from '../../../core/application/input-manager/input-manager'
import { OnInitJob } from '../../../core/application/on-init-job/on-init-job'
import { ApplicationService } from '../../../core/application/service/application-service'
import { StateObserver } from '../../../core/application/state-observers/state-observer'
import { StateFactory } from '../../../core/application/state/state-factory'
import { Post } from '../../../post/application/types/post'
import {
    MainInputChange,
    mainInputChangeEventFactory,
    MAIN_INPUT_CHANGE_EVENT,
} from '../events/main-input-change'

export const mainPageLogic = (
    stateFactory: StateFactory,
    initLayout: InitLayout,
    stateObserver: StateObserver,
    initJobFactory: OnInitJob,
    getPosts: ApplicationService<unknown, Post[]>,
    inputManager: InputManager,
    eventHandler: EventHandler,
    eventListenerFactory: EventListener,
) => {
    const postJob = initJobFactory(
        async () => await getPosts.execute(undefined),
    )
    const onEventState = stateFactory('')

    const inputState = inputManager(
        '',
        (value: string) => {
            if (value.includes('.')) return 'Not valid input'
            return ''
        },
        (value: string) => value.trim(),
    )

    eventListenerFactory(MAIN_INPUT_CHANGE_EVENT, (event: MainInputChange) => {
        console.log('from event: ', event.text)
        onEventState.setState(event.text)
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
        eventState: onEventState.state,
    }
}
