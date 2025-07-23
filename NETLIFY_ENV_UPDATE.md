# Fixing MongoDB Connection Issues in Netlify

This guide will help you resolve the MongoDB connection issues with your Netlify deployment.

## The Problem

The form submission is failing with a 500 Internal Server Error because the Netlify functions cannot connect to MongoDB. This is typically caused by:

1. Missing or incorrect environment variables in Netlify
2. MongoDB connection string format issues
3. Network access restrictions in MongoDB Atlas

## Solution Steps

### 1. Check Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Navigate to **Site settings** > **Build & deploy** > **Environment**
3. Verify that `MONGODB_URI` is set correctly
4. The format should be: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`

### 2. Update Environment Variables

If the environment variable is missing or incorrect:

1. Click **Edit variables**
2. Add or update the `MONGODB_URI` variable with the correct connection string
3. Make sure there are no extra spaces before or after the connection string
4. Click **Save**

### 3. Verify MongoDB Atlas Settings

1. Log in to MongoDB Atlas
2. Go to your cluster
3. Click **Network Access** in the left sidebar
4. Add `0.0.0.0/0` to the IP Access List (temporarily for testing)
5. Or add specific Netlify IP ranges if you know them

### 4. Test the Connection

After updating the environment variables:

1. Trigger a new deployment in Netlify (Deploy > Trigger deploy > Clear cache and deploy site)
2. Visit your site's `/db-test` page to test the MongoDB connection
3. Check the Netlify function logs for detailed error messages

### 5. Check for Special Characters

If your MongoDB password contains special characters, make sure they are properly URL-encoded in the connection string.

## Troubleshooting

If you're still having issues:

1. Use the `/env-check` endpoint to verify environment variables are set
2. Check Netlify function logs for detailed error messages
3. Try a different MongoDB Atlas tier (M0 free tier has limitations)
4. Verify your MongoDB Atlas account is active and not suspended

## Need More Help?

If you continue to experience issues:

1. Check the `MONGODB_TROUBLESHOOTING.md` file for more detailed steps
2. Contact MongoDB Atlas support if it appears to be an Atlas-specific issue
3. Contact Netlify support if it appears to be a Netlify-specific issue