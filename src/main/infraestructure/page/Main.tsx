import { ChangeEvent } from 'react'
import { useAxiosHttp } from '../../../core/infraestructure/http/axios/useAxiosHttpHandler'
import { cancelHandler } from '../../../core/infraestructure/http/cancel-handler/cancelHandler'
import { useLayoutEffectInitLayout } from '../../../core/infraestructure/initLayout/useLayoutEffectOnInit'
import { nativeOnInitJob } from '../../../core/infraestructure/on-init-job/nativeOnInitJob'
import { useEffectOnInit } from '../../../core/infraestructure/on-init/useEffectOnInit'
import { useEffectStateObserver } from '../../../core/infraestructure/state-observer/useEffectStateObserver'
import { useStateFactory } from '../../../core/infraestructure/state/useStateProvider'
import { getPostsJSONPlaceHolder } from '../../../post/infraestructure/services/get-posts/getPosts'
import { mainPageLogic } from '../../application/logic/main-page-logic'

export default function Main() {
    const { inputValue, onChangeInput, posts, isLoadingPosts, errorPosts } =
        mainPageLogic(
            useEffectOnInit,
            useLayoutEffectInitLayout,
            useStateFactory,
            useEffectStateObserver,
            nativeOnInitJob(
                useStateFactory,
                useEffectStateObserver,
                useEffectOnInit,
            ),
            getPostsJSONPlaceHolder(
                useAxiosHttp('https://my-json-server.typicode.com/'),
                cancelHandler(useStateFactory, useEffectOnInit),
            ),
        )

    const onChangeInputPage = (e: ChangeEvent<HTMLInputElement>) =>
        onChangeInput(e.target.value)
    if (isLoadingPosts) return <h1>Loading...</h1>
    if (errorPosts) return <h1>Error on fetch posts</h1>
    return (
        <>
            <h1>Hello world</h1>
            <h2>{inputValue}</h2>
            <input value={inputValue} onChange={onChangeInputPage} />
            {posts?.map((e) => (
                <div key={e.id}>{e.title}</div>
            ))}
        </>
    )
}
