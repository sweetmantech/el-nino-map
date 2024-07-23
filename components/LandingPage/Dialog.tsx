import Image from 'next/image'

const Dialog = () => (
  <div
    className="absolute left-[10px] bottom-[20px] z-[10]
        flex items-end"
  >
    <div className="w-[120px] md:w-[200px] aspect-[320/324] relative z-[10]">
      <Image
        src="/images/mbo-character.webp"
        layout="fill"
        className="absolute object-fit"
        alt=""
      />
    </div>
    <div
      className="ml-[-10px] relative bg-white z-[9]
          w-[200px] h-[70px] md:w-[270px] md:h-[100px] 
          p-2 md:p-3 border-[4px] border-[black]
          text-[14px] md:text-[18px] font-[700]"
    >
      {`We're cooking something`}
    </div>
  </div>
)

export default Dialog
