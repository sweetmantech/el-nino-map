const Imagination = ({ event }) => {
  return (
    <div className="border-[2px] rounded-md p-2 border-black">
      <p>POST URL: {event.metadata.url}</p>
      {event.metadata.message && <p>Message: {event.metadata.message}</p>}
    </div>
  )
}

export default Imagination
