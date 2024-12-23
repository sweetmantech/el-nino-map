import { useState } from 'react'

const useShareMemories = () => {
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')

  return {
    url,
    setUrl,
    content,
    setContent,
  }
}

export default useShareMemories
