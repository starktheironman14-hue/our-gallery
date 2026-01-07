import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const { userId, type, content, mood } = await request.json();

        if (!userId || !type || !content) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db('emotional-companion');

        const message = await db.collection('messages').insertOne({
            userId,
            type, // 'thought', 'sentence', 'anger', 'emotion'
            content,
            mood: mood || null,
            timestamp: new Date(),
        });

        // Update user's last visit
        await db.collection('users').updateOne(
            { _id: userId },
            { $set: { lastVisit: new Date() } }
        );

        return NextResponse.json({
            success: true,
            messageId: message.insertedId,
        });
    } catch (error) {
        console.error('Error saving message:', error);
        return NextResponse.json(
            { error: 'Failed to save message' },
            { status: 500 }
        );
    }
}
