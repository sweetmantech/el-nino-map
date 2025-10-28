import getManifoldCreated from '@/lib/manifold/getManifoldCreated'
import { DuneDecodedEvent } from '@/types/dune'

export async function GET() {
  try {
    const transactions: DuneDecodedEvent[] = await getManifoldCreated()
    const formattedEvents = transactions
      .map((transaction: DuneDecodedEvent) => {
        const transferEvent = transaction.logs.find(
          (log) => log?.decoded?.name === 'TransferSingle',
        )
        const claimEvent = transaction.logs.find((log) => log?.decoded?.name === 'ClaimInitialized')
        const tokenContract = claimEvent?.decoded?.inputs.find(
          (input) => input.name === 'creatorContract',
        )?.value
        const tokenId = transferEvent?.decoded?.inputs.find((input) => input.name === '_id')?.value
        const released_at = new Date(transaction.block_time).getTime()
        if (!tokenId || !tokenContract) return null
        return {
          tokenContract,
          tokenId,
          released_at,
          chain: transaction.chain,
          chainId: transaction.chain_id,
        }
      })
      .filter((e) => Boolean(e))
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
