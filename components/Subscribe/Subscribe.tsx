import Modal from '../Modal'

const Subscribe = ({ onClose }: { onClose: () => void }) => {
  const handleClick = async () => {
    window.open('https://chat.whatsapp.com/Cm5uQ5MBnx00ILGAS3OE0S', '_blank')
  }

  return (
    <Modal onClose={onClose}>
      <div
        className="max-w-[400px] px-6 py-2 bg-white rounded-md flex-col flex gap-2"
        id="subscribe"
      >
        <p className="text-xl font-bold text-center font-italipixel text-xl">👀 Tap in</p>
        <p className="font-titilliumweb">
          Únete al WhatsApp — es la vibra de Maravilla City. Música, stories, el proceso y conexión
          directa conmigo.
        </p>
        <button
          type="button"
          className="w-fit px-3 mx-auto my-1 border-[1px] border-grey rounded-md font-semibold py-1 font-titilliumweb"
          onClick={handleClick}
        >
          Subscribe
        </button>
      </div>
    </Modal>
  )
}

export default Subscribe
