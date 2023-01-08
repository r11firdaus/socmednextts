import UserTypes from "./users"

interface PostsTypes extends UserTypes {
  id: number|string,
  content: string,
  created_at: string
}

export default PostsTypes