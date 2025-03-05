'use server'
import dbConnect, { DbCollectionObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export async function loginUser(payload) {


    try {
        const { email, password } = payload;

        if (!email || !password) {
            return null
        }

        const query = { email: email }
        const usersCollection = dbConnect(DbCollectionObj.usersCollection);
        const user = await usersCollection.findOne(query);
        if (!user) {
            return null;
        }

        const okPassword = bcrypt.compareSync(password, user?.password);
        if (!okPassword) {
            return null;
        }

        return user;


    } catch (error) {
        console.log(error);
        return null;
    }

}