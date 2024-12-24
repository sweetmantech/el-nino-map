import trackMemories from '@/lib/stack/trackMemories'
import { useState } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import { Account } from 'thirdweb/wallets'

const useShareMemories = () => {
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')
  const activeAccount: Account = useActiveAccount()
  const address = activeAccount?.address

  const share = async () => await trackMemories(address, url, content)

  return {
    url,
    setUrl,
    content,
    setContent,
    share,
  }
}

export default useShareMemories
