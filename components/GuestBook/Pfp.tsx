import usePfpImage from '@/hooks/usePfpImage'
import Image from 'next/image'

const Pfp = ({ collector }) => {
  const { pfpImage } = usePfpImage(collector)

  return (
    <Image
      src={
        pfpImage ||
        'https://ipfs.decentralized-content.com/ipfs/bafybeif4ux2ae6hizpceoarkvbfyobrdljkqxqjry7c7n2ybzkkciqr2ci'
      }
      width={40}
      height={40}
      alt="not found pfp"
      className="border rounded-full overflow-hidden"
      blurDataURL={
        pfpImage ||
        'https://ipfs.decentralized-content.com/ipfs/bafybeif4ux2ae6hizpceoarkvbfyobrdljkqxqjry7c7n2ybzkkciqr2ci'
      }
    />
  )
}
export default Pfp
