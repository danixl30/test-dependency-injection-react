import { ApplicationService } from '../../../../../core/application/service/application-service'
import { Post } from '../../../types/post'

export type GetPostApplicatoinService = ApplicationService<unknown, Post[]>
