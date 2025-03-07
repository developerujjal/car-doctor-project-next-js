import { authOptions } from "@/lib/authOptions";
import dbConnect, { dbCollectionObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const servicesCollection = dbConnect(dbCollectionObj.serviceCollection);
        const query = { _id: new ObjectId(id) };
        const result = await servicesCollection.findOne(query);
        return NextResponse.json(result)

    } catch (error) {
        return NextResponse.json({ error: "Faild to fetch services data", status: 500 })
    }
}



export async function DELETE(request, { params }) {

    const session = await getServerSession(authOptions);

    try {
        const { id } = await params;
        console.log(id)
        const query = { _id: new ObjectId(id) };
        const bookingsCollection = dbConnect(dbCollectionObj.bookingsCollection);

        const isBookingExist = await bookingsCollection.findOne(query);
        const isEmailOk = session?.user?.email === isBookingExist?.email;

        if (!isEmailOk) {
            return NextResponse.json({ message: "Forbidden Access", status: 403 });
        }

        const result = await bookingsCollection.deleteOne(query);
        revalidatePath("/my-bookings");
        return NextResponse.json(result);


    } catch (error) {
        return NextResponse.json({ error: "Faild to delete item", status: 500 })
    }
}