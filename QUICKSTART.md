# Quick Start Guide

Get your AI Freelancer Portfolio Generator up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Google AI Studio API key (free tier works)

## 5-Minute Setup

### 1. Install Dependencies (1 minute)

```bash
npm install
```

### 2. Get Your API Keys (2 minutes)

**Supabase:**
1. Go to [supabase.com](https://supabase.com)
2. Create a new project (or use existing)
3. Go to Settings → API
4. Copy your Project URL and anon/public key

**Gemini API:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the generated key

### 3. Configure Environment (30 seconds)

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key_here
GEMINI_API_KEY=your_gemini_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set Up Database (1 minute)

1. Open Supabase dashboard
2. Go to SQL Editor
3. Copy contents of `supabase-schema.sql`
4. Paste and click "Run"

### 5. Start Development Server (30 seconds)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## First Steps

1. **Sign Up**: Create your account
2. **Add Profile**: Fill in your name and bio
3. **Try AI**: Click "Refine with AI" on your bio
4. **Add a Project**: Create your first project
5. **View Portfolio**: Click "View Portfolio" to see your page

## Common Issues

### "Failed to connect to Supabase"
- Check your Supabase URL and key
- Ensure project is active in Supabase dashboard

### "Gemini API error"
- Verify your API key is correct
- Check you have API access enabled

### "Database error"
- Make sure you ran the SQL schema
- Check all tables were created

## Next Steps

- Read [SETUP.md](SETUP.md) for detailed configuration
- Check [FEATURES.md](FEATURES.md) for all features
- See [DEPLOYMENT.md](DEPLOYMENT.md) to deploy to Vercel

## Need Help?

- Check the [README.md](README.md) for full documentation
- Review error messages in browser console
- Verify all environment variables are set

## Project Structure

```
├── app/                    # Next.js pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication
│   ├── dashboard/         # User dashboard
│   └── portfolio/         # Portfolio pages
├── components/            # React components
│   ├── ui/               # UI components
│   └── dashboard/        # Dashboard components
├── lib/                   # Utilities
│   ├── gemini/           # AI integration
│   └── supabase/         # Database client
└── types/                 # TypeScript types
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Tips

1. **Use AI Refinement**: Always refine your text with AI for best results
2. **Add Images**: Use high-quality images for projects
3. **Keep Bio Short**: Aim for 100-150 words
4. **Update Regularly**: Keep your portfolio current
5. **Test Portfolio**: View your portfolio page before sharing

## What's Next?

After setup, you can:
- Customize the design in `tailwind.config.ts`
- Add more features in the dashboard
- Deploy to Vercel (see DEPLOYMENT.md)
- Share your portfolio with clients

## Support

If you encounter issues:
1. Check browser console for errors
2. Review Supabase logs
3. Verify environment variables
4. Ensure Node.js version is 18+

Happy building! 🚀
