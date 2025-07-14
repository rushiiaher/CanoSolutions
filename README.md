# CanoSolutions Website

A modern Next.js website for CanoSolutions with integrated backend functionality using Netlify Functions.

## 🚀 Features

- **Next.js 15** with React 19
- **Tailwind CSS** for styling
- **MongoDB Atlas** for database
- **Netlify Functions** for serverless backend
- **Responsive Design** with mobile-first approach
- **Contact Forms** and **Newsletter Subscription**
- **SEO Optimized**

## 📁 Project Structure

```
proj5/
├── Node-Sample/                 # Next.js Frontend
│   ├── app/                    # App Router pages
│   ├── components/             # React components
│   ├── netlify/functions/      # Serverless functions
│   └── public/                 # Static assets
└── express-backend/            # Original Express server (for reference)
```

## 🛠️ Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd proj5/Node-Sample
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local` with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_API_URL=/.netlify/functions
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

## 🌐 Netlify Deployment

### Automatic Deployment (Recommended)

1. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build directory to `Node-Sample`

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: `netlify/functions`

3. **Set Environment Variables**
   In Netlify dashboard → Site settings → Environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Deploy**
   - Push to your main branch
   - Netlify will automatically build and deploy

### Manual Deployment

1. **Build the project**
   ```bash
   cd Node-Sample
   npm run build
   ```

2. **Deploy to Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=.next
   ```

## 🔧 API Endpoints

After deployment, your API endpoints will be available at:

- `GET/POST /.netlify/functions/inquiry` - Contact form submissions
- `POST /.netlify/functions/subscribe` - Newsletter subscriptions  
- `GET /.netlify/functions/health` - Health check

## 📝 Environment Variables

### Required for Production:
- `MONGODB_URI` - MongoDB Atlas connection string

### Local Development:
- `NEXT_PUBLIC_API_URL` - API base URL (set to `/.netlify/functions` for production)

## 🚨 Important Notes

1. **Database**: Uses MongoDB Atlas - ensure your connection string is correct
2. **Functions**: Netlify Functions replace the Express backend
3. **CORS**: Configured for all origins in functions
4. **Caching**: MongoDB connections are cached in serverless functions

## 🔍 Troubleshooting

### Build Issues
- Ensure all dependencies are installed
- Check environment variables are set
- Verify MongoDB connection string

### Function Issues
- Check Netlify function logs
- Ensure MongoDB URI is set in Netlify environment
- Verify function syntax and exports

## 📞 Support

For issues or questions, contact the development team or check the Netlify deployment logs.