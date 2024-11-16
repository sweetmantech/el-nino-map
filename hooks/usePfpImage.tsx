import getIpfsLink from "@/lib/getIpfsLink"
import { useQuery } from "@airstack/airstack-react"
import { useEffect, useState } from "react"

const pfpQuery = `query MyQuery($userAddress: Address) {
    Socials(input: {filter: {userAssociatedAddresses: {_eq: $userAddress}}, blockchain: ethereum}) {
      Social {
        dappName
        profileName
        profileImage
        userAddress
      }
    }
  }`

const usePfpImage = (address) => {
  const [pfpImage, setPfpImage] = useState("")
  const { data } = useQuery(pfpQuery, { userAddress: address }, { cache: true })

  useEffect(() => {
    const init = () => {
      const pfpLinks = data.Socials.Social.filter((item) => item?.profileImage)
      if (!pfpLinks?.length) return
      setPfpImage(getIpfsLink(pfpLinks[0]?.profileImage))
    }
    if (!data?.Socials?.Social) return
    init()
  }, [data])

  return {
    pfpImage,
  }
}

export default usePfpImage
