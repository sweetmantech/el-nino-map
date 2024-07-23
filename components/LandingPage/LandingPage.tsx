'use client'

import ImageMapper from 'react-img-mapper'
import map from '@/lib/image-map.json'
import { useMeasure } from 'react-use'
import { useState } from 'react'
import Image from 'next/image'
import Typewriter from 'typewriter-effect'

const LandingPage = () => {
  const [containerRef, { height }] = useMeasure() as any
  const [isVisibleToolTip, setIsVisibleTooltip] = useState(false)
  const [tooltipX, setTooltipX] = useState(0)
  const [tooltipY, setTooltipY] = useState(0)
  const [isVisibleDlg, setIsVisibleDlg] = useState(false)
  const [isTypingEnded, setIsTypingEnded] = useState(false)

  const showTooltip = (e: any) => {
    if (isVisibleDlg) return
    setIsVisibleTooltip(true)
    const x = e.clientX
    const y = e.clientY

    setTooltipX(x)
    setTooltipY(y)
  }

  const showDlg = () => {
    setIsVisibleTooltip(false)
    setIsVisibleDlg(true)
  }

  const closeDlg = () => {
    if (!isVisibleDlg) return
    setIsVisibleDlg(false)
  }

  return (
    <div
      className="bg-center bg-cover bg-[url('/images/home.jpg')] bg-center
      w-full h-full flex items-center justify-center"
      ref={containerRef}
    >
      <div className="cursor-pointer relative" onClick={closeDlg}>
        <ImageMapper
          src="/images/space-station.png"
          map={map}
          responsive
          parentWidth={(height / 870) * 836}
          onMouseMove={(area, index, e) => showTooltip(e)}
          onMouseLeave={() => setIsVisibleTooltip(false)}
          onClick={showDlg}
        />
        {isVisibleDlg && (
          <div
            className="absolute left-[10px] bottom-[20px] z-[10]
        flex items-end"
          >
            <div className="w-[200px] aspect-[320/324] relative z-[10]">
              <Image
                src="/images/mbo-character.webp"
                layout="fill"
                className="absolute object-fit"
                alt=""
              />
            </div>
            <div
              className={`ml-[-20px] relative bg-white z-[9]
          w-[250px] h-[100px] p-3 border-[4px] border-[black]
          text-[18px] font-[700] ${isTypingEnded && 'no_typecursor'}`}
            >
              <Typewriter
                onInit={(tyepwriter) => {
                  tyepwriter
                    .typeString("We're cooking somthing! ")
                    .pauseFor(70)
                    .start()
                    .callFunction(() => {
                      setIsTypingEnded(true)
                    })
                }}
                options={{
                  autoStart: true,
                  loop: false,
                  delay: 70,
                }}
              />
            </div>
          </div>
        )}
      </div>
      {isVisibleToolTip && !isVisibleDlg && (
        <div
          className="bubble-name"
          style={{
            left: tooltipX,
            top: tooltipY,
          }}
        >
          El Niño Estrella is a multimedia experience. The smart album is a limited edition digital
          box set
        </div>
      )}
    </div>
  )
}

export default LandingPage
