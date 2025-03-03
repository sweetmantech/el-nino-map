'use client'

import { Fragment, useState } from 'react'
import Modal from '../Modal'

const OnBoarding = () => {
  const [isOpenOnboarding, setIsOpenOnboarding] = useState(true)
  const [currentStep, setCurrentStep] = useState<number>(0)

  const steps = [
    {
      title: 'Welcome to  El Niño Maravilla!',
      message: "¡Hola! I'm Kid Wonder, your guide through this magical journey.",
    },
    {
      title: 'Your Adventure Map',
      message:
        'Explore freely to discover new music, videos, and hidden surprises. Stay curious - updates appear like shooting stars!',
    },
    {
      title: 'Cosmic Features',
      message:
        'Every planet has its purpose: Collect the latest songs in the center, watch videos, and subscribe for special experiences. Pro tip: Look for the comet to share your own memories!',
    },
    {
      title: 'Ready for Launch?',
      message: "Your  journey awaits! Click 'Start Journey' to begin exploring.",
    },
  ]

  const onStep = () => {
    if (currentStep === steps.length - 1) {
      setIsOpenOnboarding(false)
      return
    }
    setCurrentStep(currentStep + 1)
  }
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
