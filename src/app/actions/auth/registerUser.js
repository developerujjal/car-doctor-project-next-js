'use server'
import dbConnect, { DbCollectionObj } from "@/lib/dbConnect"
import bcrypt from "bcrypt";

export async function RegisterUser(user) {

    const { email, password } = user;

    if (!email || !password) {
        return { success: false }
    }


    const hashedPassword = bcrypt.hashSync(password, 10);
    user.password = hashedPassword;

    const dbCollection = dbConnect(DbCollectionObj.usersCollection);
    const isExsit = await dbCollection.findOne({ email: user?.email });
    if (!isExsit) {
        const result = await dbCollection.insertOne(user);
        const { acknowledged, insertedId } = result;
        return { acknowledged: acknowledged, insertedId: insertedId.toString() };
    }

    return { success: false }

}