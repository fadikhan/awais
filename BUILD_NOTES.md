# Build Notes

## Build Warnings & Errors (Expected)

When running `npm run build` without environment variables configured, you may see these errors:

### Expected Errors

1. **Supabase Client Error**
   ```
   @supabase/ssr: Your project's URL and API key are required
   ```
   - **Cause**: Missing environment variables during build
   - **Solution**: Add `.env.local` with Supabase credentials
   - **Note**: This is normal for initial setup

2. **Dynamic Server Usage Warning**
   ```
   Route /api/export-cv couldn't be rendered statically
   ```
   - **Cause**: API route uses dynamic parameters
   - **Solution**: Already configured with `export const dynamic = 'force-dynamic'`
   - **Note**: This is expected behavior for API routes

3. **Prerender Errors**
   ```
   Error occurred prerendering page "/auth" or "/dashboard"
   ```
   - **Cause**: Client-side pages trying to pre-render without credentials
   - **Solution**: These pages are client-side only and will work at runtime
   - **Note**: Safe to ignore during initial build

### Supabase Edge Runtime Warnings

```
A Node.js API is used which is not supported in the Edge Runtime
```
- **Cause**: Supabase client uses Node.js APIs
- **Solution**: No action needed - middleware works correctly
- **Note**: These are warnings, not errors

## Successful Build

A successful build will show:

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages
```

Even with the prerender errors mentioned above, the application will work correctly when:
1. Environment variables are set
2. Running in development (`npm run dev`)
3. Deployed to Vercel with proper env vars

## Development vs Production

### Development Build
```bash
npm run dev
```
- Hot reload enabled
- No pre-rendering
- Requires `.env.local`

### Production Build
```bash
npm run build
npm start
```
- Optimized bundle
- Static generation where possible
- Requires environment variables

## Environment Variables Required

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
GEMINI_API_KEY=your_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Vercel Deployment

When deploying to Vercel:
1. Build will succeed with proper env vars
2. All routes will work correctly
3. No prerender errors will occur

## Troubleshooting

### Build fails completely
- Check TypeScript errors: `npx tsc --noEmit`
- Verify all imports are correct
- Ensure all dependencies are installed

### Runtime errors after build
- Verify environment variables are set
- Check Supabase connection
- Verify Gemini API key is valid

### Pages not loading
- Check browser console for errors
- Verify middleware is working
- Check Supabase RLS policies

## Testing the Build

1. **Set environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Start production server**
   ```bash
   npm start
   ```

4. **Test in browser**
   - Visit http://localhost:3000
   - Try signing up
   - Test all features

## CI/CD Considerations

### GitHub Actions
If using GitHub Actions, add secrets:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `GEMINI_API_KEY`

### Vercel
Environment variables are automatically used during build.

## Performance Notes

### Build Time
- Initial build: 30-60 seconds
- Subsequent builds: 10-20 seconds (with cache)

### Bundle Size
- First Load JS: ~200-300 KB
- Optimized with code splitting
- Images optimized automatically

## Security Notes

1. **Never commit `.env.local`**
2. **Use environment variables for all secrets**
3. **Rotate API keys regularly**
4. **Monitor API usage**

## Common Issues

### Issue: "Module not found"
**Solution**: Run `npm install`

### Issue: "TypeScript errors"
**Solution**: Check `tsconfig.json` and fix type errors

### Issue: "Build succeeds but app doesn't work"
**Solution**: Verify environment variables are set correctly

## Next Steps

After successful build:
1. Test all features locally
2. Deploy to Vercel
3. Configure production environment variables
4. Test production deployment

## Support

If you encounter issues not covered here:
1. Check the main [README.md](README.md)
2. Review [SETUP.md](SETUP.md)
3. Check browser console for errors
4. Verify all environment variables
