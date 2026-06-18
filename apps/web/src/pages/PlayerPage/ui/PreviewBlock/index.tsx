import type { TPlayerResponse } from '@entities/Player'
import { Avatar, FaceitLevel, PremierBadge } from '@shared/ui'
import { formatAccountAge } from '../../lib/formatAccountAge'
import { PLAYER_LINKS_CONFIG } from './config'
import './style.css'

type TPreviewBlockProps = {
  player: TPlayerResponse
}

export const PreviewBlock = ({ player }: TPreviewBlockProps) => (
  <>
    <p className="preview-block__title">{player.steam?.personaname}</p>
    <Avatar
      src={player.steam?.avatarfull}
      fallback={player.steam?.personaname ?? '?'}
      size="2xl"
    />
    <div className="preview-block__links">
      {PLAYER_LINKS_CONFIG(player).map(({ icon: Icon, href, disabled }) => (
        <a
          key={href ?? String(disabled)}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={`preview-block__link${disabled ? ' preview-block__link--disabled' : ''}`}
        >
          <Icon />
        </a>
      ))}
    </div>
    <div className="preview-block__stats">
      <div className="preview-block__stats-item glass">
        <span className="preview-block__stats-title">Account age</span>
        <span className="preview-block__stats-value">
          {player.steam?.timecreated
            ? formatAccountAge(player.steam.timecreated)
            : '—'}
        </span>
      </div>
      <div className="preview-block__stats-item glass">
        <span className="preview-block__stats-title">Playtime</span>
        <span className="preview-block__stats-value">
          {player.playtime != null
            ? player.playtime.hoursCs2.toLocaleString('en-US')
            : '—'}{' '}
          hrs
        </span>
      </div>
      <div className="preview-block__stats-item glass">
        <span className="preview-block__stats-title">Premier Rating</span>
        {player.premierRating != null ? (
          <PremierBadge rating={player.premierRating} size="sm" />
        ) : (
          <span className="t-muted t-caption">No Data</span>
        )}
      </div>
      <div className="preview-block__stats-item glass">
        <span className="preview-block__stats-title">Faceit Elo</span>
        {player.faceit?.games?.cs2 != null ? (
          <div className="flex flex-row items-center gap-2">
            <FaceitLevel
              level={player.faceit.games.cs2.skill_level}
              size={35}
            />
            <span className="preview-block__stats-value">
              {player.faceit.games.cs2.faceit_elo?.toLocaleString('en-US')}
            </span>
          </div>
        ) : (
          <span className="t-muted t-caption">No Data</span>
        )}
      </div>
    </div>
  </>
)
