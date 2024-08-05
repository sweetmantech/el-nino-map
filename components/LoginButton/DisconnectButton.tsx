'use client'

import { useDisconnect } from 'wagmi'

const DisconnectButton = () => {
  const { disconnect } = useDisconnect()

  return (
    <button onClick={() => disconnect()} type="button">
      Disconnect from Mesa
    </button>
  )
}

export default DisconnectButton
