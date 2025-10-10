'use client'

import { Suspense } from 'react'
import { ReturnContent } from '@/components/StripePage'

export default function ReturnPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReturnContent />
    </Suspense>
  )
}
