import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabaseAdmin } from "@/lib/supabase";

export const authOptions: NextAuthOptions = {
  providers: [
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

        // Return user object for session
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // We'll need to extend Session type for this
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login', // We will create this
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
