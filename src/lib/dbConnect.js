const { MongoClient, ServerApiVersion } = require("mongodb");

export const DbCollectionObj = {
    serviceCollection: "services",
    usersCollection: "users"
}

export default function dbConnect(collectionName) {


    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    return client.db(process.env.DB_NAME).collection(collectionName);
}

/* 
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

// Create a cached MongoClient instance
let cachedClient;
let cachedDb;

export default async function dbConnect(collectionName) {

    if (cachedClient && cachedDb) {
        // Use cached client and database if available
        return cachedDb.collection(collectionName);
    }

    // Create a new client if none exists
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {

        // Cache the client and database
        cachedClient = client;
        cachedDb = client.db(dbName);

        return cachedDb.collection(collectionName);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
}


 */