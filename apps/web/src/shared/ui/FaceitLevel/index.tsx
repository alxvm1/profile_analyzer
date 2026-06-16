import type { FaceitLevelProps } from './types'

const LEVEL_COLOR: Record<number, string> = {
  1: '#636363',
  2: '#949494',
  3: '#1ce043',
  4: '#1ce043',
  5: '#f5a800',
  6: '#f5a800',
  7: '#ff6c00',
  8: '#ff6c00',
  9: '#fe3636',
  10: '#fe3636',
}

const TRACK_COLOR: Record<number, string> = {
  1: '#2a2a2a',
  2: '#2a2a2a',
  3: '#0d3318',
  4: '#0d3318',
  5: '#3a2800',
  6: '#3a2800',
  7: '#3a1800',
  8: '#3a1800',
  9: '#3a0808',
  10: '#3a0808',
}

export const FaceitLevel = ({
  level,
  size = 60,
  ...props
}: FaceitLevelProps) => {
  const lvl = Math.max(1, Math.min(10, Math.round(level)))
  const color = LEVEL_COLOR[lvl]
  const trackColor = TRACK_COLOR[lvl]

  const cx = size / 2
  const cy = size / 2
  const outerR = size * 0.467
  const arcR = size * 0.35
  const strokeW = size * 0.083

  const circumference = 2 * Math.PI * arcR

  const totalArc = circumference * 0.75
  const trackGap = circumference - totalArc

  const filled = (lvl / 10) * totalArc
  const gap = circumference - filled

  const fontSize =
    lvl === 10 ? Math.round(size * 0.215) : Math.round(size * 0.267)

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`Faceit level ${lvl}`}
      {...props}
    >
      {/* чёрный фон */}
      <circle cx={cx} cy={cy} r={outerR} fill="#111111" />

      {/* тёмный трек — 75% дуги */}
      <circle
        cx={cx}
        cy={cy}
        r={arcR}
        fill="none"
        stroke={trackColor}
        strokeWidth={strokeW}
        strokeDasharray={`${totalArc} ${trackGap}`}
        strokeLinecap="round"
        transform={`rotate(135 ${cx} ${cy})`}
      />

      {/* прогресс — поверх трека */}
      <circle
        cx={cx}
        cy={cy}
        r={arcR}
        fill="none"
        stroke={color}
        strokeWidth={strokeW}
        strokeDasharray={`${filled} ${gap}`}
        strokeLinecap="round"
        transform={`rotate(135 ${cx} ${cy})`}
      />

      {/* цифра в цвет дуги */}
      <text
        x={cx}
        y={cy + fontSize * 0.36}
        textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="700"
        fontSize={fontSize}
        fill={color}
      >
        {lvl}
      </text>
    </svg>
  )
}
