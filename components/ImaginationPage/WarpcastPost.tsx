import useLinkPreview from '@/hooks/useLinkPreview'
import { LoaderCircle } from 'lucide-react'

interface WarpcastPostProps {
  url: string
}
const WarpcastPost = ({ url }: WarpcastPostProps) => {
  const { isLoading, data } = useLinkPreview(url)

  return (
    <button
      className="w-[328px] flex items-center justify-center"
      type="button"
      onClick={() => window.open(url, '_blank')}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        // eslint-disable-next-line
        <img alt="warpcast" src={data.image.original.url} />
      )}
    </button>
  )
}

export default WarpcastPost
