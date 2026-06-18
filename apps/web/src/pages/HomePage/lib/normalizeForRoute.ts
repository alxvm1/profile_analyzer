export function normalizeRoute(value: string): string {
  const s = value.trim().replace(/\/$/, '')
  const profileMatch = s.match(/profiles\/(\d{17})/)
  if (profileMatch) return profileMatch[1]
  const vanityMatch = s.match(/\/id\/([^/?]+)/)
  if (vanityMatch) return vanityMatch[1]
  return s
}
