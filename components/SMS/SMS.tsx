import Modal from '../Modal'

const SMS = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <div className="max-w-[700px] p-3 bg-white rounded-md" id="sms">
      
      </div>
    </Modal>
  )
}

export default SMS
