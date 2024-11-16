import usePfpImage from "@/hooks/usePfpImage"

const Pfp = ({ collector }) => {
  const { pfpImage } = usePfpImage(collector)

  return (
    <img
      src={pfpImage}
      className="w-10 h-10"
    />
  )
}
export default Pfp
