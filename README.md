# Rocket League Pro Coaching Website

A modern, professional website for Rocket League coaching services built with Eleventy and Tailwind CSS. Features a gaming-inspired design, integrated payment system (Stripe), and optimized for conversions.

## ✨ Features

- **Modern Gaming Design**: Rocket League themed with custom colors, animations, and gaming fonts
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)
- **Payment Integration**: Ready for Stripe Checkout integration
- **SEO Optimized**: Meta tags, structured data, and performance optimized
- **Interactive Elements**: Smooth animations, hover effects, and micro-interactions
- **Service Booking**: Complete booking flow with service selection and contact forms
- **Easy Hosting**: Static site ready for deployment on Netlify, Vercel, or GitHub Pages

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and setup**
   ```bash
   git clone <your-repo-url>
   cd rlc
   npm install
   ```

2. **Build CSS and start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Visit `http://localhost:8080` to see your site

### Available Scripts

- `npm run dev` - Start development server with live reload
- `npm run build` - Build production site
- `npm run start` - Build CSS and serve site
- `npm run clean` - Clean build directory

## 📁 Project Structure

```
rlc/
├── src/
│   ├── _layouts/
│   │   └── base.njk           # Main layout template
│   ├── _includes/             # Reusable components (optional)
│   ├── services/
│   │   └── index.njk          # Services page
│   ├── about/
│   │   └── index.njk          # About page
│   ├── book/
│   │   └── index.njk          # Booking page
│   ├── contact/
│   │   └── index.njk          # Contact page
│   ├── styles/
│   │   ├── input.css          # Tailwind CSS source
│   │   └── output.css         # Generated CSS (auto-generated)
│   ├── js/
│   │   └── main.js            # Main JavaScript file
│   └── index.njk              # Homepage
├── .eleventy.js               # Eleventy configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🎨 Design System

### Colors
- **RL Blue**: Primary brand color with blue gradient variations
- **RL Orange**: Accent color for CTAs and highlights  
- **RL Purple**: Secondary accent for variety
- **RL Dark**: Dark theme background colors

### Typography
- **Gaming Font**: Orbitron for headings and gaming elements
- **Body Font**: Inter for readability and modern look

### Components
- **Cards**: Glass-morphism style cards with subtle borders
- **Buttons**: Three variants (primary, secondary, gaming)
- **Forms**: Styled inputs with focus states
- **Animations**: Scroll-triggered animations and hover effects

## 💳 Payment Integration

The site is prepared for Stripe integration. To set up payments:

1. **Create Stripe Account**
   - Sign up at [stripe.com](https://stripe.com)
   - Get your publishable and secret keys

2. **Backend Setup** (required for Stripe)
   - Create serverless functions for payment processing
   - Examples provided for Netlify Functions or Vercel API routes

3. **Update Booking Form**
   - Replace the placeholder payment logic in `src/book/index.njk`
   - Connect to your payment backend

### Example Backend (Netlify Functions)

```javascript
// netlify/functions/create-payment-intent.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  try {
    const { amount, service } = JSON.parse(event.body);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: 'usd',
      metadata: { service }
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ client_secret: paymentIntent.client_secret })
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};
```

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect Repository**
   - Link your GitHub repo to Netlify
   - Auto-deploy on push to main branch

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: _site
   ```

3. **Environment Variables**
   ```
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   ```

### Vercel

1. **Deploy with Vercel CLI**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Or connect via Dashboard**
   - Import your repo at [vercel.com](https://vercel.com)

### GitHub Pages

1. **Update Build Script** (add to package.json)
   ```json
   "scripts": {
     "build:gh": "npm run build && echo 'yourdomain.com' > _site/CNAME"
   }
   ```

2. **Enable GitHub Pages**
   - Go to repo Settings > Pages
   - Set source to GitHub Actions
   - Use Eleventy GitHub Action

## ⚙️ Customization

### Branding
1. **Update Logo**: Replace "RL ProCoach" in navigation
2. **Colors**: Modify `tailwind.config.js` color scheme
3. **Content**: Update copy in all page files
4. **Contact Info**: Update Discord, email, Steam info

### Services & Pricing
1. **Edit Services**: Modify `src/services/index.njk`
2. **Update Pricing**: Change prices in service cards
3. **Add Services**: Create new service options in booking page

### Coach Information
1. **About Page**: Update story and credentials in `src/about/index.njk`
2. **Testimonials**: Replace with real testimonials
3. **Stats**: Update coaching statistics

## 📱 Mobile Optimization

- Responsive design tested on all screen sizes
- Touch-friendly buttons and form elements
- Optimized images and fast loading
- Progressive Web App ready (add manifest.json)

## 🔧 Performance

### Optimization Features
- Minified CSS and JavaScript
- Optimized images (add image processing)
- Fast static site generation
- CDN-ready for global distribution

### Lighthouse Scores Target
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

## 📊 Analytics & Tracking

Add your preferred analytics:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  // Facebook Pixel code
</script>
```

## 🤝 Support & Maintenance

### Regular Updates
- Keep dependencies updated monthly
- Monitor performance and SEO
- Update content based on coaching evolution
- A/B test booking conversion rates

### Backup Strategy
- Repository stored on GitHub
- Regular deployment backups
- Environment variables documented

## 📄 License

This project is licensed under the MIT License. Feel free to customize and use for your coaching business.

## 🎯 Next Steps

1. **Content**: Replace placeholder content with your real information
2. **Images**: Add professional photos and coaching screenshots
3. **Stripe**: Set up payment processing
4. **Domain**: Connect your custom domain
5. **Analytics**: Add tracking and conversion monitoring
6. **SEO**: Submit to search engines and optimize for local search

---

Built with ❤️ for the Rocket League coaching community. Ready to help players reach their rank goals! 