'use client'

import InventoryPlayer from './InventoryPlayer'
import CollectAlbum from './CollectAlbum'
import InventoryZora from './InvertoryZora'
import useInventoryAccess from '@/hooks/useInventoryAccess'
import { useRouter } from 'next/navigation'
import InteractiveNFT from './InteractiveNFT'

const InventoryPage = () => {
  const { hasAccess, isLoading, address } = useInventoryAccess()
  const { push } = useRouter()

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-950 pt-20 pb-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-white text-lg">Loading...</p>
          </div>
        </div>
      </main>
    )
  }

  if (!address) {
    return (
      <main className="min-h-screen bg-slate-950 pt-20 pb-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <p className="text-white text-lg text-center">
              Please connect your wallet to access the inventory
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (!hasAccess) {
    return (
      <main className="min-h-screen bg-slate-950 pt-20 pb-8 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <p className="text-white text-lg text-center">
              You need a Maravilla Pass to access this page. Click here to get yours.
            </p>
            <button
              type="button"
              onClick={() => push('/')}
              className="bg-white text-black px-6 py-3 rounded-md font-bold hover:bg-gray-200 transition"
            >
              Get Maravilla Pass
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-20 pb-8 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Maravilla Inventory</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InventoryPlayer />
          <InteractiveNFT />
          <CollectAlbum />
          <InventoryZora />
        </div>
      </div>
    </main>
  )
}

export default InventoryPage
