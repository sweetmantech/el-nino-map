import Draggable from 'react-draggable'

const DraggableModal = ({ children, handleClose }) => {
  return (
    <div className="fixed z-[9999] left-0 top-0 w-screen h-screen">
      <div className="relative w-full h-full flex justify-center items-center">
        <div
          className="w-full h-full absolute left-0 top-0 z-[1]"
          onClick={handleClose}
          onTouchStart={handleClose}
        />
        <Draggable scale={1} bounds="parent" allowAnyClick={false} handle=".handle">
          <div className="relative z-[1000]">
            <div className="flex flex-col h-full w-full">
              <div className="h-[calc(100%-35px)] bg-transparent p-0 m-0 handle">{children}</div>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  )
}

export default DraggableModal
