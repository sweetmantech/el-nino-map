import getSetupContractEvents from '@/lib/zora/getSetupContractEvents'
import { DuneDecodedEvent } from '@/types/dune'

export async function GET() {
  try {
    const transactions: DuneDecodedEvent[] = await getSetupContractEvents()
    const formattedEvents = transactions.map((transaction: DuneDecodedEvent) => {
      const setUpEvent = transaction.logs.find((log) => log?.decoded?.name === 'SetupNewContract')
      if (!setUpEvent) return
      const data: any = {
        chainId: transaction.chain_id,
        chain: transaction.chain,
      }
      setUpEvent?.decoded?.inputs.forEach((input) => {
        data[`${input.name}`] = input.value
      })
      data.released_at = new Date(transaction.block_time).getTime()
      return data
    })
    return Response.json(formattedEvents)
  } catch (e: any) {
    console.log(e)
    const message = e?.message ?? 'failed to get Dune transactions'
    return Response.json({ message }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0
