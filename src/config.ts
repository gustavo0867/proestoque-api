function getEnvVar(name: string): string {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Variável de ambiente ${name} não definida`)
  }

  return value
}

export const config = {
  port: Number(process.env.PORT) || 3333,
  databaseUrl: getEnvVar('DATABASE_URL'),
  jwtSecret: getEnvVar('JWT_SECRET'),
  jwtExpiresIn: getEnvVar('JWT_EXPIRES_IN')
}
