import SpinnerIcon from '../Icon/SpinnerIcon'

const Thinking = () => {
  return (
    <div className="text-left">
      <div className="text-zinc-500 w-full flex items-center gap-2">
        Hmm...
        <div className="inline-block animate-spin">
          <SpinnerIcon />
        </div>
      </div>
    </div>
  )
}

export default Thinking
