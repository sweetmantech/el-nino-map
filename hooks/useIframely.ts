'use client'

import { useEffect } from 'react'

const useIframely = () => {
  useEffect(() => {
    const loadIframelyEmbedJs = () => {
      const hasDataIframelyUrl = document.querySelectorAll('[data-iframely-url]').length > 0
      const hasIframelyIframe = document.querySelectorAll("iframe[src*='iframe.ly']").length > 0

      if (!hasDataIframelyUrl && !hasIframelyIframe) return

      const iframely = ((window as any).iframely = (window as any).iframely || {})

      if (iframely.load) {
        iframely.load()
      } else {
        const ifs = document.createElement('script')
        ifs.type = 'text/javascript'
        ifs.async = true
        ifs.src =
          (window.location.protocol === 'https:' ? 'https:' : 'http:') + '//cdn.iframe.ly/embed.js'
        const s = document.getElementsByTagName('script')[0]
        s.parentNode?.insertBefore(ifs, s)
      }
    }

    loadIframelyEmbedJs()
  }, [])
}

export default useIframely
