import { Address } from 'viem'
import getStackClient from './getStackClient'

const getLoginEvents = async (address: Address) => {
  const stackClient = getStackClient()
  const events = await stackClient.getEvents({
    address,
    event: 'first_smart_wallet_login',
  })

  return events
}

export default getLoginEvents
