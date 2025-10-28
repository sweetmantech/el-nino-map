import { Address } from 'viem'
import getStackClient from './getStackClient'
import { SHARE_MEMORY_EVENT, SHARE_MEMORY_POINT } from '../consts'

const trackMemories = async (address: Address, url: string, message: string) => {
  const stackClient = getStackClient()

  await stackClient.track(SHARE_MEMORY_EVENT, {
    points: SHARE_MEMORY_POINT,
    account: address as Address,
    uniqueId: `${Date.now()}`,
    metadata: {
      url,
      message,
    },
  })
}

export default trackMemories
