import React, { createContext, ReactNode } from 'react';

// todo: context is working on accountpage but is not working in postspage, why is that the case.

export const myContext = createContext<Partial<User>>({});
export default function Context({
  children,
  user,
}: {
  children: ReactNode;
  user: User | undefined;
}): JSX.Element {
  return <myContext.Provider value={user ?? {}}>{children}</myContext.Provider>;
}
