# Stripe Integration Setup Guide

## Required Environment Variables

You need to set these environment variables in your Netlify dashboard:

### 1. Stripe Secret Key
- Go to your [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
- Copy your **Secret key** (starts with `sk_test_` for test mode or `sk_live_` for live mode)
- In Netlify: Site Settings → Environment Variables → Add variable
- Name: `STRIPE_SECRET_KEY`
- Value: Your secret key

### 2. Stripe Price IDs
You need to get the Price IDs for your products from Stripe:

#### For Coaching Sessions ($20/hour):
- Go to [Stripe Products](https://dashboard.stripe.com/products)
- Find your coaching product
- Copy the Price ID (starts with `price_`)
- In Netlify: Add environment variable
- Name: `STRIPE_COACHING_PRICE_ID`
- Value: Your coaching price ID

#### For Replay Analysis ($5/replay):
- Find your replay analysis product in Stripe
- Copy the Price ID
- In Netlify: Add environment variable
- Name: `STRIPE_REPLAY_PRICE_ID`
- Value: Your replay analysis price ID

### 3. Website URL (automatic)
- Netlify automatically sets the `URL` environment variable
- This will be: `https://rlclarity.shop`

## Testing with Stripe Test Mode

1. Use test keys (starting with `sk_test_`)
2. Create test products with test price IDs
3. Use test card numbers for payments:
   - Success: `4242 4242 4242 4242`
   - Declined: `4000 0000 0000 0002`

## Going Live

1. Switch to live keys in Stripe dashboard
2. Update environment variables in Netlify with live keys
3. Create live products and get live price IDs
4. Test with real payment methods

## How Payments Work

1. Customer fills out booking form
2. JavaScript sends data to Netlify Function
3. Function creates Stripe Checkout Session
4. Customer redirected to Stripe's secure payment page
5. After payment, customer redirected to success page
6. You receive payment notification and customer data in Stripe Dashboard

## Customer Data in Stripe

All customer information is stored in Stripe metadata:
- Name, email, Discord username
- Rocket League rank
- Goals and availability
- Service type (coaching or replay analysis)

You can view this in your Stripe Dashboard under Payments. 