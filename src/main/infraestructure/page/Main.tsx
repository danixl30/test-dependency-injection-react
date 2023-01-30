import { ChangeEvent } from 'react'
import { getEventContext } from '../../../core/infraestructure/event-handler/context/EventProvider'
import { eventListenerFactory } from '../../../core/infraestructure/event-handler/listener/event-listener-factory'
import { useAxiosHttp } from '../../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { cancelHandler } from '../../../core/infraestructure/http/cancel-handler/cancelHandler'
import { useLayoutEffectInitLayout } from '../../../core/infraestructure/initLayout/useLayoutEffectOnInit'
import { useInputManager } from '../../../core/infraestructure/input-manager/useInputManager'
import { nativeOnInitJob } from '../../../core/infraestructure/on-init-job/nativeOnInitJob'
import { useEffectOnInit } from '../../../core/infraestructure/on-init/useEffectOnInit'
import { useEffectStateObserver } from '../../../core/infraestructure/state-observer/useEffectStateObserver'
import { useStateFactory } from '../../../core/infraestructure/state/useStateProvider'
import { useRefValueProvider } from '../../../core/infraestructure/value-provider/useRefValueProvider'
import { getPostsJSONPlaceHolder } from '../../../post/infraestructure/services/get-posts/getPosts'
import { mainPageLogic } from '../../application/logic/main-page-logic'

export default function Main() {
    const {
        inputValue,
        onChangeInput,
        posts,
        isLoadingPosts,
        errorPosts,
        errorInput,
        eventState,
    } = mainPageLogic(
        useStateFactory,
        useLayoutEffectInitLayout,
        useEffectStateObserver,
        nativeOnInitJob(
            useStateFactory,
            useEffectStateObserver,
            useEffectOnInit,
        ),
        getPostsJSONPlaceHolder(
            useAxiosHttp('https://my-json-server.typicode.com/'),
            cancelHandler(useRefValueProvider(), useEffectOnInit),
        ),
        useInputManager(useStateFactory),
        getEventContext(),
        eventListenerFactory(useEffectOnInit, getEventContext()),
    )

    const onChangeInputPage = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeInput(e.target.value)
    if (isLoadingPosts.value) return <h1>Loading...</h1>
    if (errorPosts.value) return <h1>Error on fetch posts</h1>
    return (
        <>
            <h1>Hello world</h1>
            <h2>{inputValue.value}</h2>
            {errorInput.value && (
                <>
                    <h3>{errorInput.value}</h3>
                </>
            )}
            <input value={inputValue.value} onChange={onChangeInputPage} />
            <p>{eventState.value}</p>
            {posts.value?.map((e) => (
                <div key={e.id}>{e.title}</div>
            ))}
        </>
    )
}
