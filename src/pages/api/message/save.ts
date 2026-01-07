import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { userId, type, content, mood } = req.body;

        if (!userId || !type || !content) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const client = await clientPromise;
        const db = client.db('emotional-companion');

        const message = await db.collection('messages').insertOne({
            userId,
            type, // 'thought', 'sentence', 'anger'
            content,
            mood: mood || null,
            timestamp: new Date(),
        });

        // Update user's last visit
        await db.collection('users').updateOne(
            { _id: userId },
            { $set: { lastVisit: new Date() } }
        );

        res.status(201).json({
            success: true,
            messageId: message.insertedId
        });
    } catch (error) {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Failed to save message' });
    }
}
