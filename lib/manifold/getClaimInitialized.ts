import {
  CHAIN_ID,
  CLAIM_INITIALIZED_EVENT_SIGNATURE,
  DROP_ADDRESS,
  ERC1155_LAZY_PAYABLE_CLAIM,
} from '@/lib/consts'
import { DuneDecodedEvent } from '@/types/dune'

const getClaimInitialized = async (): Promise<DuneDecodedEvent[]> => {
  const options = {
    method: 'GET',
    headers: { 'X-Dune-Api-Key': process.env.DUNE_API_KEY as string },
  }
  const params: any = {
    decode: 'true',
    topic0: CLAIM_INITIALIZED_EVENT_SIGNATURE,
    chain_ids: `${CHAIN_ID}`,
    log_address: DROP_ADDRESS,
  }

  const urlSearchParams = new URLSearchParams(params)

  const response = await fetch(
    `https://api.dune.com/api/echo/v1/transactions/evm/${ERC1155_LAZY_PAYABLE_CLAIM}?${urlSearchParams}`,
    options,
  )
  if (!response.ok) throw Error('failed to call Dune API.')

  const data = await response.json()
  const transactions: DuneDecodedEvent[] = data.transactions
  return transactions
}

export default getClaimInitialized
