# MongoDB Connection Troubleshooting

This document provides steps to troubleshoot MongoDB connection issues with Netlify Functions.

## Common Issues and Solutions

### 1. MongoDB URI Format

The MongoDB URI should be in the format:
```
mongodb+srv://username:password@cluster.mongodb.net/database?options
```

Make sure:
- The protocol prefix (`mongodb+srv://` or `mongodb://`) is included
- Username and password are correctly URL-encoded
- The cluster address is correct

### 2. MongoDB Atlas Configuration

1. **IP Access List**:
   - Netlify Functions run on dynamic IPs
   - In MongoDB Atlas, go to Network Access and add `0.0.0.0/0` to allow access from anywhere
   - Alternatively, add specific Netlify IP ranges

2. **User Permissions**:
   - Ensure the database user has at least "Read and Write" permissions
   - Check that the user is authorized for the specific database

### 3. Environment Variables

1. **Check Netlify Environment Variables**:
   - In Netlify dashboard, go to Site settings > Environment variables
   - Verify `MONGODB_URI` is set correctly
   - Make sure there are no extra spaces or characters

2. **Local Testing**:
   - Use `netlify dev` to test locally with the same environment
   - Create a `.env` file with the same variables for local testing

### 4. Testing Steps

1. Visit `/test-db` on your site to run the database connection test
2. Check Netlify Function logs for detailed error messages
3. Try the health check endpoint at `/.netlify/functions/health`

### 5. Common Error Messages

- **MongoServerSelectionError**: Usually indicates network connectivity issues or IP access restrictions
- **Authentication failed**: Check username and password in the connection string
- **Connection timed out**: Network issues or firewall restrictions

## Quick Fixes

1. **Regenerate MongoDB Password**:
   - In MongoDB Atlas, go to Database Access
   - Edit the user and set a new password
   - Update the password in your Netlify environment variables

2. **Create a Dedicated Database User**:
   - Create a new user specifically for your application
   - Grant only the necessary permissions

3. **Check Database Name**:
   - Verify you're connecting to the correct database name
   - In the functions, ensure `client.db('canosolutions')` matches your actual database name

4. **Netlify Function Timeout**:
   - If connections are slow, they might exceed Netlify's function timeout
   - Consider increasing connection timeout settings or optimizing the connection process