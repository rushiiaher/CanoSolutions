# Vercel Deployment Guide for CanoSolutions

Your project is ready for deployment on Vercel. Follow these steps to ensure a smooth launch.

## 1. Prerequisites

Ensure you have your **MongoDB Connection String** and a **JWT Secret** ready.

## 2. Deploying

1.  Push your latest code (including the recent fixes) to your Git repository (GitHub/GitLab/Bitbucket).
2.  Log in to **Vercel** and click **"Add New..."** > **"Project"**.
3.  Import your repository.
4.  **Framework Preset**: It should automatically detect **Next.js**.

## 3. Environment Variables (Critical)

Before clicking "Deploy", expand the **"Environment Variables"** section and add:

| Variable Name | Value | Description |
| :--- | :--- | :--- |
| `MONGODB_URI` | `mongodb+srv://...` | Connection string from MongoDB Atlas |
| `JWT_SECRET` | `your-secure-random-string` | Secret key for session encryption |
| `NEXT_PUBLIC_APP_URL`| `https://your-project.vercel.app` | (Optional) URL for absolute links |

*Note: For `MONGODB_URI`, ensure your MongoDB Atlas **Network Access** whitelist includes `0.0.0.0/0` (Allow Access from Anywhere) so Vercel can connect.*

## 4. Post-Deployment Steps

### A. Database Indexes
For performance, you should create the database indexes. Vercel does not run this automatically.
**Run this locally** from your terminal:

```bash
# Using the fallback URI (for dev) or set env var
node scripts/create-indexes.js
```

### B. Verify API
Once deployed, verify your API routes:
1.  Visit `https://your-project.vercel.app/api/health` -> Should return `{"status":"healthy", ...}`.
2.  Test the Inquiry form on the frontend.

## 5. Troubleshooting (Vercel Logs)

If you see "Internal Server Error" (500):
1.  Go to Vercel Dashboard > Project > **Logs**.
2.  Look for "MongoTimeoutError" -> Check your IP Whitelist in MongoDB Atlas.
3.  Look for "Authentication failed" -> Check your `MONGODB_URI` password.

## 6. Recent Optimization Fixes

I have automatically applied the following fixes to your codebase for Vercel compatibility:
-   **Connection Pooling**: Refactored `app/api/*` routes to use a shared database connection (`lib/db-utils.ts`) instead of creating new connections per request. This prevents "Too Many Connections" errors on the free tier.
-   **Image Optimization**: Next.js Config is set to `unoptimized: true` to avoid Vercel Free Tier limits.

You are good to go! 🚀
