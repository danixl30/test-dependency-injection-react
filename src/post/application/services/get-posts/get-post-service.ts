import { Post } from '../../types/post'

export type GetPostService = {
    execute(): Promise<Post[]>
}
