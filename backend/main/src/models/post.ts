import {
  getDatabase,
  ref,
  onValue,
  push,
  get,
  update,
  remove,
  set,
} from 'firebase/database';
import { dbapp } from '../firebase';

export interface Post {
  uid?: string;
  author: string;
  title: string;
  content: string;
  date?: {
    year: string;
    month: string;
    day: string;
    hr: string;
    min: string;
    sec: string;
  };
  tags: string[];
}

export interface DateTime {
  year: string;
  month: string;
  day: string;
  hr: string;
  min: string;
  sec: string;
}

//creating a post
export const createPost = async (post: Post): Promise<void> => {
  const db = getDatabase(dbapp);
  const postRef = ref(db, 'posts');

  const newPostRef = push(postRef);

  // Get the current datetime
  const now = new Date();
  const date: DateTime = {
    year: now.getFullYear().toString(),
    month: (now.getMonth() + 1).toString().padStart(2, '0'),
    day: now.getDate().toString().padStart(2, '0'),
    hr: now.getHours().toString().padStart(2, '0'),
    min: now.getMinutes().toString().padStart(2, '0'),
    sec: now.getSeconds().toString().padStart(2, '0'),
  };

  const newPost = {
    uid: newPostRef.key,
    author: post.author,
    title: post.title,
    content: post.content,
    date,
    tags: post.tags,
  };

  await update(newPostRef, newPost);
  //return newPost;
};

export const deletePost = async (uid: string): Promise<void> => {
  const db = getDatabase(dbapp);
  //const postRef = ref(db, "posts/" + uid);
  //const postRef = child(ref(db, 'posts'), uid);
  console.log('uid is ', uid);
  const postRef = ref(db, 'posts/' + encodeURIComponent(uid.trim()));

  console.log(postRef.toString());
  await remove(postRef);
};

export const getPost = async (postId: string): Promise<Post | null> => {
  const db = getDatabase();
  const postRef = ref(db, `posts/${postId}`);

  try {
    const snapshot = await get(postRef);

    if (snapshot.exists()) {
      const post = snapshot.val();
      return { ...post, postId };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const isUserAuthorized = (username: string, post: Post): boolean => {
  return post.author === username;
};

// export const getAllPosts = (callback: (posts: any) => void) => {
//   const db = getDatabase(dbapp);
//   const postRef = ref(db, 'posts');

//   const unsub = onValue(postRef, (snapshot) => {
//     const posts = snapshot.val();
//     callback(posts);
//     // unsub();
//   });
// };

export const getAllPosts = async (): Promise<Post[]> => {
  const db = getDatabase(dbapp);
  const postRef = ref(db, 'posts');
  const snapshot = (await get(postRef)).val();
  return snapshot;
};

export const updatePostContent = async (
  uid: string,
  content: string,
  username: string
): Promise<void | null> => {
  const db = getDatabase(dbapp);
  const postRef = ref(db, 'posts/' + encodeURIComponent(uid));

  // Retrieve the post data from the database
  const snapshot = await get(postRef);

  // Check the author's name
  if (snapshot.exists() && snapshot.val().author === username) {
    // Update the post content
    await update(postRef, {
      content,
    });
  } else {
    return null;
  }
};
