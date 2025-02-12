'use client'

import dynamic from 'next/dynamic'

const LandingPage = dynamic(() => import('@/components/LandingPage'), {
  ssr: false,
})

const Page = () => <LandingPage />

export default Page
