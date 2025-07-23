# CanoSolutions Deployment Guide

This project is now configured to use a standalone Express backend. Follow these steps to deploy the application:

## 1. Deploy the Backend

1.  Navigate to the `express-backend` directory.
2.  Deploy the backend to a hosting service like Vercel or Render.
3.  Once deployed, note the URL of your backend.

## 2. Configure the Frontend

1.  Open the `Node-Sample/.env.local` file.
2.  Update the `NEXT_PUBLIC_API_BASE_URL` with the URL of your deployed backend. For example:
    ```
    NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.vercel.app/api
    ```

## 3. Deploy the Frontend

1.  Navigate to the `Node-Sample` directory.
2.  Deploy the frontend to Netlify.

Your application should now be live with the frontend and backend connected.
