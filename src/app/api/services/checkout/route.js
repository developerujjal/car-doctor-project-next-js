import dbConnect, { dbCollectionObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

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