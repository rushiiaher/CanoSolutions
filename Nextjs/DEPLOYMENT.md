# Netlify Deployment Guide for CanoSolutions Website

## 🚀 Quick Deployment Steps

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CanoSolutions website"
   git branch -M main
   git remote add origin https://github.com/rushiiaher/Cano.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select your repository: `rushiiaher/Cano`

3. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: 18

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live!

### Method 2: Drag & Drop

1. **Build locally**
   ```bash
   npm install --legacy-peer-deps
   npm run build
   ```

2. **Upload to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag the `.next` folder to the deploy area

## ⚙️ Environment Variables

If you need environment variables, add them in Netlify:
- Go to Site settings > Environment variables
- Add any required variables

## 🔧 Build Configuration

The `netlify.toml` file is already configured with:
- Next.js plugin
- Proper redirects
- Build settings

## 🌐 Custom Domain

To use a custom domain:
1. Go to Site settings > Domain management
2. Add your custom domain
3. Configure DNS records as instructed

## 📊 Performance Optimization

The site is already optimized with:
- ✅ Image optimization
- ✅ Code splitting
- ✅ CSS optimization
- ✅ Font optimization
- ✅ SEO meta tags

## 🔍 Troubleshooting

### Common Issues:

1. **Build fails with dependency errors**
   - Use `npm install --legacy-peer-deps`
   - Check Node.js version (use 18+)

2. **Images not loading**
   - Ensure images are in `/public` folder
   - Check image paths are correct

3. **Styling issues**
   - Verify Tailwind CSS is properly configured
   - Check for CSS conflicts

### Build Logs
Check Netlify build logs for detailed error information:
- Go to Deploys tab
- Click on failed deploy
- Review build logs

## 📱 Testing

After deployment, test:
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Forms work (if any)
- [ ] Mobile responsiveness
- [ ] Performance (use Lighthouse)

## 🔄 Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch triggers auto-deploy
- Preview deployments for pull requests
- Rollback capability

## 📈 Analytics

Consider adding:
- Google Analytics
- Netlify Analytics
- Performance monitoring

---

**Your CanoSolutions website will be live at**: `https://your-site-name.netlify.app`

For custom domain: `https://canosolutions.com`