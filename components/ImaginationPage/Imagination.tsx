import { InstagramEmbed } from 'react-social-media-embed'

const Imagination = ({ event }) => {
  const isIntagramPost = event.metadata.url.includes('instagram.com')

  return (
    <div className="border-[2px] rounded-md p-2 border-black w-[350px] h-fit">
      <p className="truncate max-w-full">POST URL: {event.metadata.url}</p>
      {event.metadata.message && <p>Message: {event.metadata.message}</p>}
      {isIntagramPost && (
        <div className="pt-3">
          <InstagramEmbed url={event.metadata.url} width={328} />
        </div>
      )}
    </div>
  )
}

export default Imagination
