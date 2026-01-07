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
        const { password } = req.body;

        if (password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const client = await clientPromise;
        const db = client.db('emotional-companion');

        // Get all data
        const users = await db.collection('users').find({}).toArray();
        const moods = await db.collection('moods').find({}).sort({ timestamp: -1 }).toArray();
        const messages = await db.collection('messages').find({}).sort({ timestamp: -1 }).toArray();

        res.status(200).json({
            success: true,
            data: {
                users,
                moods,
                messages,
            },
        });
    } catch (error) {
        console.error('Error fetching admin data:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
