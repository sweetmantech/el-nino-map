import Image from 'next/image'

const Dialog = () => (
  <div
    className="absolute left-[10px] bottom-[20px] z-[10]
        flex items-end"
  >
    <div className="w-[200px] aspect-[320/324] relative z-[10]">
      <Image
        src="/images/mbo-character.webp"
        layout="fill"
        className="absolute object-fit"
        alt=""
      />
    </div>
    <div
      className="ml-[-20px] relative bg-white z-[9]
          w-[250px] h-[100px] p-3 border-[4px] border-[black]
          text-[18px] font-[700]"
    >
      {`We're cooking something`}
    </div>
  </div>
)

export default Dialog
