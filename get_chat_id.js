import fetch from 'node-fetch';

// 1. ADD YOUR BOT TOKEN HERE
const BOT_TOKEN = '8506540356:AAGAW2lsWKSyYz9U0hUbZ49-cGdTZriS30M';

async function getChatId() {
    if (BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
        console.error('Error: Please add your bot token in the script!');
        return;
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`);
        const data = await response.json();

        if (data.ok) {
            if (data.result.length === 0) {
                console.log('No messages found. Please send a message (e.g., "Hello") to your bot first!');
                console.log(`Bot Link: https://t.me/${data.result.username || 'YourBotName'}`);
            } else {
                console.log('🎉 Found Chat ID!');
                const chatId = data.result[0].message.chat.id;
                console.log(`Your Chat ID: ${chatId}`);
                console.log('\nCopy this ID and add it to your .env file as TELEGRAM_CHAT_ID');
            }
        } else {
            console.error('Error:', data);
        }
    } catch (error) {
        console.error('Network Error:', error);
    }
}

getChatId();
