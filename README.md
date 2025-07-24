# CanoSolutions Deployment Guide

This project is now configured to use a standalone Express backend. Follow these steps to deploy the application:

## 1. Deploy the Backend

1.  The backend has been deployed to Render at `https://canosolutions.onrender.com/`.

## 2. Configure the Frontend

1.  The `Node-Sample/.env.local` file has been updated with the deployed backend URL.

## 3. Deploy the Frontend

1.  Go to your project's settings in Netlify.
2.  Add the following environment variable:
    - **Key:** `NEXT_PUBLIC_API_BASE_URL`
    - **Value:** `https://canosolutions.onrender.com/api`
3.  Deploy the `Node-Sample` directory to Netlify.

Your application should now be live with the frontend and backend connected.
