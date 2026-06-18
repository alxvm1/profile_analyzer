import type { TPlayerResponse } from '@entities/Player'
import type { FC, SVGProps } from 'react'
import SteamIcon from '../../assets/svg/steamIcon.svg?react'
import FaceitIcon from '../../assets/svg/faceitIcon.svg?react'
import LeetifyIcon from '../../assets/svg/leetifyIcon.svg?react'

type TProfileLink = {
  icon: FC<SVGProps<SVGSVGElement>>
  href: string | undefined
  disabled: boolean
}

export const PLAYER_LINKS_CONFIG = (player: TPlayerResponse): TProfileLink[] => [
  {
    icon: SteamIcon,
    href: player.steam?.profileurl,
    disabled: !player.steam?.profileurl,
  },
  {
    icon: FaceitIcon,
    href: player.faceit
      ? `https://www.faceit.com/players/${player.faceit.nickname}`
      : undefined,
    disabled: !player.faceit,
  },
  {
    icon: LeetifyIcon,
    href: !player.trust.flags.includes('NO_LEETIFY_PROFILE')
      ? `https://leetify.com/app/profile/${player.steam?.steamid}`
      : undefined,
    disabled: player.trust.flags.includes('NO_LEETIFY_PROFILE'),
  },
]
