export const env = {
  STEAM_API_KEY: process.env.STEAM_API_KEY ?? '',
  FACEIT_API_KEY: process.env.FACEIT_API_KEY ?? '',
  LEETIFY_API_KEY: process.env.LEETIFY_API_KEY ?? '',
  PORT: Number(process.env.PORT) || 3001,
}