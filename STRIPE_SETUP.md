# Stripe Checkout Demo Setup

## Overview
A complete Stripe checkout implementation with a minimal cart preview and hosted checkout page integration.

## Features
- ✅ Minimal cart preview with demo products
- ✅ Stripe hosted checkout integration
- ✅ Success/failure page handling
- ✅ Payment verification
- ✅ Clean, responsive UI

## Setup Instructions

### 1. Get Stripe API Keys
1. Sign up at [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to Developers → API Keys
3. Copy your publishable key (starts with `pk_test_`)
4. Copy your secret key (starts with `sk_test_`)

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

### 3. Test the Demo
1. Start the development server: `yarn dev`
2. Navigate to `/stripe`
3. Click "Proceed to Checkout"
4. Use Stripe test card: `4242 4242 4242 4242`
5. Use any future expiry date and any CVC

## File Structure
```
/app/stripe/
  ├── page.tsx              # Main stripe demo page
  ├── success/page.tsx      # Success page after payment
/app/api/stripe/
  ├── checkout/route.ts     # Create checkout session API
  ├── verify/route.ts       # Verify payment API
/components/StripeCheckoutPage/
  ├── StripeCheckoutPage.tsx # Main checkout component
  ├── CartPreview.tsx       # Cart preview component
  ├── index.tsx            # Export file
/hooks/
  ├── useStripeCheckout.ts  # Checkout logic hook
/lib/
  ├── stripe.ts            # Stripe configuration & utilities
```

## Demo Products
The demo includes two sample products:
- Premium T-Shirt ($29.99)
- Coffee Mug ($15.99) x2

## Important Notes
- Uses Stripe's hosted checkout (no PCI compliance needed)
- Test mode only - no real payments processed
- Includes proper error handling and loading states
- Mobile responsive design