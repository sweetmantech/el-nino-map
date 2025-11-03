import { useEffect, useState } from 'react'
import { Address } from 'viem'
import getBalanceOf from '@/lib/zora/getBalanceOf'
import { ADMIN_WALLETS } from '@/lib/consts'
import { useActiveAccount } from 'thirdweb/react'

const useInventoryAccess = (): {
  hasAccess: boolean | null
  isLoading: boolean
  address: Address | undefined
} => {
  const activeAccount = useActiveAccount()
  const address = activeAccount?.address as Address | undefined
  const [hasAccess, setHasAccess] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      if (!address) {
        setHasAccess(false)
        setIsLoading(false)
        return
      }
      if (ADMIN_WALLETS.map((w) => w.toLowerCase()).includes(address.toLowerCase())) {
        setHasAccess(true)
        setIsLoading(false)
        return
      }
      const balance = await getBalanceOf(address as Address)
      setHasAccess(balance > BigInt(0))
      setIsLoading(false)
    }

    checkAccess()
  }, [address])

  return { hasAccess, isLoading, address }
}

export default useInventoryAccess
