'use client'

import { useSearchParams } from 'next/navigation'
import { useStripeSessionStatus } from '@/hooks/useStripeSessionStatus'

const Return = () => {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { data, isLoading, isError } = useStripeSessionStatus(sessionId)

  if (isLoading) {
    return <p className="text-gray-600">Loading payment status...</p>
  }

  if (isError || !data) {
    return <p className="text-red-600">Error loading payment status. Please try again.</p>
  }

  if (data.status === 'open') {
    return <p className="text-yellow-600">Payment did not complete. Please try again.</p>
  }

  if (data.status === 'complete') {
    return (
      <section id="success">
        <p className="text-green-600">
          We appreciate your business! A confirmation email will be sent to{' '}
          {data.customer_details?.email}. If you have any questions, please email{' '}
          <a href="mailto:orders@example.com" className="text-blue-600 underline">
            orders@example.com
          </a>
          .
        </p>
      </section>
    )
  }

  return null
}

export default Return
