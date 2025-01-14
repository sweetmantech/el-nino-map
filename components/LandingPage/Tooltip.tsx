const Tooltip = ({ x, y, text }: { x: number; y: number; text: string }) => {
  return (
    <div
      className="bubble-name"
      style={{
        left: x,
        top: y,
        fontFamily: 'Necosmic-Display',
      }}
    >
      <div className="x-label">
        <div className="x-label-text">X</div>
        <div className="x-label-skew" />
      </div>
      <div className="bottom">
        <div className="relative">
          <div className="bottom-skew" />
        </div>
      </div>
      <p className="translate-x-[-12px] pt-2 pb-1 min-w-[70px] text-sm">{text}</p>
      <div
        className="absolute right-[-18px] top-[-1px] h-[calc(100%+1px)] flex flex-col justify-evenly pl-1 min-w-[18px] bg-plum border-r-white border-b-white border-t-white border-r-[1px] border-t-[1px] border-b-[1px]
        rounded-tr-[4px] rounded-br-[4px]"
      >
        <div>
          <div className="bg-black size-1" />
          <div className="bg-black size-1 translate-x-1" />
        </div>
        <div>
          <div className="bg-black size-1 translate-x-1" />
          <div className="bg-black size-1" />
        </div>
      </div>
    </div>
  )
}

export default Tooltip
