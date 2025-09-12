import type { DocumentSnapshot } from 'firebase/firestore';

import type { Post, PostDocumentData } from '@app/posts';
import type {} from '@app/posts/posts.type';
export const mapFirebaseError = (code: string): string => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/email-already-in-use':
      return 'Email already in use.';
    case 'auth/weak-password':
      return 'Password is too weak.';
    case 'auth/invalid-credential':
      return 'Invalid Credentials';
    default:
      return code;
  }
};

export const mapDocToPost = (docSnap: DocumentSnapshot<PostDocumentData>): Post => {
  if (!docSnap.exists()) {
    throw new Error(`Document with id ${docSnap.id} does not exist`);
  }

  const data = docSnap.data();
  return {
    id: docSnap.id,
    authorId: data.authorId,
    authorDisplayName: data.authorDisplayName,
    title: data.title,
    content: data.content,
    tags: data.tags,
    published: data.published,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
