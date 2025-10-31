# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free tier works)
- Supabase project set up
- Gemini API key

## Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: AI Freelancer Portfolio Generator"
```

2. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name it: `ai-freelancer-portfolio`
   - Don't initialize with README (you already have one)

3. **Push your code**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-freelancer-portfolio.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Vercel

### Option A: Deploy via Vercel Dashboard

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   GEMINI_API_KEY=your-gemini-api-key
   NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
   ```

   **Important**: 
   - Add these to **Production**, **Preview**, and **Development** environments
   - No quotes around values
   - No trailing spaces

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - You'll get a URL like: `your-project.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

4. **Add Environment Variables**:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add GEMINI_API_KEY
vercel env add NEXT_PUBLIC_APP_URL
```

5. **Deploy to Production**:
```bash
vercel --prod
```

## Step 3: Update Supabase Configuration

1. **Go to Supabase Dashboard**
   - Navigate to your project
   - Go to **Authentication** → **URL Configuration**

2. **Update Site URL**:
   ```
   https://your-project.vercel.app
   ```

3. **Add Redirect URLs**:
   ```
   https://your-project.vercel.app/**
   https://your-project.vercel.app/auth/callback
   ```

4. **Save Changes**

## Step 4: Test Your Deployment

1. **Visit your Vercel URL**
   - Open `https://your-project.vercel.app`

2. **Test Authentication**
   - Sign up with a new account
   - Verify email works
   - Log in successfully

3. **Test All Features**
   - ✅ Create profile
   - ✅ Add projects
   - ✅ Add skills
   - ✅ Add experience
   - ✅ Add education
   - ✅ Use AI refinement
   - ✅ View portfolio page
   - ✅ Generate CV

## Step 5: Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add"

2. **Add Your Domain**
   - Enter your domain: `yourdomain.com`
   - Follow DNS configuration instructions

3. **Update DNS Records**
   Add these records at your domain provider:
   
   **For apex domain (example.com)**:
   - Type: `A`
   - Name: `@`
   - Value: `76.76.21.21`

   **For www subdomain**:
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

4. **Update Environment Variables**
   ```
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

5. **Update Supabase**
   - Add your custom domain to Supabase redirect URLs

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically rebuild and deploy! 🎉

## Troubleshooting

### Build Fails

**Check build logs** in Vercel dashboard:
- Missing environment variables
- TypeScript errors
- Dependency issues

**Fix**:
```bash
# Test build locally first
npm run build

# If successful, push to GitHub
git push
```

### Environment Variables Not Working

1. Verify all variables are set in Vercel
2. Check for typos in variable names
3. Redeploy after adding variables
4. No quotes or spaces in values

### Supabase Connection Issues

1. Verify Supabase URL and key are correct
2. Check RLS policies are enabled
3. Verify redirect URLs include Vercel domain
4. Test Supabase connection locally first

### Gemini API Errors

1. Verify API key is valid
2. Check API quota hasn't been exceeded
3. Test API key locally first
4. Ensure key has proper permissions

## Performance Optimization

### Vercel Settings

1. **Enable Edge Functions** (if needed)
2. **Configure Caching** headers
3. **Enable Image Optimization**
4. **Use Vercel Analytics** (optional)

### Code Optimization

1. **Minimize API calls**
2. **Use React.memo** for expensive components
3. **Implement loading states**
4. **Optimize images** before upload

## Monitoring

### Vercel Dashboard

- **Deployments**: View all deployments
- **Analytics**: Track page views and performance
- **Logs**: Check function logs for errors
- **Speed Insights**: Monitor performance

### Supabase Dashboard

- **Database**: Monitor queries and usage
- **Auth**: Track user signups and logins
- **Storage**: Check file usage
- **Logs**: Review API logs

## Security Checklist

- ✅ Environment variables set correctly
- ✅ `.env.local` in `.gitignore`
- ✅ RLS policies enabled on all tables
- ✅ Supabase redirect URLs configured
- ✅ API keys rotated regularly
- ✅ HTTPS enabled (automatic on Vercel)

## Cost Considerations

### Vercel Free Tier
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless function execution limits

### Supabase Free Tier
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth

### Gemini API
- Monitor usage in Google AI Studio
- Set up usage alerts
- Consider rate limiting

## Support

- **Vercel**: https://vercel.com/support
- **Supabase**: https://supabase.com/support
- **Next.js**: https://nextjs.org/docs

## Success! 🎉

Your AI Freelancer Portfolio Generator is now live on Vercel!

Share your portfolio: `https://your-project.vercel.app/portfolio/[your-user-id]`
