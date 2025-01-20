import { InstagramEmbed } from 'react-social-media-embed'

const Imagination = ({ event }) => {
  const isIntagramPost = event.metadata.url.includes('instagram.com')

  return (
    <div className="border-[2px] rounded-md p-2 border-black w-[350px] h-fit">
      {isIntagramPost && <InstagramEmbed url={event.metadata.url} width={328} />}
      {event.metadata.message && <p className="pt-4">Message: {event.metadata.message}</p>}
    </div>
  )
}

export default Imagination
