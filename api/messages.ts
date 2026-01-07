import { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
    throw new Error('Please add your MongoDB URI to .env.local');
}

// Global variable patch for hot reloading in development
let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
};

if (process.env.NODE_ENV === 'development') {
    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const dbClient = await clientPromise;
        const db = dbClient.db('romantic_app');
        const collection = db.collection('midnight_chats');

        // GET: Fetch all messages
        if (req.method === 'GET') {
            const messages = await collection.find({}).toArray();
            return res.status(200).json(messages);
        }

        // POST: Save a new message
        if (req.method === 'POST') {
            const { sender, text, time } = req.body;
            if (!sender || !text) {
                return res.status(400).json({ error: 'Missing sender or text' });
            }
            const newMessage = {
                sender,
                text,
                time, // Storing client-side formatted time for consistency with UI
                createdAt: new Date()
            };
            const result = await collection.insertOne(newMessage);
            return res.status(201).json({ ...newMessage, _id: result.insertedId });
        }

        // DELETE: Remove a message by ID
        if (req.method === 'DELETE') {
            const { id } = req.query;
            if (!id || typeof id !== 'string') {
                return res.status(400).json({ error: 'Missing or invalid id' });
            }
            const result = await collection.deleteOne({ _id: new ObjectId(id) });
            return res.status(200).json({ success: true, deletedCount: result.deletedCount });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
