import getClaimInitialized from '@/lib/manifold/getClaimInitialized'
import { DuneDecodedEvent } from '@/types/dune'

export async function GET() {
  try {
    const transactions: DuneDecodedEvent[] = await getClaimInitialized()
    const formattedEvents = transactions.map((transaction: DuneDecodedEvent) => {
      const claimEvent = transaction.logs.find((log) => log?.decoded?.name === 'ClaimInitialized')
      if (!claimEvent) return
      const data: any = {
        chainId: transaction.chain_id,
        chain: transaction.chain,
      }
      claimEvent?.decoded?.inputs.forEach((input) => {
        data[`${input.name}`] = input.value
      })
      data.released_at = new Date(transaction.block_time).getTime()
      return data
    })

    return Response.json(formattedEvents[0]?.claimIndex || formattedEvents[0]?.instanceId)
  } catch (e: any) {
    console.log(e)
    const message = e?.message ?? 'failed to get Dune transactions'
    return Response.json({ message }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'
export const revalidate = 0
