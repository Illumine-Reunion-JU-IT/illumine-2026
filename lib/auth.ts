import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { supabaseAdmin } from "@/lib/supabase";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-client-secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        phone: { label: "Phone", type: "text", placeholder: "9876543210" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.phone) {
          throw new Error("Please enter both email and phone number.");
        }

        const { data: user, error } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .eq('phone', credentials.phone)
          .single();

        if (error || !user) {
          throw new Error("No user found with the provided email and phone number. Access denied.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        try {
          const { data: dbUser } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('email', token.email)
            .single();

          if (dbUser) {
            token.role = dbUser.role;
            token.id = dbUser.id;
          } else {
            token.role = 'external';
          }
        } catch (err) {
          console.error("Error looking up Google user in DB:", err);
          token.role = 'external';
        }
      } else if (user) {
        token.role = (user as { role?: string }).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          (session.user as { role?: string }).role = token.role as string;
          (session.user as { id?: string }).id = token.id as string;
        }
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
