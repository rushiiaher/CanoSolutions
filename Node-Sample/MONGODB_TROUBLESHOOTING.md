# MongoDB Connection Troubleshooting

This document provides steps to troubleshoot MongoDB connection issues with Netlify Functions.

## Common Issues

1. **Environment Variables Not Set**: Netlify might not have the correct MongoDB URI in its environment variables.
2. **Connection String Format**: The MongoDB connection string might be incorrectly formatted.
3. **Network Access**: MongoDB Atlas might be blocking connections from Netlify's IP addresses.
4. **Database User Permissions**: The database user might not have the correct permissions.

## Troubleshooting Steps

### 1. Verify Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Navigate to Site settings > Build & deploy > Environment
3. Check that `MONGODB_URI` is set correctly
4. The format should be: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`

### 2. Test the Connection

Use the `/api/db-test` endpoint to test your MongoDB connection:

```
https://your-site.netlify.app/.netlify/functions/db-test
```

This will return a JSON response indicating if the connection was successful or not.

### 3. Check MongoDB Atlas Settings

1. **IP Access List**: 
   - In MongoDB Atlas, go to Network Access
   - Add `0.0.0.0/0` to allow connections from anywhere (for testing only)
   - For production, add Netlify's IP ranges

2. **Database User**:
   - Verify the user has readWrite permissions
   - Reset the password if necessary

### 4. Connection String Issues

If using MongoDB Atlas, ensure you're using the correct connection string:

1. In Atlas, click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" and the appropriate version
4. Copy the connection string and replace `<password>` with your actual password
5. Update the `MONGODB_URI` in Netlify environment variables

### 5. Netlify Function Logs

Check the Netlify function logs for detailed error messages:

1. Go to Netlify dashboard > Functions
2. Click on the function that's failing
3. Review the logs for specific error messages

## Testing Locally

To test MongoDB connection locally:

1. Create a `.env.local` file with your `MONGODB_URI`
2. Run `netlify dev` to test functions locally
3. Access `http://localhost:8888/.netlify/functions/db-test`

## Still Having Issues?

If you're still experiencing connection problems:

1. Try a different MongoDB Atlas tier (M0 free tier has limitations)
2. Check if your MongoDB Atlas cluster is in maintenance mode
3. Verify your MongoDB Atlas account is active and not suspended