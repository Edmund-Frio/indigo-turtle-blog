import {
  getDatabase,
  ref,
  push,
  get,
  update,
  query,
  orderByChild,
  limitToFirst,
  equalTo,
} from 'firebase/database';
import { hash } from 'bcrypt';
import { dbapp } from '../firebase';

export interface User {
  uid?: string;
  username: string;
  email: string;
  password: string;
}

//creating a user
export const createUser = async (user: User): Promise<void> => {
  const db = getDatabase(dbapp);
  //const userRef = ref(db, 'users/' + user.email.replace('.', ','));
  const userRef = ref(db, 'users');
  const hashedPassword = await hash(user.password, 10);

  const newUserRef = push(userRef);

  const newUser = {
    uid: newUserRef.key,
    username: user.username,
    email: user.email,
    password: hashedPassword,
  };

  await update(newUserRef, newUser);
};

//Retrieve a user by their id
export const getUserById = async (uid: string): Promise<User | null> => {
  const db = getDatabase(dbapp);
  console.log(uid);
  //const userRef = ref(db, `users/${uid}`);
  const userRef = ref(db, 'users/' + encodeURIComponent(uid));
  const snapshot = await get(userRef);
  const userData = snapshot.val();
  if (userData) {
    const user: User = { uid, ...userData };
    return user;
  }
  return null;
};

// Retrieve user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const db = getDatabase();
  //const db = database;
  const usersRef = ref(db, 'users');
  const q = query(
    usersRef,
    orderByChild('email'),
    equalTo(email),
    limitToFirst(1)
  );
  const querySnapshot = await get(q);
  const userObj = querySnapshot.val();
  if (!userObj) {
    return null;
  }
  const uid = Object.keys(userObj)[0];
  const user = userObj[uid];
  return { uid, ...user };
};

// Retrieve a user by their username
export const getUserByUsername = async (
  username: string
): Promise<User | null> => {
  const db = getDatabase(dbapp);
  const usersRef = ref(db, 'users');
  const queryConstraints = [orderByChild('username'), equalTo(username)];
  const q = query(usersRef, ...queryConstraints);
  const snapshot = await get(q);
  //console.log('snapshot:', snapshot.val());

  if (!snapshot.exists()) {
    return null;
  }

  const userData = Object.values(snapshot.val())[0] as User;

  const user = {
    uid: userData.uid,
    username: userData.username,
    email: userData.email,
    password: userData.password,
  };

  return user;
};

export const updatePassword = async (
  uid: string,
  activeUser: string,
  newPassword: string
): Promise<void | null> => {
  const db = getDatabase(dbapp);
  const userRef = ref(db, 'users/' + encodeURIComponent(uid));

  const snapshot = await get(userRef);

  if (snapshot.exists() && snapshot.val().username === activeUser) {
    const hashedPassword = await hash(newPassword, 10);
    await update(userRef, {
      password: hashedPassword,
    });
  } else {
    return null;
  }
};
