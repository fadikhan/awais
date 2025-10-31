# Setup Guide

## Step-by-Step Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully provisioned
3. Go to **Project Settings** → **API**
4. Copy your **Project URL** and **anon/public key**

### 3. Set Up Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
GEMINI_API_KEY=your-gemini-api-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Set Up Database Schema

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase-schema.sql`
5. Paste it into the SQL editor
6. Click **Run** to execute the SQL

This will create:
- All necessary tables (users, projects, skills, experience, education)
- Row Level Security (RLS) policies
- Proper foreign key relationships

### 6. Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email templates if desired (optional)

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 8. Test the Application

1. **Sign Up**: Create a new account
2. **Add Profile Info**: Fill in your name and bio
3. **Test AI Refinement**: Click "Refine with AI" on your bio
4. **Add Projects**: Create a few sample projects
5. **View Portfolio**: Click "View Portfolio" to see your live page
6. **Generate CV**: Click "Generate CV" to download your resume

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-github-repo-url
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. Import your GitHub repository
4. Configure environment variables:
   - Add all variables from `.env.local`
   - Make sure to use your production Supabase URL
5. Click **Deploy**

### 3. Update Supabase Settings

1. Go to your Supabase project
2. Navigate to **Authentication** → **URL Configuration**
3. Add your Vercel deployment URL to **Site URL**
4. Add `https://your-app.vercel.app/**` to **Redirect URLs**

## Troubleshooting

### Issue: "Failed to refine text"
- Check that your Gemini API key is correct
- Verify the API key has proper permissions
- Check the browser console for detailed error messages

### Issue: "Authentication error"
- Verify Supabase URL and anon key are correct
- Check that email authentication is enabled in Supabase
- Ensure RLS policies are properly set up

### Issue: "Database error"
- Verify all tables were created successfully
- Check that RLS policies are enabled
- Ensure foreign key relationships are correct

### Issue: Portfolio page not loading
- Check that the user ID in the URL is correct
- Verify data exists in the database
- Check browser console for errors

## Additional Configuration

### Custom Domain (Optional)

1. In Vercel, go to your project settings
2. Navigate to **Domains**
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXT_PUBLIC_APP_URL` in environment variables

### Email Templates (Optional)

1. In Supabase, go to **Authentication** → **Email Templates**
2. Customize the confirmation and reset password emails
3. Add your branding and styling

## Next Steps

- Customize the design and colors in `tailwind.config.ts`
- Add more AI features using Gemini
- Implement PDF export for CVs (using jsPDF)
- Add image upload functionality
- Create admin dashboard for analytics
- Add social media links to profiles

## Support

If you encounter any issues:
1. Check the console for error messages
2. Review the Supabase logs
3. Verify all environment variables are set correctly
4. Ensure you're using Node.js 18 or higher
