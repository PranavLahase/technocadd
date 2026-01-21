# PSP TechnoCADD Website

Official company website for PSP TechnoCADD Ancillary Private Limited - Advanced 3D Printing & Engineering Solutions.

## 🚀 Features

- **Responsive Design**: Fully responsive across all devices
- **Hero Video Background**: Autoplay looping video on homepage
- **Contact Form**: With email notification system
- **Brochure Download**: Automated PDF download functionality
- **Modern UI/UX**: Clean, professional design with smooth animations
- **SEO Optimized**: Proper meta tags and semantic HTML

## 📁 Project Structure

```
technocaddapl-website/
├── index.html              # Homepage with hero video
├── about.html              # About us page
├── services.html           # Services overview
├── portfolio.html          # Portfolio/projects
├── equipment.html          # Equipment offerings
├── team.html               # Team members
├── blog.html               # Blog/news
├── careers.html            # Career opportunities
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── script.js           # Frontend JavaScript
├── images/                 # Image assets
├── assets/
│   ├── hero-video.mp4      # Hero section video
│   └── PSP-TechnoCADD-Brochure.pdf  # Company brochure
├── api/
│   ├── contact.js          # Contact form API (Node.js)
│   └── download.js         # Brochure download API (Node.js)
├── package.json            # Node.js dependencies
├── vercel.json             # Vercel configuration
└── README.md               # This file
```

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Vanilla JS for interactivity

### Backend
- **Node.js**: Serverless functions
- **Nodemailer**: Email functionality
- **Vercel**: Hosting platform

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- Git
- Vercel CLI (optional, for local testing)

### Step 1: Clone/Initialize Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - PSP TechnoCADD website"
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Add Your Assets

1. **Hero Video**: Add your company video as `assets/hero-video.mp4`
   - Recommended: MP4 format, 1920x1080, under 10MB
   - Optimize for web (H.264 codec)

2. **Brochure**: Add your PDF as `assets/PSP-TechnoCADD-Brochure.pdf`

3. **Images**: Add company images to `images/` folder:
   - `facility.jpg`
   - `stratasys-j850.jpg`
   - `metal-printer.jpg`
   - `ev-trainer.jpg`

### Step 4: Push to GitHub

```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR-USERNAME/technocaddapl-website.git
git branch -M main
git push -u origin main
```

## 🚢 Deployment to Vercel

### Option 1: Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and login with GitHub
2. Click "Add New" → "Project"
3. Import your `technocaddapl-website` repository
4. Vercel will auto-detect settings
5. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables Setup

In Vercel Dashboard → Project → Settings → Environment Variables, add:

| Variable | Value | Description |
|----------|-------|-------------|
| `SMTP_HOST` | `smtp.gmail.com` | Email server host |
| `SMTP_PORT` | `587` | Email server port |
| `SMTP_USER` | `your-email@gmail.com` | Sender email |
| `SMTP_PASS` | `your-app-password` | Email app password |

**For Gmail:**
1. Enable 2-factor authentication
2. Generate App Password: Google Account → Security → App passwords
3. Use the generated 16-character password as `SMTP_PASS`

## 🌐 Connect GoDaddy Domain

### Step 1: Add Domain in Vercel

1. Go to Vercel Project → Settings → Domains
2. Add: `technocaddapl.com` and `www.technocaddapl.com`
3. Vercel will show DNS records needed

### Step 2: Update GoDaddy DNS

1. Login to GoDaddy → My Products → Domains
2. Click "Manage" → "DNS"
3. Add these records:

**For root domain:**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel IP)
- TTL: 600

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`
- TTL: 600

### Step 3: Verify

- DNS propagation: 5 minutes to 48 hours (usually 1-2 hours)
- Check status in Vercel dashboard
- SSL certificate issued automatically

## 🎥 Hero Video Setup

The hero video will:
- ✅ Autoplay on page load
- ✅ Loop continuously
- ✅ Mute by default (required for autoplay)
- ✅ Work on mobile devices (playsinline attribute)
- ✅ Have dark overlay for text readability

**Video Optimization Tips:**
```bash
# Use FFmpeg to optimize your video
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 2M -b:a 128k assets/hero-video.mp4
```

## 📧 Contact Form Configuration

The contact form:
- Sends email to: `contact@technocaddapl.com`
- Sends auto-reply to user
- Validates all fields
- Shows success/error messages
- Works with Gmail, SendGrid, or any SMTP server

## 📱 Responsive Breakpoints

- Desktop: > 968px
- Tablet: 768px - 968px
- Mobile: < 768px

## 🎨 Color Scheme

```css
--primary-color: #2563eb (Blue)
--accent-color: #f59e0b (Orange)
--dark-bg: #0f172a (Dark Navy)
--light-bg: #f8fafc (Light Gray)
```

## 🔧 Local Development

```bash
# Install Vercel CLI
npm install -g vercel

# Run development server
vercel dev

# Open browser at http://localhost:3000
```

## 📞 Support

**PSP TechnoCADD Ancillary Private Limited**
- 📍 Chhatrapati Sambhajinager, Maharashtra, India 431003
- 📞 +91 75885 37452 | +91 02406481151
- ✉️ contact@technocaddapl.com
- 🌐 www.technocaddapl.com

## 📄 License

Copyright © 2026 PSP TechnoCADD Ancillary Private Limited. All rights reserved.

---

**Built with ❤️ for PSP TechnoCADD**
