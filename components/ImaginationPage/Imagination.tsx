import { InstagramEmbed } from 'react-social-media-embed'
import WarpcastPost from './WarpcastPost'

const Imagination = ({
  event,
}: {
  event: { uniqueId: string; metadata: { url: string; message?: string } }
}) => {
  const isIntagramPost = event.metadata.url.includes('instagram.com')
  const isWarpcastPost = event.metadata.url.includes('warpcast.com')

  return (
    <div className="border-[2px] rounded-md p-2 border-black w-[350px] h-fit">
      {isIntagramPost && <InstagramEmbed url={event.metadata.url} width={328} />}
      {isWarpcastPost && <WarpcastPost url={event.metadata.url} />}
      {event.metadata.message && <p className="pt-4">Message: {event.metadata.message}</p>}
    </div>
  )
}

export default Imagination
