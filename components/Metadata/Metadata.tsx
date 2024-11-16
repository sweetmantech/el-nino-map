import Modal from '../Modal'

const Metadata = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <div className="max-w-[300px] p-3 bg-white rounded-md" id="metadata">
        <fieldset className="font-[600] text-lg">
          <p>Artist: xcelencia</p>
          <p>Album: el niño estrella</p>
          <p>Designer: muchozorro</p>
          <p>Devs: sweetman, ziad</p>
          <p>Producers: emme, shine, x</p>
        </fieldset>
      </div>
    </Modal>
  )
}

export default Metadata
