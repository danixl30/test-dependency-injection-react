import { CancelHandler } from '../../../../core/application/http/cancel-handler/cancel-handler'
import { HttpHandler } from '../../../../core/application/http/http-handler'
import { GetPostService } from '../../../application/services/get-posts/get-post-service'
import { Post } from '../../../application/types/post'

export const getPostsJSONPlaceHolder = (
    http: HttpHandler,
    cancelHandler: CancelHandler,
): GetPostService => {
    const execute = async (): Promise<Post[]> => {
        const { job, cancel } = http.get<unknown, Post[]>({
            url: '/danixl30/db-jsonplaceholder/posts',
        })
        cancelHandler.subscribeCancel(cancel)
        const res = await job()
        cancelHandler.unsubscribeCancel(cancel)
        return res.body
    }

    return {
        execute,
    }
}
