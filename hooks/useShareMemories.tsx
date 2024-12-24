import generateAddress from '@/lib/generateAddress'
import trackMemories from '@/lib/stack/trackMemories'
import { useState } from 'react'
import { toast } from 'react-toastify'

const useShareMemories = () => {
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')

  const share = async () => {
    const address = generateAddress()
    await trackMemories(address, url, content)
    toast.success('Shared!')
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
