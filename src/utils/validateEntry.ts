// Client-side validation helper
// Note: In production, move this to server-side for security

export const validateAnswer = (question: string, answer: string): boolean => {
    const trimmedAnswer = answer.toLowerCase().trim();

    const correctAnswers: Record<string, string[]> = {
        q1: ['aaru'],
        q2: ['kitkat'],
        q3: ['3 june'],
        q4: ['i am your wifey'],
        q5: ['always in your heart', 'always in your heart baby'],
    };

    const validAnswers = correctAnswers[question];

    if (!validAnswers) {
        return false;
    }

    return validAnswers.some(
        validAnswer => validAnswer.toLowerCase() === trimmedAnswer
    );
};
