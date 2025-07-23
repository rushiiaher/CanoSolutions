# Netlify Environment Variable Update

Make sure to update the `MONGODB_URI` environment variable in your Netlify dashboard with the new connection string:

```
mongodb+srv://Cano:ChhxF5kcjmvXblVK@cluster0.ze01tlz.mongodb.net/canosolutions?retryWrites=true&w=majority
```

Steps:
1. Go to your Netlify dashboard
2. Select your site (canosolutions)
3. Go to Site settings > Environment variables
4. Find the `MONGODB_URI` variable and edit it
5. Paste the new connection string
6. Save the changes
7. Trigger a new deployment

This is necessary because .env.local files are not committed to Git for security reasons.