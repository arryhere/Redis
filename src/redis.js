import { redis_client } from './db/redis.client.js';

async function redis() {
  try {
    /* flush db */
    await redis_client.flushdb();

    /* ping db */

    const set_user_1 = await redis_client.set('user:1', 'Roshan');
    console.log({ set_user_1 });

    const set_user_5 = await redis_client.set('user:5', 'Valarie');
    console.log({ set_user_5 });

    const get_user_5 = await redis_client.get('user:5');
    console.log({ get_user_5 });

    const expire_user_5 = await redis_client.expire('user:5', 10);
    console.log({ expire_user_5 });

    const get_user_500 = await redis_client.get('user:500');
    console.log({ get_user_500 });

    await redis_client.lpush('nums', 1);
    await redis_client.lpush('nums', 2);
    await redis_client.lpush('nums', 3);
    await redis_client.rpush('nums', 4);
    await redis_client.rpush('nums', 5);

    const nums_list = await redis_client.lrange('nums', 0, -1);
    console.log({ nums_list });

    const rpop = await redis_client.rpop('nums');
    console.log({ rpop });

    await redis_client.sadd('set', 1);
    await redis_client.sadd('set', 2);
    await redis_client.sadd('set', 2);
    await redis_client.sadd('set', 3);
    await redis_client.sadd('set', 3);

    const set_list = await redis_client.smembers('set');
    console.log({ set_list });

    return;
  } catch (error) {
    console.log(`[Error (redis)]: ${error}`);
  } finally {
    redis_client.disconnect();
    console.log('[Redis]: disconnected');
  }
}

redis();
