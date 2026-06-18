export const formatAccountAge = (timecreated: number): string => {
  const totalMonths = Math.ceil((Date.now() / 1000 - timecreated) / (86400 * 30.44))
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  return years > 0 ? `${years}y ${months}m` : `${months}m`
}
