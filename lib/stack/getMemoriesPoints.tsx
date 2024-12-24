import getStackClient from './getStackClient'
import { SHARE_MEMORY_EVENT } from '../consts'

const getMemoriesPoints = async () => {
  const stackClient = getStackClient()

  const metrics = await stackClient.getEventMetrics({
    query: stackClient
      .eventsQuery()
      .where({
        eventType: SHARE_MEMORY_EVENT,
      })
      .offset(0)
      .build(),
  })

  const chunkSize = 100
  const chunkCount = parseInt(Number(metrics.totalEvents / chunkSize).toFixed(0), 10) + 1
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let events: any = []

  for (let i = 0; i < chunkCount; i++) {
    const data = await stackClient.getEvents({
      query: stackClient
        .eventsQuery()
        .where({
          eventType: SHARE_MEMORY_EVENT,
        })
        .offset(chunkSize * i)
        .build(),
    })
    events = events.concat(data)
  }

  return events
}

export default getMemoriesPoints
