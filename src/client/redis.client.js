import { Redis } from 'ioredis';

export const redis_client = new Redis('redis://root:password@localhost:6379/0');
