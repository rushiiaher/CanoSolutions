# VPS Deployment Guide - Separate Frontend/Backend

## For Keeping Express Backend Separate

### VPS Server Setup
```bash
# Install Node.js, PM2, Nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
sudo npm install -g pm2

# Clone your repository
git clone <your-repo-url>
cd CanoSolutions
```

### Backend Deployment (Express)
```bash
cd express-backend
npm install
pm2 start server.js --name "cano-backend"
```

### Frontend Deployment (Next.js)
```bash
cd ../Node-Sample
npm install
npm run build
pm2 start npm --name "cano-frontend" -- start
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Environment Variables
Create `.env` files in both directories:

**express-backend/.env:**
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
VITE_ORIGIN=https://yourdomain.com
```

**Node-Sample/.env.local:**
```
NEXT_PUBLIC_API_BASE_URL=https://yourdomain.com/api
MONGODB_URI=your_mongodb_connection_string
```

### Process Management
```bash
# Start all services
pm2 start ecosystem.config.js

# Monitor
pm2 monit

# Restart
pm2 restart all

# Auto-start on boot
pm2 startup
pm2 save
```

### Ecosystem Configuration
Create `ecosystem.config.js` in root:
```javascript
module.exports = {
  apps: [
    {
      name: 'cano-backend',
      cwd: './express-backend',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'cano-frontend',
      cwd: './Node-Sample',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
```