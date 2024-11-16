import useCollectors from "@/hooks/useCollectors"
import Pfp from "./Pfp"

const GuestBook = ({ onClose }: { onClose: () => void }) => {
  const { collectors } = useCollectors()

  return (
    <div
      className="absolute left-0 top-0 w-full h-full z-[15]
        flex items-center justify-center"
      onClick={(e: any) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="max-w-[584px] min-w-[400px] p-3 bg-white rounded-md flex gap-2"
        id="guestbook"
      >
        {collectors.map((collector) => (
          <Pfp key={collector} collector={collector} />
        ))}
      </div>
    </div>
  )
}

export default GuestBook
