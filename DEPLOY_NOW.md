# 🚀 Quick Deploy FlexSession for Testing

## ✅ Step 1: Code is Already on GitHub!
Your repo: https://github.com/trentbecknell/flexsession

---

## 🎯 Fastest Way to Deploy (5 minutes)

### Deploy to Vercel (Recommended for Testing)

**Why Vercel?**
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Auto-deploys on git push
- ✅ Made for Next.js
- ✅ Easy to share URL with testers

### Step-by-Step:

#### 1. Sign up for Vercel
Go to: https://vercel.com/signup
- Click "Continue with GitHub"
- Authorize Vercel

#### 2. Import Your Project
- Click "Add New Project"
- Select `flexsession` from your repos
- Click "Import"

#### 3. Configure Settings
Vercel auto-detects Next.js. Just click "Deploy"!

**Your app will be live in ~2 minutes** 🎉

---

## 🗄️ Step 2: Setup Production Database

Your app needs a database. **Easiest option:**

### Option A: Neon (Free Forever)

1. Go to: https://neon.tech
2. Sign up (free)
3. Click "Create Project"
4. Name it: `flexsession-db`
5. Copy the connection string

It looks like:
```
postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/flexsession
```

### Option B: Vercel Postgres ($0.30/GB)

1. In Vercel dashboard, go to "Storage"
2. Click "Create Database"
3. Select "Postgres"
4. Vercel automatically connects it!

---

## ⚙️ Step 3: Add Environment Variables

In Vercel Dashboard:
1. Go to your project
2. Click "Settings" → "Environment Variables"
3. Add these (one by one):

### Required for Testing:

```env
# Database
DATABASE_URL=postgresql://your-neon-connection-string

# NextAuth (generate secret with: openssl rand -base64 32)
NEXTAUTH_SECRET=put-a-long-random-string-here
NEXTAUTH_URL=https://your-app.vercel.app

# Temporary Email (skip for now, or use Resend free tier)
EMAIL_SERVER=skip-for-now
EMAIL_FROM=test@test.com

# Stripe Test Keys (from dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_your_test_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key
STRIPE_WEBHOOK_SECRET=skip-for-now
STRIPE_CONNECT_CLIENT_ID=skip-for-now

# S3 (skip for now - file uploads won't work but app will run)
S3_ENDPOINT=http://placeholder
S3_ACCESS_KEY_ID=placeholder
S3_SECRET_ACCESS_KEY=placeholder
S3_BUCKET=placeholder
S3_REGION=us-east-1

# Google OAuth (skip for now - calendar sync won't work but app will run)
GOOGLE_CLIENT_ID=placeholder
GOOGLE_CLIENT_SECRET=placeholder

# App URL (update after first deploy)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
PLATFORM_FEE_PERCENT=15
```

---

## 🎨 Step 4: Initialize Database

You need to run migrations and seed data.

### Option 1: Use Vercel CLI (Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.production

# Run migrations
npx prisma db push

# Seed database
npx prisma db seed
```

### Option 2: Manual

Connect to your database using Prisma Studio:
```bash
DATABASE_URL="your-neon-url" npx prisma db push
DATABASE_URL="your-neon-url" npx prisma db seed
```

---

## ✅ Step 5: Redeploy

After adding environment variables:

1. Go to Vercel Dashboard → Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"

Or just push to GitHub:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

---

## 🎉 You're Live!

Your app is now at: `https://flexsession-[random].vercel.app`

### Test Pages:
- **Landing**: https://your-app.vercel.app
- **Browse**: https://your-app.vercel.app/browse
- **Profile**: Click any engineer card

### Share with Testers:
Just send them your Vercel URL! 🚀

---

## 🐛 Troubleshooting

**"Application error"**
- Check Vercel logs: Dashboard → Project → View Function Logs
- Most common: Missing environment variables

**"Database connection failed"**
- Check DATABASE_URL is correct
- Make sure Prisma migration ran

**"Build failed"**
- Check build logs in Vercel
- Usually: Missing dependencies (already fixed in our package.json)

---

## 📊 Monitoring

Vercel Dashboard shows:
- Real-time logs
- Performance metrics
- Error tracking
- Visitor analytics

---

## 🔄 Auto-Deploy

Every time you push to GitHub, Vercel automatically:
1. Builds your app
2. Runs tests
3. Deploys to production
4. Gives you a preview URL

**No manual deploys needed!** 🎯

---

## 💰 Cost Breakdown (Free Tier)

- **Vercel Hosting**: FREE
- **Neon Database**: FREE (0.5GB)
- **Stripe Test Mode**: FREE
- **Total**: $0/month ✅

For production, you'll want:
- Neon Pro: $19/month (or Vercel Postgres)
- DigitalOcean Spaces (S3): $5/month
- Email service: $0-10/month

---

## 🎯 Next Steps After Testing

1. Get feedback from testers
2. Implement Phase 2 features (booking flows)
3. Set up production Stripe account
4. Configure custom domain
5. Enable file uploads (add S3)
6. Add email notifications

---

**Need help?** Check the logs in Vercel Dashboard or the browser console!
