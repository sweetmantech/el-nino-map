import trackMemories from '@/lib/stack/trackMemories'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import { Account } from 'thirdweb/wallets'

const useShareMemories = () => {
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')
  const activeAccount: Account = useActiveAccount()
  const address = activeAccount?.address
  const { push } = useRouter()

  const share = async () => {
    await trackMemories(address, url, content)
    push('/imagination')
  }

  return {
    url,
    setUrl,
    content,
    setContent,
    share,
  }
}

export default useShareMemories
