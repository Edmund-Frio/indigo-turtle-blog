import React, { useContext } from 'react';
import { Button, Grid, Typography, useTheme } from '@mui/material';
import { NavigateFunction } from 'react-router-dom';
import { myContext } from 'components/Context';

const handleMyPost = (
  username: string,
  posts: Post[],
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
): void => {
  const usersPosts: Post[] = [];
  posts.forEach((post) => {
    if (post.author === username) {
      usersPosts.push(post);
    }
  });
  setPosts(usersPosts);
};

export const NavUser = ({
  navigate,
  username,
  posts,
  setPosts,
  setUser,
}: {
  navigate: NavigateFunction;
  username: string;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}): JSX.Element => {
  const theme = useTheme();
  const ctx = useContext(myContext);

  const logout = (): void => {
    setUser(undefined);
    navigate('/');
  };

  return (
    <Grid
      item
      className="navbar"
      xs
      container
      justifyContent="space-evenly"
      alignItems="center"
      style={{
        backgroundColor: theme.palette.secondary.dark,
      }}
    >
      <Typography
        variant="h5"
        component="h3"
        color={theme.palette.secondary.contrastText}
      >
        {username}
      </Typography>
      <Grid
        item
        container
        direction="column"
        p={1}
        gap={2}
        className="navbar__buttons"
      >
        <Button
          variant="contained"
          className="my-posts-button"
          onClick={(e) =>
            ctx.username !== undefined
              ? handleMyPost(ctx.username, posts, setPosts)
              : console.error('User has not made any post')
          }
          color="secondary"
        >
          My Posts
        </Button>
        <Button
          variant="contained"
          className="createpost"
          onClick={(e) => navigate('../createpost')}
          color="secondary"
        >
          Create Post
        </Button>
        <Button
          variant="contained"
          className="accounts"
          onClick={(e) => navigate('../account')}
          color="secondary"
        >
          Accounts
        </Button>
      </Grid>
      <Button onClick={logout}>
        <Typography color="hsla(0, 100%, 0%, 0.5)">Sign out</Typography>
      </Button>
    </Grid>
  );
};
