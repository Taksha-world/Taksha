# Supabase Authentication Setup Guide

This document walks you through setting up Supabase authentication for Taksha.

## Prerequisites

- Taksha project cloned and running locally
- A [Supabase account](https://supabase.com) (free tier works great)

## Step 1: Create a Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New project"**
3. Enter project details:
   - **Name:** `taksha` (or your preference)
   - **Password:** Create a secure password for the database
   - **Region:** Choose closest to your location
4. Click **"Create new project"** and wait 2-3 minutes for initialization

## Step 2: Get Your API Credentials

1. In your Supabase dashboard, go to **Project Settings** → **API**
2. You'll see:
   - **Project URL** (starts with `https://...supabase.co`)
   - **Anon/Public Key** (long string starting with `eyJ...`)
3. Copy both values

## Step 3: Configure Environment Variables

1. Open `.env.local` in your project root
2. Replace the empty values with your credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important:** 
- These keys are safe to expose on the frontend (they're public)
- Never commit `.env.local` to git (it's in `.gitignore`)
- The `NEXT_PUBLIC_` prefix makes them accessible in the browser

## Step 4: Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Click **Email** and toggle it **ON**
3. Configure settings (defaults are fine):
   - Enable **Confirm email** (recommended for production)
   - For testing, you can disable it
4. Click **Save**

## Step 5: Configure Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. The default templates are fine for testing
3. For production, customize the confirmation email URL to point to your domain

## Step 6: Set Up Redirect URL

1. Go to **Authentication** → **URL Configuration**
2. Under **Site URL**, set your local development URL:
   ```
   http://localhost:3000
   ```
3. Under **Redirect URLs**, add:
   ```
   http://localhost:3000/auth/callback
   http://localhost:3000/
   ```
4. Save the configuration

(When deploying, add your production URL here too)

## Step 7: Test the Setup Locally

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Navigate to [http://localhost:3000/signup](http://localhost:3000/signup)

3. Create a test account:
   - Email: `test@example.com`
   - Password: `password123` (min 6 chars)
   - Confirm password

4. You should see: **"Check your email for a confirmation link!"**
   (In dev with email confirmation disabled, you can proceed directly to login)

5. Go to [http://localhost:3000/login](http://localhost:3000/login) and sign in

6. After login, the navbar should show your email in the user menu

## Step 8: Verify User Data in Supabase Dashboard

1. Go to **Authentication** → **Users**
2. You should see your test user listed
3. Click the user to see details (email, creation date, etc.)

## Deployment to Vercel

When deploying to Vercel:

1. Add environment variables to your Vercel project:
   - Go to **Settings** → **Environment Variables**
   - Add both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. Update Supabase URL Configuration:
   - Add your Vercel deployment URL to allowed redirect URLs
   - Example: `https://taksha.vercel.app`

3. Redeploy after setting environment variables

## Troubleshooting

### "Supabase client required" Error
**Cause:** Environment variables not set
**Fix:** Check `.env.local` has both values and restart dev server

### Login/Signup page shows blank
**Cause:** Missing Supabase configuration
**Fix:** Verify environment variables in `.env.local`

### "Invalid redirect URL"
**Cause:** URL not in Supabase allowed list
**Fix:** Add your URL to **Authentication** → **URL Configuration**

### Users can't verify email
**Cause:** Email confirmation not set up correctly
**Fix:** Go to **Authentication** → **Email Templates** and check redirect URL

## Testing Checklist

- [ ] Signup page loads without errors
- [ ] Can create new account with valid email/password
- [ ] Login page loads without errors
- [ ] Can log in with created account
- [ ] Navbar shows user email when logged in
- [ ] User menu has "Create Post" and "Sign Out" options
- [ ] Sign out clears user session
- [ ] Signed-out users see "Sign In" link in navbar

## Next Steps

Once auth is working:

1. **Protected Routes:** Only allow authenticated users to create posts
2. **User Profile:** Store user preferences/profile data
3. **Post Ownership:** Link posts to authenticated users
4. **Permissions:** Add row-level security (RLS) policies in Supabase

## Files Modified for Auth

- `components/AuthProvider.tsx` - Global auth context & hooks
- `app/login/page.tsx` - Login form
- `app/signup/page.tsx` - Signup form
- `components/Navbar.tsx` - User menu & auth status
- `app/layout.tsx` - AuthProvider wrapper
- `.env.local` - Supabase configuration

## Supabase Docs

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Email Auth Setup](https://supabase.com/docs/guides/auth/auth-email)
