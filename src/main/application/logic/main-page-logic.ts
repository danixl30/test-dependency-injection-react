import { InitLayout } from '../../../core/application/init-layout/init-layout'
import { OnInitJob } from '../../../core/application/on-init-job/on-init-job'
import { OnInit } from '../../../core/application/on-init/on-init'
import { StateObserver } from '../../../core/application/state-observers/state-observer'
import { StateFactory } from '../../../core/application/state/state-factory'
import { GetPostService } from '../../../post/application/services/get-posts/get-post-service'

export const mainPageLogic = (
    onInit: OnInit,
    initLayout: InitLayout,
    stateFactory: StateFactory,
    stateObserver: StateObserver,
    initJobFactory: OnInitJob,
    getPosts: GetPostService,
) => {
    const postJob = initJobFactory(async () => await getPosts.execute())

    const inputState = stateFactory('')

    onInit(() => console.log('hello world'))
    initLayout(() => console.log('hello 2'))

    const onChangeInput = (value: string) => {
        inputState.setState(value)
    }

    stateObserver(() => console.log(inputState.state), inputState)

    return {
        onChangeInput,
        get inputValue() {
            return inputState.state
        },
        subscribeChangeInput: inputState.subscribe,
        get posts() {
            return postJob.data
        },
        get errorPosts() {
            return postJob.error
        },
        get isLoadingPosts() {
            return postJob.isLoading
        },
        subscribePosts: postJob.subscribeData,
        subscribeErrorPost: postJob.subscribeError,
        subscribeIsLoadingPost: postJob.subscribeLoading,
    }
}
