import dbConnect, { dbCollectionObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
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