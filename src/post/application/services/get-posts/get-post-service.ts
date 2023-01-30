import { PostRepository } from '../../repositories/post-repository'
import { GetPostApplicatoinService } from './type/GetPostApplicationService'

export const getPostService = (
    postRepository: PostRepository,
): GetPostApplicatoinService => {
    const execute = (_?: unknown) => {
        return postRepository.getAll()
    }

    return {
        execute,
    }
}
