# Vercel Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com with your GitHub)

### Step 1: Push to GitHub

```bash
# Make sure everything is committed
git add .
git commit -m "Initial FlexSession MVP"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your `flexsession` repository
4. Vercel will auto-detect Next.js settings
5. Add Environment Variables (see below)
6. Click "Deploy"

### Step 3: Configure Environment Variables in Vercel

Add these in Vercel Dashboard → Project Settings → Environment Variables:

```env
# Database (use a hosted PostgreSQL)
DATABASE_URL=postgresql://user:pass@your-db-host:5432/flexsession

# NextAuth
NEXTAUTH_SECRET=<generate-with: openssl rand -base64 32>
NEXTAUTH_URL=https://your-app.vercel.app

# Email
EMAIL_SERVER=smtp://user:pass@smtp.resend.com:587
EMAIL_FROM=noreply@yourdomain.com

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CONNECT_CLIENT_ID=ca_...

# S3 (use AWS S3 or DigitalOcean Spaces)
S3_ENDPOINT=https://nyc3.digitaloceanspaces.com
S3_ACCESS_KEY_ID=your-key
S3_SECRET_ACCESS_KEY=your-secret
S3_BUCKET=flexsession-prod
S3_REGION=us-east-1

# Google OAuth
GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-secret

# App Config
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
PLATFORM_FEE_PERCENT=15
```

### Step 4: Setup Production Database

**Option A: Vercel Postgres (Easiest)**
```bash
# In Vercel Dashboard:
# 1. Go to Storage tab
# 2. Create Postgres Database
# 3. Copy DATABASE_URL to environment variables
```

**Option B: Neon (Free tier)**
1. Go to https://neon.tech
2. Create a new project
3. Copy connection string to `DATABASE_URL`

**Option C: Supabase (Free tier)**
1. Go to https://supabase.com
2. Create project
3. Get PostgreSQL connection string

### Step 5: Run Database Migrations

```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Run migrations in production
vercel env pull .env.production
DATABASE_URL="your-prod-db-url" npx prisma db push
DATABASE_URL="your-prod-db-url" npx prisma db seed
```

### Step 6: Configure Custom Domain (Optional)

In Vercel Dashboard:
1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

---

## Deployment Checklist

- [ ] Push code to GitHub
- [ ] Connect repository to Vercel
- [ ] Set up production database
- [ ] Add all environment variables
- [ ] Run database migrations
- [ ] Test deployment URL
- [ ] Configure Stripe webhooks with production URL
- [ ] Set up custom domain (optional)

---

## Post-Deployment

### Update Stripe Webhooks
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-app.vercel.app/api/webhooks/stripe`
3. Select events: `checkout.session.completed`
4. Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

### Update Google OAuth
1. Go to Google Cloud Console
2. Add authorized redirect URI: `https://your-app.vercel.app/api/auth/callback/google`

### Update NextAuth Callback URLs
1. Ensure `NEXTAUTH_URL` matches your production URL

---

## Monitoring

Vercel provides:
- Automatic deployments on git push
- Preview deployments for PRs
- Built-in analytics
- Real-time logs
- Edge functions

Access at: https://vercel.com/dashboard
