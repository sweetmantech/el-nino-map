import { Address } from 'viem'
import getStackClient from './getStackClient'
import { FIRST_SMART_WALLET_LOGIN_EVENT } from '../consts'

const trackLoginPoints = async (address) => {
  const stackClient = getStackClient()

  await stackClient.track(FIRST_SMART_WALLET_LOGIN_EVENT, {
    points: 10,
    account: address as Address,
    uniqueId: `${Date.now()}`,
  })
}

export default trackLoginPoints
