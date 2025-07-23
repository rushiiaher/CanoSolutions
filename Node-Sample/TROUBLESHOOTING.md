# Netlify Deployment Troubleshooting Guide

This guide helps troubleshoot common issues with the CanoSolutions website deployment on Netlify.

## Common Issues and Solutions

### 1. Form Submission Errors

If forms are returning "Internal Server Error" or not submitting:

- **Check MongoDB Connection**: Ensure the MongoDB URI is correctly set in Netlify environment variables
- **Verify Environment Variables**: Make sure `MONGODB_URI` is properly set with the correct format: `mongodb+srv://username:password@cluster.mongodb.net/...`
- **Check Function Logs**: In Netlify dashboard, go to Functions > Your Function > Logs to see detailed error messages

### 2. API Endpoint Issues

If API endpoints are not responding:

- Visit `/api-test` on your deployed site to check API health
- Ensure redirects in `netlify.toml` are correctly configured
- Check that function permissions are set correctly

## Deployment Checklist

1. **Before deploying to Netlify**:
   - Run `npm run build` locally to verify build succeeds
   - Test API endpoints locally with `netlify dev`

2. **Netlify Environment Setup**:
   - Set `MONGODB_URI` with the complete connection string including protocol
   - Set `NODE_VERSION` to 18 (or your preferred version)

3. **Deployment Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: `netlify/functions`

4. **After Deployment**:
   - Visit `/api-test` to verify API connectivity
   - Check function logs in Netlify dashboard for any errors

## Debugging Steps

If you encounter issues after deployment:

1. **Check Netlify Function Logs**:
   - Go to Netlify Dashboard > Your Site > Functions
   - Click on the function name to view logs

2. **Verify MongoDB Connection**:
   - Use the `/api-test` page to check database connectivity
   - Ensure IP allowlist in MongoDB Atlas includes Netlify's IPs or is set to allow access from anywhere (0.0.0.0/0)

3. **Test API Endpoints**:
   - Use browser developer tools to inspect network requests
   - Check for CORS issues or other request/response problems

4. **Common Error Solutions**:
   - "Internal Server Error" - Check MongoDB connection and credentials
   - "Not Found" errors - Verify function paths and redirects
   - CORS errors - Check CORS headers in function responses

## Quick Fixes

- **Redeploy Functions**: In Netlify dashboard, go to Functions and trigger a redeploy
- **Clear Cache**: In Netlify dashboard, go to Deploys > Trigger Deploy > Clear cache and deploy site
- **Update Environment Variables**: After changing environment variables, redeploy the site

## Contact

If issues persist after trying these solutions, contact the development team with:
- Error messages from function logs
- Steps to reproduce the issue
- Environment details (browser, device, etc.)