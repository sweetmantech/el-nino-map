import Modal from '../Modal'

const SMS = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <div className="max-w-[700px] p-3 bg-white rounded-md" id="sms">
        <iframe
          id="laylo-drop-d6tew"
          frameBorder="0"
          scrolling="no"
          allow="web-share"
          allowTransparency={true}
          className="min-w-[100%] max-w-[1000px]"
          src="https://embed.laylo.com?dropId=d6tew&color=FF7300&minimal=false&theme=light"
        />
      </div>
    </Modal>
  )
}

export default SMS
