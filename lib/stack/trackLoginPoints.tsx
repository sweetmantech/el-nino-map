import { Address } from 'viem'
import getStackClient from './getStackClient'

const trackLoginPoints = async (address) => {
  const stackClient = getStackClient()

  await stackClient.track('xcelencia_login', {
    points: 10,
    account: address as Address,
    uniqueId: `${Date.now()}`,
  })
}

export default trackLoginPoints
