import express from 'express';
import { redis_client } from './db/redis.client.js';

async function server() {
  try {
    const app = express();
    const port = 3005;

    app.get('/', async (req, res, next) => {
      try {
        const ping = await redis_client.ping();
        console.log(`[Redis]: PING: ${ping}`);

        /* redis info */
        const info = await redis_client.info('server');
        const redis_version = info
          .split('\n')
          .filter((e) => e.includes('redis_version'))[0]
          .split(':')[1]
          .split('\r')[0];

        const cached_data = await redis_client.get('photos');

        if (cached_data) {
          return res.status(200).json({
            success: true,
            redis_version,
            source: 'redis',
            ttl: await redis_client.ttl('photos'),
            data: JSON.parse(cached_data),
          });
        }

        const ttl = 60;

        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const response_data = await response.json();

        await redis_client.set('photos', JSON.stringify(response_data));
        await redis_client.expire('photos', ttl);

        return res.status(200).json({ success: true, redis_version, source: 'external', data: response_data });
      } catch (error) {
        return res.status(500).json({ success: false, error: error });
      }
    });

    app.listen(port, () => {
      console.log(`[server]: 🚀 http://localhost:${port} 🚀`);
      console.log('[redis_insight]: 🚀 http://localhost:8001 🚀');
    });
  } catch (error) {
    console.log('[server]: error: ', error);
  }
}

server();
