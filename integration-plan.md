# Integration Plan: Express Backend into Next.js

## Current State
- Separate Express backend (port 5000)
- Next.js frontend (port 3000) 
- Netlify Functions (serverless)
- Dual backend functionality

## Recommended Integration Steps

### 1. Move to Next.js API Routes
Replace Express endpoints with Next.js API routes:

**Create these files in Node-Sample/app/api/:**
- `inquiry/route.ts` - Handle inquiry submissions
- `subscribe/route.ts` - Handle newsletter subscriptions  
- `health/route.ts` - Health check endpoint

### 2. Consolidate MongoDB Logic
- Move `express-backend/server.js` logic to Next.js API routes
- Keep existing MongoDB connection in `lib/mongodb.ts`
- Remove duplicate Netlify functions

### 3. Environment Configuration
**For Development:**
```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

**For VPS Production:**
```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com/api
```

### 4. Update API Service
Modify `lib/api-utils.ts` to use Next.js API routes instead of Express endpoints.

### 5. VPS Deployment Setup
- Single `package.json` with all dependencies
- Use PM2 for process management
- Nginx as reverse proxy
- Single build command: `npm run build`
- Single start command: `npm start`

## Benefits of Integration
✅ Single codebase to maintain
✅ Unified deployment process  
✅ Better development experience
✅ Easier environment management
✅ Reduced complexity
✅ Better performance (no separate server calls)

## Migration Steps
1. Create Next.js API routes
2. Test API routes locally
3. Update frontend to use new endpoints
4. Remove Express backend folder
5. Remove Netlify functions
6. Update deployment configuration