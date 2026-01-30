import dotenv from 'dotenv';
import { ProcessEnv } from './types/index.js';

dotenv.config({
  path: './.env',
  quiet: true,
  debug: process.env.DEBUG === 'true',
});

const requiredVars: Array<keyof ProcessEnv> = [
  'NODE_ENV',
  'PORT',
  'DATABASE_ONLINE',
  'DATABASE_PASSWORD_ONLINE',
];

function validateEnv(env: ProcessEnv) {
  const missing = requiredVars.filter(
    (key) => !env[key] || env[key].trim() === '',
  );
  if (missing.length > 0) {
    console.error(`Missing environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }
}

const env = process.env as unknown as ProcessEnv;
validateEnv(env);

const defaults: Partial<ProcessEnv> = {
  NODE_ENV: 'development',
  PORT: '8080',
};

const config: ProcessEnv & { ISPRODUCTION: boolean; DB: string } = {
  ...defaults,
  ...env,
  ISPRODUCTION: env.NODE_ENV === 'production',
  DB:
    env.NODE_ENV === 'production'
      ? env.DATABASE_ONLINE.replace(
          '<db_password>',
          env.DATABASE_PASSWORD_ONLINE,
        )
      : 'mongodb://127.0.0.1/geo',
};

export { config };
