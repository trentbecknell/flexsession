import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: "ARTIST" | "ENGINEER" | "ADMIN";
    };
  }

  interface User {
    role: "ARTIST" | "ENGINEER" | "ADMIN";
  }
}
