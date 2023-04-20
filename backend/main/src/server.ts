import express, { Request, Response } from 'express';
import session, { SessionOptions } from 'express-session';
import passport from 'passport';
import passportlocal from 'passport-local';
import { compare } from 'bcryptjs';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import serverless from 'serverless-http';

import {
  User,
  createUser,
  getUserById,
  getUserByUsername,
  updatePassword,
} from './models/user';
import {
  createPost,
  deletePost,
  updatePostContent,
  getAllPosts,
} from './models/post';

const IS_SERVER = process.env.ENVIRONMENT === 'lambda';
const STAGE = 'v1';

const app = express();
app.use(express.json());
if (!IS_SERVER)
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const sessionOptions: SessionOptions = {
  secret: 'BlogSecret',
  resave: false,
  saveUninitialized: false,
};

const LocalStrategy = passportlocal.Strategy;

app.use(session(sessionOptions));

app.use(cookieParser());

//Setting up Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async (username: string, password: string, done: any) => {
    const user = await getUserByUsername(username);

    if (!user) {
      return done(null, false, { message: 'Invalid username' });
    }

    try {
      const matchRes = await compare(password, user.password);

      if (matchRes) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (uid: string, done) => {
  const user = await getUserById(uid);

  if (user) {
    return done(null, user);
  }

  return done(null, { message: 'User not found' });
});

//Routes
// POST API endpoint to add a new user
app.get(IS_SERVER ? `/${STAGE}/` : '/', (req, res) => {
  res.send('Welcome');
});

app.post(
  IS_SERVER ? `/${STAGE}/register` : '/register',
  async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req?.body;

      if (
        !username ||
        !password ||
        typeof username !== 'string' ||
        typeof password !== 'string'
      ) {
        res.send('Please enter correct value types');
        return;
      }

      const user = await getUserByUsername(username);

      if (user) {
        res.status(409).json({ message: 'This username is already taken' });
        return;
      } else {
        // Create a new user object
        const newUser = { username, email, password };

        // Add the new user to the database
        await createUser(newUser);
        res.status(201).json({ message: 'User created successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  }
);

app.post(
  IS_SERVER ? `/${STAGE}/login` : '/login',
  passport.authenticate('local'),
  (req: Request, res: Response) => {
    res.send(req.user);
  }
);

app.get(
  IS_SERVER ? `/${STAGE}/user` : '/user',
  (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      res.send(req.user);
    } else {
      res.status(401).send('Unauthorized');
    }
  }
);

app.get(
  IS_SERVER ? `/${STAGE}/logout` : '/logout',
  (req: Request, res: Response) => {
    req.logout(() => {
      res.send('success');
    });
  }
);

app.post(
  IS_SERVER ? `/${STAGE}/createposts` : '/createposts',
  async (req: Request, res: Response) => {
    try {
      const { author, title, content, tags } = req?.body;

      // Create a new user object
      const newPost = { author, title, content, tags };

      // Add the new user to the database
      await createPost(newPost);
      res.status(201).json({ message: 'Post creation successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Post creation failed' });
    }
  }
);

app.delete(
  IS_SERVER ? `/${STAGE}/posts/:postId` : '/posts/:postId',
  async (req, res) => {
    const postId = req.params.postId;
    try {
      await deletePost(postId);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete post' });
    }
  }
);

// app.get('/posts', (req, res) => {
//   console.log('how many times?');
//   getAllPosts((posts) => {
//     res.send(posts);
//   });
// });

app.get(IS_SERVER ? `/${STAGE}/posts` : '/posts', async (req, res) => {
  const posts = await getAllPosts();
  res.send(posts);
});

app.patch(
  IS_SERVER ? `/${STAGE}/posts/:postId` : '/posts/:postId',
  async (req, res) => {
    const { postId } = req.params;
    const { username, content } = req.body;

    try {
      await updatePostContent(postId, content, username);
      res.status(200).json({ message: 'Post content updated successfully.' });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'An error occurred while updating the post content.' });
    }
  }
);

app.patch(
  IS_SERVER
    ? `/${STAGE}/user/updatePassword/:userId`
    : '/user/updatePassword/:userId',
  async (req, res) => {
    const { userId } = req.params;
    const { activeUser, newPassword } = req.body;

    try {
      await updatePassword(userId, activeUser, newPassword);
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: 'An error occurred while updating the user password' });
    }
  }
);

if (IS_SERVER) {
  module.exports.handler = serverless(app);
} else
  app.listen(4000, () => {
    console.log('Server started successfully');
  });
