import { useState } from 'react'

const useSubscribe = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const subscribe = () => {}

  return {
    title,
    setTitle,
    description,
    setDescription,
    subscribe,
  }
}

export default useSubscribe
