# AI Freelancer Portfolio Generator

A full-stack web application that helps freelancers create AI-enhanced portfolio landing pages and downloadable CVs using Supabase, Gemini 2.5, and Next.js 14.

## Features

- 🔐 **Authentication**: Secure sign-up and login with Supabase Auth
- ✨ **AI Enhancement**: Refine bios, project descriptions, and experience with Gemini 2.5
- 📄 **CV Generation**: One-click AI-powered CV export
- 🌐 **Portfolio Pages**: Automatically generated, shareable portfolio websites
- 💾 **Data Persistence**: All data securely stored in Supabase
- 🚀 **Production Ready**: Fully deployable on Vercel

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS, Shadcn/UI
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini 2.5 Flash/Pro
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- A Google AI Studio API key for Gemini

### Installation

1. **Clone and install dependencies**:

```bash
npm install
```

2. **Set up environment variables**:

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Set up Supabase database**:

- Go to your Supabase project dashboard
- Navigate to the SQL Editor
- Copy and paste the contents of `supabase-schema.sql`
- Run the SQL to create all tables and policies

4. **Run the development server**:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── gemini/refine/      # AI text refinement endpoint
│   │   └── export-cv/          # CV generation endpoint
│   ├── auth/                   # Authentication page
│   ├── dashboard/              # User dashboard
│   ├── portfolio/[username]/   # Dynamic portfolio pages
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # Shadcn UI components
│   └── dashboard/              # Dashboard tab components
├── lib/
│   ├── gemini/                 # Gemini AI client
│   └── supabase/               # Supabase clients
└── types/                      # TypeScript type definitions
```

## Usage

1. **Sign Up**: Create an account on the auth page
2. **Build Profile**: Add your personal info, bio, skills, experience, education, and projects
3. **Refine with AI**: Use the "Refine with AI" button to enhance your text
4. **View Portfolio**: Click "View Portfolio" to see your live portfolio page
5. **Generate CV**: Click "Generate CV" to download an AI-polished resume

## Deployment on Vercel

### Quick Deploy

1. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables (see below)
   - Click "Deploy"

3. **Environment Variables** (add in Vercel dashboard):
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
GEMINI_API_KEY=your_gemini_key
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

4. **Update Supabase**:
   - Add Vercel URL to Supabase redirect URLs
   - Update Site URL in Supabase settings

📖 **Detailed Guide**: See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)

✅ **Checklist**: Use [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

## API Endpoints

### POST `/api/gemini/refine`
Refines text using Gemini AI.

**Request Body**:
```json
{
  "text": "Your text to refine",
  "context": "bio" | "project" | "experience" | "general"
}
```

### GET `/api/export-cv?userId={userId}`
Generates and downloads a CV for the specified user.

## Database Schema

- **users**: User profiles and bios
- **projects**: Portfolio projects
- **skills**: User skills and proficiency levels
- **experience**: Work experience entries
- **education**: Educational background

See `supabase-schema.sql` for complete schema and RLS policies.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues or questions, please open an issue on GitHub.
