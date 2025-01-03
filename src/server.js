import express from 'express';
import { redis_client } from './client/redis.client.js';

async function main() {
  try {
    const app = express();
    const port = 3005;

    // @ts-ignore
    app.get('/', async (req, res, next) => {
      try {
        const cached_data = await redis_client.get('photos');
        const ttl_data = await redis_client.ttl('photos');
        if (cached_data) {
          return res.status(200).json({ success: true, source: 'redis', ttl: ttl_data, data: JSON.parse(cached_data) });
        }

        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        const data = await response.json();

        await redis_client.set('photos', JSON.stringify(data));
        await redis_client.expire('photos', 60);

        return res.status(200).json({ success: true, source: 'external', data: data });
      } catch (error) {
        return res.status(500).json({ success: false, error: error });
      }
    });

    app.listen(port, () => {
      console.log(`[Server]: 🚀 http://localhost:${port} 🚀`);
    });
  } catch (error) {
    console.log('[Error (server)]', error);
  }
}

main();
