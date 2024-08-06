import { Address } from 'viem'
import getStackClient from './getStackClient'

const getLoginEvents = async (address: Address) => {
  const stackClient = getStackClient()
  const events = await stackClient.getEvents({
    address,
    event: 'xcelencia_login',
  })

  return events
}

export default getLoginEvents
