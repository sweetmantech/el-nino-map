import Modal from '../Modal'

const MemoriesModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <div className="max-w-[584px] min-w-[400px] p-3 bg-white rounded-md flex gap-2" id="memories">
        Share Memories
      </div>
    </Modal>
  )
}

export default MemoriesModal
