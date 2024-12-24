import { Address, concat, getAddress, keccak256, toBytes, zeroAddress } from 'viem'

const generateAddress = (): Address => {
  const timestamp = Date.now()
  const salt = keccak256(toBytes(`${timestamp}`))
  const addressBytes = keccak256(
    concat([toBytes('0xff'), toBytes(zeroAddress), salt, toBytes('0x')]),
  ).slice(26)
  return getAddress(`0x${addressBytes}`)
}

export default generateAddress
