import { authOptions } from "@/lib/authOptions";
import dbConnect, { dbCollectionObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export const GET = async (request) => {
    const session = await getServerSession(authOptions);

    try {
        if (!session) {
            return NextResponse.json({ message: "Unauthorize Access", status: 401 })
        }

        const query = { email: session?.user?.email };
        const bookingsCollection = dbConnect(dbCollectionObj.bookingsCollection);
        const result = await bookingsCollection.find(query).toArray();
        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json({ error: "Faild to fetch bookings data", status: 500 })
    }
}




export async function POST(request) {

    try {
        const body = await request.json();
        console.log(body)
        const bookingsCollection = dbConnect(dbCollectionObj.bookingsCollection);

        const result = await bookingsCollection.insertOne(body);
        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json({ error: "Faild to insert Data", status: 500 })
    }
}