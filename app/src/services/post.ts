import { getAsync, putAsync, postAsync } from '../helpers/apiHelpers'
import Post from '../models/Post'
import Service from './service'

const endpoint = 'post'

class PostApiServices extends Service {
  getPostsAsync() {
    return getAsync(this.forgeUrl(`${endpoint}`))
  }
  getPostByIdAsync(uuid: String) {
    return getAsync(this.forgeUrl(`${endpoint}/${uuid}`))
  }
  createPostAsync(Post: Post) {
    return postAsync(this.forgeUrl(`${endpoint}`), { Post: Post })
  }
  updatePostAsync(uuid: String, Post: Post) {
    return putAsync(this.forgeUrl(`${endpoint}/${uuid}`), { Post: Post })
  }
}

export default new PostApiServices()
