import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Correct answers (server-side only)
        const correctAnswers: Record<string, string[]> = {
            q1: ['aaru', 'Aaru'],
            q2: ['KitKat', 'kitkat'],
            q3: ['3 June'],
            q4: ['I am your wifey'],
            q5: ['always in your heart', 'always in your heart baby'],
        };

        const validAnswers = correctAnswers[question];

        if (!validAnswers) {
            return res.status(400).json({ error: 'Invalid question' });
        }

        const isCorrect = validAnswers.some(
            validAnswer => validAnswer.toLowerCase().trim() === answer.toLowerCase().trim()
        );

        res.status(200).json({
            success: isCorrect,
            message: isCorrect ? 'Correct' : 'Incorrect'
        });
    } catch (error) {
        console.error('Error validating answer:', error);
        res.status(500).json({ error: 'Failed to validate answer' });
    }
}
