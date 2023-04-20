import { z } from 'zod';

import { isPost } from './isPost';

import * as posts from 'post-objects.json';
import axios from 'axios';
import { SERVER_URL } from 'utils/constants';

export async function fetchPosts(): Promise<Post[]> {
  const res = await axios.get(`${SERVER_URL}/posts`);
  const json: unknown = { posts: Object.values(res.data) };

  const schema = z.object({
    posts: z.unknown().array(),
  });

  console.log(new Date().getSeconds());

  const result = schema.safeParse(json);
  // FIXME: Kinda convoluted, might be a good idea to delete isPost and move everything to fetchPosts if no one else needs isPost
  if (result.success) {
    return result.data.posts.filter((el: unknown) => isPost(el)) as Post[];
  } else {
    console.error('Error: Invalid object received from server.');
    return [];
  }
}
