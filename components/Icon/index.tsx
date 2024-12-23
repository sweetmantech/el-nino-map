import { Icons } from './resolver'

export type IconsType = keyof typeof Icons

interface IIcon {
  name: IconsType
}

const Icon = ({ name }: IIcon) => {
  const IconSVG = Icons[name]

  return <IconSVG />
}

export default Icon
