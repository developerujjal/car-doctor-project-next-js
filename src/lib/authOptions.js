import { loginUser } from "@/app/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbConnect, { dbCollectionObj } from "./dbConnect";


export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Type your email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const user = await loginUser(credentials);
                console.log("GETUSER: ", user)


                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "online",
                    response_type: "code"
                }
            }
        })
    ],

    pages: {
        signIn: "/signin"
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                // console.log("USER: ", user)
                // console.log("ACCOUNT: ", account)

                if (account?.provider === "google") {
                    const { provider, providerAccountId } = account;
                    const { name, email, image } = user;

                    const usersCollection = dbConnect(dbCollectionObj.usersCollection);
                    const isExist = await usersCollection.findOne({ providerAccountId });

                    if (!isExist) {
                        const payLoad = { provider, providerAccountId, name, email, image };
                        await usersCollection.insertOne(payLoad);
                    }
                }

                return true; // Successful sign-in
            } catch (error) {
                console.error("Error during sign-in callback:", error);
                return false; // or throw error; depending on your use case
            }
        },
    }

}

