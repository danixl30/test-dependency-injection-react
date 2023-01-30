import { Post } from '../types/post'

export type PostRepository = {
    getAll(): Promise<Post[]>
}
