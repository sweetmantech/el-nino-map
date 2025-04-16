'use client'

import { Fragment, useEffect, useState } from 'react'
import Modal from '../Modal'

const OnBoarding = () => {
  const [isOpenOnboarding, setIsOpenOnboarding] = useState(false)
  const [currentStep, setCurrentStep] = useState<number>(0)

  const steps = [
    {
      title: 'Welcome to  El Niño Maravilla!',
      message: '¡Q hay! I’m Atlas, your guide through this journey.',
    },
    {
      title: 'Your Adventure Map',
      message:
        'Discover new music, videos, and hidden surprises. Stay sharp, updates drop like shooting stars.',
    },
    {
      title: 'Cosmic Features',
      message:
        'Every planet has its own vibe: Collect the latest drop in the center, watch videos, and subscribe for exclusive experiences. Pro tip: Spot the comet? That’s your chance to share your own memories.',
    },
    {
      title: 'Estas ready?',
      message: 'Your journey starts now. Hit EXPLORE (top right) to sign in and unlock more.',
    },
  ]

  const onStep = () => {
    if (currentStep === steps.length - 1) {
      localStorage.setItem('onboarded', 'true')
      setIsOpenOnboarding(false)
      return
    }
    setCurrentStep(currentStep + 1)
  }

  useEffect(() => {
    setIsOpenOnboarding(localStorage.getItem('onboarded') !== 'true')
  }, [])

  if (!isOpenOnboarding) return <Fragment />
  return (
    <Modal>
      <div className="max-w-[430px] p-3 bg-white rounded-md relative" id="coming-soon">
        <p className="font-akira text-xl pb-1">{steps[currentStep].title}</p>
        <p className="font-titilliumweb text-grey pb-1">{steps[currentStep].message}</p>
        <button
          className="bg-black text-white w-full py-2 mt-2 rounded-md font-titilliumweb text-lg"
          onClick={onStep}
        >
          {currentStep === steps.length - 1 ? 'Start Journey' : 'Next'}
        </button>
      </div>
    </Modal>
  )
}

export default OnBoarding
