import {
  CLAIM_INITIALIZED_EVENT_SIGNATURE,
  ERC1155_LAZY_PAYABLE_CLAIM,
  xcelencia_eth,
} from '@/lib/consts'
import { DuneDecodedEvent } from '@/types/dune'

const getManifoldCreated = async (): Promise<DuneDecodedEvent[]> => {
  const options = {
    method: 'GET',
    headers: { 'X-Dune-Api-Key': process.env.DUNE_API_KEY as string },
  }
  const params: any = {
    decode: 'true',
    topic0: CLAIM_INITIALIZED_EVENT_SIGNATURE,
    to: ERC1155_LAZY_PAYABLE_CLAIM,
  }

  const urlSearchParams = new URLSearchParams(params)

  const response = await fetch(
    `https://api.dune.com/api/echo/v1/transactions/evm/${xcelencia_eth}?${urlSearchParams}`,
    options,
  )
  if (!response.ok) throw Error('failed to call Dune API.')

  const data = await response.json()
  const transactions: DuneDecodedEvent[] = data.transactions
  return transactions
}

export default getManifoldCreated
