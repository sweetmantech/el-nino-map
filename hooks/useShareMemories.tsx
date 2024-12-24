import generateAddress from '@/lib/generateAddress'
import trackMemories from '@/lib/stack/trackMemories'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

const useShareMemories = () => {
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')
  const { push } = useRouter()

  const share = async () => {
    const address = generateAddress()
    await trackMemories(address, url, content)
    toast.success('Shared!')
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
