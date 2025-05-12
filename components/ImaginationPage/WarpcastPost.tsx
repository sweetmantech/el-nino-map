import useLinkPreview from '@/hooks/useLinkPreview'
import { LoaderCircle } from 'lucide-react'

interface WarpcastPostProps {
  url: string
}
const WarpcastPost = ({ url }: WarpcastPostProps) => {
  const { isLoading, data } = useLinkPreview(url)

  return (
    <div className="w-[328px] flex items-center justify-center">
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        // eslint-disable-next-line
        <img
          alt="warpcast"
          src={data.image.original.url}
        />
      )}
    </div>
  )
}

export default WarpcastPost
