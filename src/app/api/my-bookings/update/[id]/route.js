import dbConnect, { dbCollectionObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
        const { id } = await params;
        const query = { _id: new ObjectId(id) };
        const bookingsCollection = dbConnect(dbCollectionObj.bookingsCollection);
        const result = await bookingsCollection.findOne(query);
        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json({ message: "Faild to fetch booking data", status: 500 })
    }
}


export const PATCH = async (request, { params }) => {
    try {
        const { id } = await params;
        const body = await request.json();
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: {
                ...body
            }
        }
        const bookingsCollection = dbConnect(dbCollectionObj.bookingsCollection);
        const result = await bookingsCollection.updateOne(filter, updateDoc);
        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json({ message: "Faild to Update", status: 500 })
    }
}