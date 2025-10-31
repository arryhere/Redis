import { redisClient } from './db/redis.js';

async function redis() {
  try {
    /* flush db */
    await redisClient.flushdb();

    /* ping db */

    const set_user_1 = await redisClient.set('user:1', 'Roshan');
    console.log({ set_user_1 });

    const set_user_5 = await redisClient.set('user:5', 'Valarie');
    console.log({ set_user_5 });

    const get_user_5 = await redisClient.get('user:5');
    console.log({ get_user_5 });

    const expire_user_5 = await redisClient.expire('user:5', 10);
    console.log({ expire_user_5 });

    const get_user_500 = await redisClient.get('user:500');
    console.log({ get_user_500 });

    await redisClient.lpush('nums', 1);
    await redisClient.lpush('nums', 2);
    await redisClient.lpush('nums', 3);
    await redisClient.rpush('nums', 4);
    await redisClient.rpush('nums', 5);

    const nums_list = await redisClient.lrange('nums', 0, -1);
    console.log({ nums_list });

    const rpop = await redisClient.rpop('nums');
    console.log({ rpop });

    await redisClient.sadd('set', 1);
    await redisClient.sadd('set', 2);
    await redisClient.sadd('set', 2);
    await redisClient.sadd('set', 3);
    await redisClient.sadd('set', 3);

    const set_list = await redisClient.smembers('set');
    console.log({ set_list });

    return;
  } catch (error) {
    console.log(`[Error (redis)]: ${error}`);
  } finally {
    redisClient.disconnect();
    console.log('[Redis]: disconnected');
  }
}

redis();
