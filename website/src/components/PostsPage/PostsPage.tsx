import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  SetStateAction,
} from 'react';

import { fetchPosts } from 'utils/fetchPosts';
import { Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { myContext } from 'components/Context';

import { NavUser } from './NavUser';
import { NavGuest } from './NavGuest';
import { PostOverlay } from './PostOverlay';
import { createPosts } from './createPosts';

export function PostsPage({
  setUser,
}: {
  setUser: React.Dispatch<SetStateAction<User | undefined>>;
}): JSX.Element {
  const theme = useTheme();
  const ctx = useContext(myContext);

  const [pageN, setPageN] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [popIsOpen, setPopIsOpen] = useState(false);
  const [focusPost, setFocusPost] = useState<Post | null>(null);
  const postComps = useRef<HTMLDivElement[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // This function will run when page is first initialized and when pageN is updated
    const set = async (): Promise<void> => {
      const posts = await fetchPosts();
      setPosts(posts);
    };
    set().catch((err) => console.log(err));
  }, [pageN]);

  return (
    <Grid
      className="postspage"
      direction="row-reverse"
      container
      gap={2}
      style={{ height: '100vh' }}
    >
      {ctx.username !== undefined ? (
        <NavUser
          navigate={navigate}
          username={ctx.username}
          posts={posts}
          setPosts={setPosts}
          setUser={setUser}
        />
      ) : (
        <NavGuest navigate={navigate} />
      )}
      <Grid
        item
        className="posts"
        xs={9}
        direction="column"
        container
        spacing={2}
        pt={3}
        style={{
          height: '100vh',
          overflow: 'scroll',
        }}
      >
        {createPosts(theme, posts, postComps, setPopIsOpen, setFocusPost)}
      </Grid>
      <Grid>
        {focusPost === null ? (
          ''
        ) : (
          <PostOverlay
            popIsOpen={popIsOpen}
            setPopIsOpen={setPopIsOpen}
            post={focusPost}
          />
        )}
      </Grid>
    </Grid>
  );
}
