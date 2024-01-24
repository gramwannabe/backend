import dotenv from 'dotenv'

dotenv.config()

export const dbhost = process.env.DB_HOST
export const dbDatabase = process.env.DB_DATABASE
export const dbPort = process.env.DB_PORT
export const dbUser = process.env.DB_USER
export const dbPass = process.env.DB_PASS
export const dbPoolMin = process.env.DB_POOL_MIN
export const dbPoolMax = process.env.DB_POOL_MAX
export const dbIdleTimeout = process.env.DB_IDLE_TIMEOUT
export const dbConnectionTimeout = process.env.DB_CONNECTION_TIMEOUT
export const dbMaxUses = process.env.DB_MAX_USES