import { POINT_SYSTEM_ID } from '@/lib/consts'
import Modal from '../Modal'

const Leaderboard = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
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
    </Modal>
  )
}

export default Leaderboard
