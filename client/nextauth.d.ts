import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    uid: string;
    email: string;
    username: string;
    openaiApiKey?: string;
    sessionToken?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid: string;
    email: string;
    username: string;
    openaiApiKey?: string;
    sessionToken?: string;
  }
}
