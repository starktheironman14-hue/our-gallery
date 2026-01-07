# Emotional Companion Website - Setup Instructions

## 🚀 Quick Start

This website now includes an **Emotional Companion** feature - a safe, interactive space for emotional expression.

---

## 📋 Prerequisites

- Node.js installed
- MongoDB Atlas account (free tier)

---

## ⚙️ Setup Steps

### 1. Install Dependencies

Already done! MongoDB package is installed.

### 2. Set Up MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Create a database user:
   - Click "Database Access"
   - Add new user with username/password
   - Save credentials
5. Whitelist your IP:
   - Click "Network Access"
   - Add IP Address
   - Use `0.0.0.0/0` for development (allows all IPs)
6. Get connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### 3. Create Environment Variables

Create a file `.env.local` in the project root:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/emotional-companion?retryWrites=true&w=majority
ADMIN_PASSWORD=your_secure_admin_password_here
```

**Important:** Replace:
- `username` with your MongoDB username
- `password` with your MongoDB password
- `your_secure_admin_password_here` with a strong password for admin access

### 4. Run the Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173/`

---

## 🎯 How to Use

### For Shubhi (Main User)

1. Open the website
2. Click "Enter My Heart 💖"
3. Click "Talk to Me 💭" button
4. Follow the interactive prompts
5. Express emotions freely

### For You (Admin)

**View Her Messages:**
1. Create admin dashboard component (coming soon)
2. Access at `/admin` route
3. Enter admin password
4. View all moods, messages, and timestamps

---

## 📁 Project Structure

```
src/
├── components/
│   ├── EmotionalCompanion/
│   │   ├── WelcomeCompanion.tsx      # Initial greeting
│   │   ├── MoodCheckIn.tsx           # Mood selection
│   │   ├── WriteThoughts.tsx         # Thought textarea
│   │   ├── CompleteSentence.tsx      # Sentence prompts
│   │   ├── AngerMode.tsx             # Anger/distance mode
│   │   ├── SilenceMode.tsx           # Silence/breathing mode
│   │   └── EmotionalCompanion.tsx    # Main container
│   └── [other components]
├── hooks/
│   ├── useTyping.ts                  # Typing animation
│   └── useAutosave.ts                # Auto-save functionality
├── lib/
│   └── mongodb.ts                    # Database connection
└── pages/
    └── api/
        ├── user/create.ts            # Create user
        ├── mood/save.ts              # Save mood
        ├── message/save.ts           # Save message
        └── admin/dashboard.ts        # Admin data
```

---

## 🔒 Security Notes

- `.env.local` is gitignored (never commit it!)
- Admin password is environment variable
- MongoDB connection is encrypted
- No public display of messages

---

## 🚀 Deployment (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `MONGODB_URI`
   - `ADMIN_PASSWORD`
5. Deploy!

---

## 🎨 Features

### Emotional Companion Includes:

✅ **Welcome Screen** - Typing animation greeting  
✅ **Mood Check-In** - 5 emoji mood selection  
✅ **Write Thoughts** - Auto-saving textarea  
✅ **Complete Sentences** - Interactive prompts  
✅ **Anger Mode** - Non-judgmental space  
✅ **Silence Mode** - Breathing animation  
✅ **Personalization** - Remembers her name  
✅ **Database Storage** - All responses saved  

### Original Features:

✅ Memory Lane with photos  
✅ Midnight Chats  
✅ Why You (clickable hearts)  
✅ Mood Meter  
✅ Our World  
✅ Always Here  
✅ Forever  

---

## 🐛 Troubleshooting

**MongoDB connection fails:**
- Check your connection string
- Verify IP is whitelisted
- Confirm username/password are correct

**API routes not working:**
- Ensure `.env.local` exists
- Restart dev server after adding env variables
- Check MongoDB cluster is running

**Components not showing:**
- Clear browser cache
- Check browser console for errors
- Verify all imports are correct

---

## 📝 Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Add environment variables
3. ✅ Test emotional companion flow
4. 🔲 Create admin dashboard UI
5. 🔲 Deploy to Vercel
6. 🔲 Share with Shubhi!

---

**Made with love for Shubhi (Kitkat) 💝**
