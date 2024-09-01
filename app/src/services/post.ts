import { getAsync, putAsync, postAsync } from '../helpers/apiHelpers'
import Post from '../models/Post'
import Service from './service'

const endpoint = 'api/post'
const isDev = process.env.NODE_ENV === 'development'

class PostApiServices extends Service {
  getPostsAsync() {
    return getAsync<Post[]>(this.forgeUrl(`${endpoint}`))
  }
  getPostByIdAsync(uuid: String) {
    return getAsync<Post>(this.forgeUrl(`${endpoint}/${uuid}`))
  }
  async createPostAsync(Post: Post) {
     
    try {
      const res = await postAsync(this.forgeUrl(`${endpoint}`), { Post: Post })
      return res;
    } catch (error) {
      if(isDev)console.error(error) 
      throw error;   
    }
  }
  updatePostAsync(uuid: String, Post: Post) {
    return putAsync(this.forgeUrl(`${endpoint}/${uuid}`), { Post: Post })
  }
}

export default new PostApiServices()
