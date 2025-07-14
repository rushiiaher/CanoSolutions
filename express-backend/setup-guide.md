# MongoDB Atlas Setup Guide

## Step 1: Create Database User
1. Go to https://cloud.mongodb.com/
2. Sign in to your account
3. Select your project
4. Click "Database Access" in left sidebar
5. Click "Add New Database User"
6. Choose "Password" authentication
7. Username: `canosolutions`
8. Password: `CanoSolutions2024!`
9. Database User Privileges: "Read and write to any database"
10. Click "Add User"

## Step 2: Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 3: Get Connection String
1. Go to "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password

## Step 4: Update .env file
Use the connection string format provided below.