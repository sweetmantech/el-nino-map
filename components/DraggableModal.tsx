import Draggable from 'react-draggable'

const DraggableModal = ({ children, handleClose }) => {
  return (
    <div className="fixed z-[9999] left-0 top-0 w-screen h-screen">
      <div className="relative w-full h-full flex justify-center items-center">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className="w-full h-full absolute left-0 top-0 z-[1]"
          onClick={handleClose}
          onTouchStart={handleClose}
        />
        <Draggable scale={1} bounds="parent" allowAnyClick={false} handle=".handle">
          <div className="relative z-[1000] bg-white">
            <div className="flex flex-col h-full w-full bg-white">
              <div className="flex justify-between items-center gap-x-[20px] bg-black border-b-grey border-b text-grey">
                <div className="flex-grow handle pl-3 py-2 cursor-pointer font-italipixel">
                  Music Player
                </div>
                <button type="button" onClick={handleClose} className="mr-3 font-bold">
                  X
                </button>
              </div>
              <div className="h-[calc(100%-35px)]">{children}</div>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  )
}

export default DraggableModal
