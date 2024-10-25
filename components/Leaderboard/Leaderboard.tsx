import { POINT_SYSTEM_ID } from '@/lib/consts'

const Leaderboard = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="absolute left-0 top-0 w-full h-full z-[15]
      flex items-center justify-center"
      onClick={(e: any) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="max-w-[500px] p-3 bg-white rounded-md" id="leaderboard">
        <iframe
          src={`https://www.stack.so/leaderboard/leaderboard-40a3-78225-${POINT_SYSTEM_ID}/embed?excludeHeader=true`}
          className="mx-auto"
          width="460px"
          height="400px"
          allow="clipboard-write"
          title="leaderboard"
        />
      </div>
    </div>
  )
}

export default Leaderboard
