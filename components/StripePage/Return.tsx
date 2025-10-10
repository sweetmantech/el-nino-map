'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const Return = () => {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState(null)
  const [customerEmail, setCustomerEmail] = useState('')

  useEffect(() => {
    if (!sessionId) return

    fetch(`/api/stripe/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status)
        setCustomerEmail(data.customer_email)
      })
  }, [sessionId])

  if (status === 'open') {
    return <p>Payment did not complete. Please try again.</p>
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}. If you
          have any questions, please email{' '}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null
}

export default Return
