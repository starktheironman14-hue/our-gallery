import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (password !== process.env.ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const client = await clientPromise;
        const db = client.db('emotional-companion');

        // Get all data
        const users = await db.collection('users').find({}).toArray();
        const moods = await db.collection('moods').find({}).sort({ timestamp: -1 }).toArray();
        const messages = await db.collection('messages').find({}).sort({ timestamp: -1 }).toArray();

        return NextResponse.json({
            success: true,
            data: {
                users,
                moods,
                messages,
            },
        });
    } catch (error) {
        console.error('Error fetching admin data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch data' },
            { status: 500 }
        );
    }
}
