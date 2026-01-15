import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from '../lib/mongodb';

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const client = await clientPromise;
        const db = client.db('emotional-companion');

        const user = await db.collection('users').insertOne({
            name,
            createdAt: new Date(),
            lastVisit: new Date(),
        });

        res.status(201).json({
            success: true,
            userId: user.insertedId
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}
