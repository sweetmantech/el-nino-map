import { useEffect, useState } from 'react'

const useIframely = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const scriptId = 'iframely-embed-script'
    const existingScript = document.getElementById(scriptId)

    if (existingScript) {
      setIsLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://iframely.net/embed.js'
    script.async = true
    script.onload = () => {
      setIsLoaded(true)
    }

    document.body.appendChild(script)

    return () => {
      const scriptToRemove = document.getElementById(scriptId)
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [])

  return { isLoaded }
}

export default useIframely
