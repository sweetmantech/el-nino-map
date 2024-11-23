import Modal from '../Modal'

const Video = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <div className="max-w-[584px] p-3 bg-white rounded-md" id="youtube">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/5LMX6VYtbyY?si=rlwfM3tORdWB0xlA"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </Modal>
  )
}

export default Video
