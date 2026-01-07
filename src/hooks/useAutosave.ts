import { useState, useEffect, useCallback } from 'react';

export const useAutosave = (
    content: string,
    saveFunction: (content: string) => Promise<void>,
    delay: number = 5000
) => {
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const save = useCallback(async () => {
        if (!content.trim()) return;

        setIsSaving(true);
        try {
            await saveFunction(content);
            setLastSaved(new Date());
        } catch (error) {
            console.error('Autosave failed:', error);
        } finally {
            setIsSaving(false);
        }
    }, [content, saveFunction]);

    useEffect(() => {
        const timer = setTimeout(() => {
            save();
        }, delay);

        return () => clearTimeout(timer);
    }, [content, delay, save]);

    return { isSaving, lastSaved };
};
