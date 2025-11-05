'use client'

import { useStripeModal } from '@/hooks/useStripeModal'
import { StripeModal } from '@/components/StripePage'

const CollectAlbum = () => {
  const { isOpen, open, close } = useStripeModal()

  return (
    <>
      <div className="bg-slate-900 rounded-xl p-6 h-fit flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold text-white mb-4">Collect the Album</h3>
        <p className="text-slate-400 text-sm mb-4">
          The full Maravilla album - available early to Pass holders.
        </p>
        <p className="text-slate-400 text-md">
          Collect songs before they stream worldwide. powered by strpe.
        </p>
        <button
          onClick={open}
          className="bg-white text-black px-6 py-3 rounded-md font-bold hover:bg-gray-200 transition mt-4"
        >
          Collect the Album
        </button>
      </div>
      {isOpen && <StripeModal onClose={close} />}
    </>
  )
}

export default CollectAlbum
