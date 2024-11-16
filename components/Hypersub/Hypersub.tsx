import useSubscribe from '@/hooks/useSubscribe'

const Hypersub = ({ onClose }: { onClose: () => void }) => {
  const { subscribe } = useSubscribe()

  const handleClick = () => {
    subscribe()
    onClose()
  }

  return (
    <div
      className="absolute left-0 top-0 w-full h-full z-[15]
        flex items-center justify-center"
      onClick={(e: any) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="max-w-[584px] min-w-[400px] p-3 bg-white rounded-md flex-col flex gap-2"
        id="subscribe"
      >
        <p className="text-xl font-bold text-center">Subscription</p>
        <button
          type="button"
          className="border-[1px] border-black rounded-md font-semibold py-1"
          onClick={handleClick}
        >
          Subscribe
        </button>
      </div>
    </div>
  )
}

export default Hypersub
