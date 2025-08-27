import { addDoc, collection, DocumentReference, getDoc, serverTimestamp } from 'firebase/firestore';

import type { Post, PostInput } from './posts.type';

import { firestore } from '@app/index';

const POSTS_COLLECTION = 'posts';

export const postsServices = {
  createPost: async (postInput: PostInput, authorId: string): Promise<Post> => {
    const postCollectionRef = collection(firestore, POSTS_COLLECTION);

    const payload = {
      ...postInput,
      authorId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const postRef: DocumentReference = await addDoc(postCollectionRef, payload);

    const postDoc = await getDoc(postRef);
    if (!postDoc.exists()) throw new Error('Failed to read created post');

    return postDoc.data() as Post;
  },
};
