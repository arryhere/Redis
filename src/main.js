import { redis } from './redis.js';

async function main() {
  try {
    await redis();
  } catch (error) {
    console.log(`[Error (main)]: ${error}`);
  }
}

main();
