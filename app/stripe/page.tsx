import StripeCheckoutDemo from '@/components/stripe/StripeCheckoutDemo'
import type { Metadata } from 'next'

const TITLE = 'Stripe Checkout Demo — El Niño Maravilla'
const DESCRIPTION =
  'Preview a Stripe-powered checkout experience tailored for the El Niño Maravilla collector bundle.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
  },
}

const StripePage = () => (
  <main className="min-h-screen bg-background/60 pb-16 pt-20">
    <div className="mx-auto max-w-6xl px-6">
      <StripeCheckoutDemo />
    </div>
  </main>
)

export default StripePage
