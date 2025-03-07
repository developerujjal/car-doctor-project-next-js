import { authOptions } from "@/lib/authOptions";
import dbConnect, { dbCollectionObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {

    const session = await getServerSession(authOptions);

    try {
        const { id } = await params;
        const query = { _id: new ObjectId(id) };
        const bookingsCollection = dbConnect(dbCollectionObj.bookingsCollection);
        const isBookingExist = await bookingsCollection.findOne(query);
        const isPasswordOk = session?.user?.email === isBookingExist?.email;
        if (!isPasswordOk) {
            return NextResponse.json({ message: "Forbidden Get Action", status: 403 })
        }

        const result = await bookingsCollection.findOne(query);
        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json({ message: "Faild to fetch booking data", status: 500 })
    }
}


export const PATCH = async (request, { params }) => {

    const session = await getServerSession(authOptions);

    try {
        const { id } = await params;
        const body = await request.json();
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: {
                ...body
            }
        };

        const bookingsCollection = dbConnect(dbCollectionObj.bookingsCollection);

        const bookingExist = await bookingsCollection.findOne(filter);

        const isPasswordOk = session?.user?.email === bookingExist?.email;
        if (!isPasswordOk) {
            return NextResponse.json({ message: "Forbidden Update Action", status: 403 })
        }

        const result = await bookingsCollection.updateOne(filter, updateDoc);
        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json({ message: "Faild to Update", status: 500 })
    }
}