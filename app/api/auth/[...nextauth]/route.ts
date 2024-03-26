import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "../../../../prisma/client"
import Stripe from 'stripe';
 

export const authOptions:AuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process?.env?.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
    }),
  ],

    callbacks: {
  		async session({ session, user }) {
 			return Promise.resolve({
  				...session,
  				user: {
 					...session.user,
  					id: user.id,
  				},
  			});
  		},
  	},
  
  events: {
    createUser: async ({ user }) => {

      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2023-10-16"
      })
      if (user.email && user.name) {
        const customer = await stripe.customers.create({
          email: user.email||undefined,
          name: user.name||undefined
        })
        await prisma.user.update({
          where: { id: user.id },
          data: { stripeCustomersID: customer.id }
        })
      }

    }
  }
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
