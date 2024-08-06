import getStackClient from './getStackClient'

const getLoginEvents = async () => {
  const stackClient = getStackClient()
  const events = await stackClient.getEvents({
    event: 'xcelencia_login',
  })

  return events
}

export default getLoginEvents
