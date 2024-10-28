const Metadata = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="absolute left-0 top-0 w-full h-full z-[15]
      flex items-center justify-center"
      onClick={(e: any) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="max-w-[300px] p-3 bg-white rounded-md" id="metadata">
        <fieldset className="font-[600] text-lg">
          <p>Artist: xcelencia</p>
          <p>Album: el niño estrella</p>
          <p>Designer: muchozorro</p>
          <p>Dev: sweetman, ziad</p>
          <p>Producers: emme, shine, x</p>
        </fieldset>
      </div>
    </div>
  )
}

export default Metadata
