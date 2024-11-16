import useCollectors from '@/hooks/useCollectors'
import Pfp from './Pfp'
import Modal from '../Modal'

const GuestBook = ({ onClose }: { onClose: () => void }) => {
  const { collectors } = useCollectors()

  return (
    <Modal onClose={onClose}>
      <div
        className="max-w-[584px] min-w-[400px] p-3 bg-white rounded-md flex gap-2"
        id="guestbook"
      >
        {collectors.map((collector) => (
          <Pfp key={collector} collector={collector} />
        ))}
      </div>
    </Modal>
  )
}

export default GuestBook
