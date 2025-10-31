import { redisClient } from '../db/redis.js';

async function strings() {
  try {
    // SET //
    await redisClient.set('user:1:fullName', 'Foo Bar');

    /**
     * NX: SET only if key DOES NOT EXIST
     * XX: SET only if key exist
     */
    await redisClient.set('user:1:email', 'foo@example.com', { condition: 'NX' });

    /**
     * EX:      Expire in seconds                               [EX 60]
     * PX:      Expire in milliseconds                          [PX 1500]
     * EXAT:    Expire at a specific Unix time (seconds)        [EXAT 1735670000]
     * PXAT:    Expire at a specific Unix time (milliseconds)   [PXAT 1735670000123]
     * KEEPTTL: Preserve existing TTL *it cannot have value in options*
     */
    await redisClient.set('user:1:ttl', 'yes', { expiration: { type: 'EX', value: 60 } });

    // GET //
    const fullName = await redisClient.get('user:1:fullName');
    console.log({ fullName }); // { fullName: 'Foo Bar' }

    // TYPE //
    const fullNameType = await redisClient.type('user:1:fullName');
    console.log({ fullNameType }); // { fullNameType: 'string' }

    // GETSET //
    const oldFullName = await redisClient.getSet('user:1:fullName', 'John Doe');
    console.log({ oldFullName }); // { oldFullName: 'Foo Bar' }

    // MSET //
    await redisClient.mSet([
      ['user:2:fullName', 'Alex Williams'],
      ['user:3:fullName', 'Dakota Smith'],
      ['user:4:fullName', 'Leo Shaw'],
    ]);

    // MGET //
    const allUserNames = await redisClient.mGet(['user:1:fullName', 'user:2:fullName', 'user:3:fullName', 'user:4:fullName']);
    console.log({ allUserNames }); // { allUserNames: [ 'John Doe', 'Alex Williams', 'Dakota Smith', 'Leo Shaw' ] }

    // ICR //
    await redisClient.set('user:1:count', 0); // 0
    await redisClient.incr('user:1:count'); // 1
    await redisClient.incr('user:1:count'); // 2
    await redisClient.incrBy('user:1:count', 5); // 7
    console.log({ count: await redisClient.get('user:1:count') }); // { count: '7' }

    // DECR //
    await redisClient.decr('user:1:count'); // 6
    await redisClient.decr('user:1:count'); // 5
    await redisClient.decrBy('user:1:count', 3); // 2
    console.log({ count: await redisClient.get('user:1:count') }); // { count: '2' }

    // KEYS //
    const keys = await redisClient.keys('*');
    console.log({ keys });
    //     {
    //   keys: [
    //     'user:2:fullName',
    //     'user:4:fullName',
    //     'user:1:fullName',
    //     'user:1:ttl',
    //     'user:3:fullName',
    //     'user:1:email',
    //     'user:1:count'
    //   ]
    // }

    // EXIST //
    const exist = await redisClient.exists(['user:1:fullName', 'user:3:fullName', 'user:10:fullName']);
    console.log({ exist }); // { exist: 2 }

    // EXPIRE //
    await redisClient.expire('user:1:count', 30);

    // TTL //
    const ttl = await redisClient.ttl('user:1:count');
    console.log({ ttl });

    // //
  } catch (error) {
    console.log('[strings]: error', error);
  } finally {
    await redisClient.flushDb();
    redisClient.destroy();
    console.log('[strings]: redis flushed & disconnected');
  }
}

strings();
