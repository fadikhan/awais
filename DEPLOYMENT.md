# Deployment Guide

## Deploying to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Supabase project set up
- Gemini API key

### Step 1: Prepare Your Repository

1. Initialize git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: AI Freelancer Portfolio Generator"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin https://github.com/your-username/your-repo-name.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure your project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### Step 3: Configure Environment Variables

In the Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

**Important**: 
- Don't include quotes around the values
- Make sure there are no trailing spaces
- Use your production Supabase credentials

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Once deployed, you'll get a URL like `your-project.vercel.app`

### Step 5: Update Supabase Configuration

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Update these settings:
   - **Site URL**: `https://your-project.vercel.app`
   - **Redirect URLs**: Add `https://your-project.vercel.app/**`

### Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Try signing up with a new account
3. Test all features:
   - Profile creation
   - AI refinement
   - Project management
   - Portfolio page viewing
   - CV generation

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

Vercel will automatically rebuild and deploy.

## Custom Domain (Optional)

### Add a Custom Domain

1. In Vercel project settings, go to **Domains**
2. Click **"Add"**
3. Enter your domain name
4. Follow the DNS configuration instructions

### Update DNS Records

Add these records to your domain provider:

**For apex domain (example.com)**:
- Type: A
- Name: @
- Value: 76.76.21.21

**For www subdomain**:
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com

### Update Environment Variables

After adding custom domain:
```
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

## Environment-Specific Configuration

### Development
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production
```env
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
```

## Monitoring and Analytics

### Vercel Analytics (Optional)

1. In Vercel project settings, go to **Analytics**
2. Enable **Web Analytics**
3. Add the analytics script (Vercel provides instructions)

### Error Tracking

Check deployment logs:
1. Go to your Vercel project
2. Click **"Deployments"**
3. Select a deployment
4. View **"Build Logs"** and **"Function Logs"**

## Performance Optimization

### Recommended Settings

1. **Enable Edge Functions** (if needed):
   - Go to project settings
   - Enable Edge Functions for faster response times

2. **Configure Caching**:
   - Static assets are automatically cached
   - API routes can be configured with cache headers

3. **Image Optimization**:
   - Next.js automatically optimizes images
   - Use the `next/image` component

## Troubleshooting Deployment Issues

### Build Fails

**Check build logs** for errors:
- Missing environment variables
- TypeScript errors
- Dependency issues

**Common fixes**:
```bash
# Clear cache and rebuild locally
rm -rf .next node_modules
npm install
npm run build
```

### Runtime Errors

**Check function logs** in Vercel dashboard

**Common issues**:
- Environment variables not set
- API keys invalid
- Supabase connection issues

### Database Connection Issues

1. Verify Supabase URL and key
2. Check RLS policies are set up
3. Ensure tables exist
4. Test connection locally first

## Rollback

If a deployment has issues:

1. Go to **Deployments** in Vercel
2. Find a previous working deployment
3. Click **"..."** → **"Promote to Production"**

## Security Best Practices

1. **Never commit `.env.local`** to git
2. **Use environment variables** for all secrets
3. **Enable RLS** on all Supabase tables
4. **Rotate API keys** periodically
5. **Monitor usage** of Gemini API

## Cost Optimization

### Vercel Free Tier Limits
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless function execution time limits

### Supabase Free Tier Limits
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth

### Gemini API
- Monitor usage in Google AI Studio
- Set up usage alerts
- Consider rate limiting

## Scaling Considerations

As your app grows:

1. **Upgrade Vercel plan** for more resources
2. **Upgrade Supabase plan** for more database space
3. **Implement caching** for frequently accessed data
4. **Add CDN** for static assets
5. **Optimize database queries** with indexes

## Support

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Supabase Support**: [supabase.com/support](https://supabase.com/support)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
