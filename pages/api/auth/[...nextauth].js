import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
  adapter: FirestoreAdapter({
    apiKey: "AIzaSyAiyufszihjEAMX1IDuqtJK4tV-tsmxkQ4",
    authDomain: "devlist-62e12.firebaseapp.com",
    projectId: "devlist-62e12",
    storageBucket: "devlist-62e12.appspot.com",
    messagingSenderId: "683653394353",
    appId: "1:683653394353:web:c6114ee19c65b724e31790",
  }),
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
};
export default NextAuth(authOptions);
