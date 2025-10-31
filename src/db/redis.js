import { createClient } from 'redis';

export const redisClient = await createClient({ url: 'redis://root:password@localhost:6379/0' })
  .on('error', (error) => console.log('[Redis Client]: error', error))
  .connect();
