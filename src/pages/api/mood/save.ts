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
        const { userId, mood, emoji } = req.body;

        if (!userId || !mood || !emoji) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const client = await clientPromise;
        const db = client.db('emotional-companion');

        const moodEntry = await db.collection('moods').insertOne({
            userId,
            mood,
            emoji,
            timestamp: new Date(),
        });

        // Update user's last visit
        await db.collection('users').updateOne(
            { _id: userId },
            { $set: { lastVisit: new Date() } }
        );

        res.status(201).json({
            success: true,
            moodId: moodEntry.insertedId
        });
    } catch (error) {
        console.error('Error saving mood:', error);
        res.status(500).json({ error: 'Failed to save mood' });
    }
}
