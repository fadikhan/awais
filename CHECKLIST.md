# Setup & Deployment Checklist

Use this checklist to ensure your AI Freelancer Portfolio Generator is properly set up and deployed.

## Initial Setup

### 1. Prerequisites
- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Git installed (for deployment)
- [ ] Code editor (VS Code recommended)

### 2. Project Setup
- [ ] Clone or download the project
- [ ] Navigate to project directory
- [ ] Run `npm install`
- [ ] Verify all dependencies installed successfully

### 3. Supabase Setup
- [ ] Create Supabase account at [supabase.com](https://supabase.com)
- [ ] Create new project
- [ ] Wait for project provisioning (2-3 minutes)
- [ ] Copy Project URL from Settings → API
- [ ] Copy anon/public key from Settings → API
- [ ] Go to SQL Editor
- [ ] Copy contents of `supabase-schema.sql`
- [ ] Paste and run SQL in editor
- [ ] Verify all tables created (users, projects, skills, experience, education)
- [ ] Check RLS policies are enabled

### 4. Gemini API Setup
- [ ] Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
- [ ] Sign in with Google account
- [ ] Create new API key
- [ ] Copy API key
- [ ] Save key securely

### 5. Environment Configuration
- [ ] Create `.env.local` file in project root
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Add `GEMINI_API_KEY`
- [ ] Add `NEXT_PUBLIC_APP_URL=http://localhost:3000`
- [ ] Verify no trailing spaces in values
- [ ] Verify no quotes around values

### 6. Local Testing
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Verify landing page loads
- [ ] Test sign up flow
- [ ] Create test account
- [ ] Verify email confirmation (if enabled)
- [ ] Log in successfully
- [ ] Access dashboard

## Feature Testing

### 7. Profile Management
- [ ] Add name
- [ ] Add bio
- [ ] Click "Refine with AI"
- [ ] Verify refined bio appears
- [ ] Save profile
- [ ] Verify data persists after refresh

### 8. Projects
- [ ] Add new project
- [ ] Fill in title and description
- [ ] Add project link
- [ ] Add image URL
- [ ] Click "Refine with AI"
- [ ] Verify refined description
- [ ] Save project
- [ ] Edit existing project
- [ ] Delete project
- [ ] Verify changes persist

### 9. Skills
- [ ] Add skill name
- [ ] Add proficiency level
- [ ] Save skill
- [ ] Add multiple skills
- [ ] Delete a skill
- [ ] Verify changes persist

### 10. Experience
- [ ] Add company name
- [ ] Add role
- [ ] Add description
- [ ] Set start date
- [ ] Set end date (or leave empty for current)
- [ ] Click "Refine with AI"
- [ ] Verify refined description
- [ ] Save experience
- [ ] Edit existing experience
- [ ] Delete experience

### 11. Education
- [ ] Add institution name
- [ ] Add degree
- [ ] Add field of study
- [ ] Set start year
- [ ] Set end year (or leave empty)
- [ ] Save education
- [ ] Edit existing education
- [ ] Delete education

### 12. Portfolio Page
- [ ] Click "View Portfolio" button
- [ ] Verify portfolio page loads
- [ ] Check all sections display correctly
- [ ] Verify projects show with images
- [ ] Check experience timeline
- [ ] Verify skills display
- [ ] Check education section
- [ ] Test contact button
- [ ] Verify responsive design on mobile

### 13. CV Generation
- [ ] Click "Generate CV" button
- [ ] Verify CV downloads
- [ ] Open downloaded file
- [ ] Check all sections included
- [ ] Verify AI-generated content
- [ ] Check formatting

### 14. Authentication
- [ ] Test sign out
- [ ] Verify redirect to home
- [ ] Test sign in again
- [ ] Verify protected routes work
- [ ] Try accessing /dashboard without login
- [ ] Verify redirect to /auth

## Deployment Preparation

### 15. Code Quality
- [ ] Run `npm run lint`
- [ ] Fix any linting errors
- [ ] Run `npm run build` (may show expected errors)
- [ ] Verify no critical TypeScript errors
- [ ] Test production build locally with `npm start`

### 16. Git Setup
- [ ] Initialize git: `git init`
- [ ] Create `.gitignore` (already included)
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Stage files: `git add .`
- [ ] Commit: `git commit -m "Initial commit"`
- [ ] Create GitHub repository
- [ ] Add remote: `git remote add origin <url>`
- [ ] Push: `git push -u origin main`

### 17. Vercel Deployment
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign in with GitHub
- [ ] Click "New Project"
- [ ] Import your repository
- [ ] Configure project settings
- [ ] Add environment variables:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `GEMINI_API_KEY`
  - [ ] `NEXT_PUBLIC_APP_URL` (use Vercel URL)
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy deployment URL

### 18. Supabase Production Config
- [ ] Go to Supabase dashboard
- [ ] Navigate to Authentication → URL Configuration
- [ ] Update Site URL to Vercel URL
- [ ] Add Vercel URL to Redirect URLs
- [ ] Add `https://your-app.vercel.app/**` pattern
- [ ] Save changes

### 19. Production Testing
- [ ] Visit Vercel deployment URL
- [ ] Test sign up with new account
- [ ] Verify email confirmation works
- [ ] Test all features:
  - [ ] Profile management
  - [ ] Projects CRUD
  - [ ] Skills management
  - [ ] Experience tracking
  - [ ] Education history
  - [ ] AI refinement
  - [ ] Portfolio page
  - [ ] CV generation
- [ ] Test on mobile device
- [ ] Test on different browsers
- [ ] Verify all images load
- [ ] Check page load speed

## Post-Deployment

### 20. Monitoring
- [ ] Check Vercel deployment logs
- [ ] Monitor Supabase usage
- [ ] Check Gemini API usage
- [ ] Set up error tracking (optional)
- [ ] Enable Vercel Analytics (optional)

### 21. Security
- [ ] Verify RLS policies working
- [ ] Test unauthorized access attempts
- [ ] Check API rate limiting
- [ ] Verify environment variables secure
- [ ] Review Supabase security settings

### 22. Performance
- [ ] Test page load times
- [ ] Check Lighthouse scores
- [ ] Verify image optimization
- [ ] Test API response times
- [ ] Check database query performance

### 23. Documentation
- [ ] Update README with your deployment URL
- [ ] Document any custom changes
- [ ] Create user guide (optional)
- [ ] Document API usage limits

## Optional Enhancements

### 24. Custom Domain (Optional)
- [ ] Purchase domain
- [ ] Add domain in Vercel
- [ ] Configure DNS records
- [ ] Update environment variables
- [ ] Update Supabase redirect URLs
- [ ] Test with custom domain

### 25. Additional Features (Optional)
- [ ] Add dark mode toggle
- [ ] Implement PDF CV export
- [ ] Add image upload functionality
- [ ] Create contact form
- [ ] Add social media links
- [ ] Implement analytics
- [ ] Add testimonials section
- [ ] Create blog integration

## Maintenance

### 26. Regular Tasks
- [ ] Update dependencies monthly
- [ ] Monitor API usage
- [ ] Check error logs weekly
- [ ] Backup database regularly
- [ ] Review security advisories
- [ ] Test all features after updates
- [ ] Monitor performance metrics

### 27. User Support
- [ ] Create FAQ document
- [ ] Set up support email
- [ ] Monitor user feedback
- [ ] Track feature requests
- [ ] Document common issues

## Troubleshooting

### Common Issues Checklist
- [ ] Environment variables set correctly
- [ ] Supabase project active
- [ ] Database tables created
- [ ] RLS policies enabled
- [ ] API keys valid
- [ ] Node.js version correct
- [ ] Dependencies installed
- [ ] No TypeScript errors
- [ ] Build succeeds
- [ ] Deployment successful

## Success Criteria

Your deployment is successful when:
- [ ] Application loads without errors
- [ ] Users can sign up and log in
- [ ] All CRUD operations work
- [ ] AI refinement functions correctly
- [ ] Portfolio pages are accessible
- [ ] CV generation works
- [ ] Mobile responsive
- [ ] Fast page loads
- [ ] Secure authentication
- [ ] Data persists correctly

## Resources

- [ ] Bookmark [Next.js Docs](https://nextjs.org/docs)
- [ ] Bookmark [Supabase Docs](https://supabase.com/docs)
- [ ] Bookmark [Gemini API Docs](https://ai.google.dev/docs)
- [ ] Bookmark [Vercel Docs](https://vercel.com/docs)
- [ ] Save project documentation links

## Notes

Use this space to track your progress and note any issues:

```
Date Started: _______________
Date Completed: _______________

Issues Encountered:
-
-
-

Custom Changes Made:
-
-
-

Production URL: _______________
```

---

**Congratulations!** 🎉

Once you've completed this checklist, your AI Freelancer Portfolio Generator is fully set up and deployed!
