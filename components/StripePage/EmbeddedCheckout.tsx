import { useEffect, useRef } from 'react'
import { getStripe } from '@/lib/stripe/config'

interface EmbeddedCheckoutProps {
  clientSecret: string
  onComplete?: () => void
}

export default function EmbeddedCheckout({ clientSecret, onComplete }: EmbeddedCheckoutProps) {
  const checkoutRef = useRef<HTMLDivElement>(null)
  const stripeCheckoutRef = useRef<any>(null)

  useEffect(() => {
    if (!clientSecret || !checkoutRef.current) return

    const initializeEmbeddedCheckout = async () => {
      try {
        const stripe = await getStripe()
        if (!stripe) throw new Error('Stripe failed to initialize')

        // Initialize embedded checkout
        const embeddedCheckout = await (stripe as any).initEmbeddedCheckout({
          clientSecret,
        })

        // Mount the checkout
        embeddedCheckout.mount(checkoutRef.current)
        stripeCheckoutRef.current = embeddedCheckout

        // Listen for completion
        embeddedCheckout.on('complete', () => {
          onComplete?.()
        })
      } catch (error) {
        console.error('Failed to initialize embedded checkout:', error)
      }
    }

    initializeEmbeddedCheckout()

    // Cleanup
    return () => {
      if (stripeCheckoutRef.current) {
        stripeCheckoutRef.current.unmount()
      }
    }
  }, [clientSecret, onComplete])

  return (
    <div className="w-full">
      <div ref={checkoutRef} className="min-h-[400px]">
        {/* Stripe will mount the checkout form here */}
      </div>
    </div>
  )
}