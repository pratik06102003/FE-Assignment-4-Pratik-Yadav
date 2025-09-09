export type {
  Post,
  PostCreatePayload,
  PostQueryParams,
  PostUpdatePayload,
  PostsPage,
  PostDocumentData,
} from './posts.type';
export {
  getPosts,
  getPostById,
  getPostsByUser,
  deletePost,
  updatePost,
  createPost,
} from './posts.services';
