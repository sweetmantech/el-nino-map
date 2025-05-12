import useLinkPreview from '@/hooks/useLinkPreview'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'

interface WarpcastPostProps {
  url: string
}
const WarpcastPost = ({ url }: WarpcastPostProps) => {
  const { isLoading, data } = useLinkPreview(url)

  return (
    <div className="w-[328px] aspect-[128/72] relative flex justify-center items-center">
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <Image
          alt="warpcast"
          src={data.image.large.url}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      )}
    </div>
  )
}

export default WarpcastPost
