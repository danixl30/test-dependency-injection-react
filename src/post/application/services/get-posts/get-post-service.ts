import { ApplicationService } from '../../../../core/application/service/application-service'
import { PostRepository } from '../../repositories/post-repository'
import { Post } from '../../types/post'

export const getPostService = (
    postRepository: PostRepository,
): ApplicationService<unknown, Post[]> => {
    const execute = (_?: unknown) => {
        return postRepository.getAll()
    }

    return {
        execute,
    }
}
