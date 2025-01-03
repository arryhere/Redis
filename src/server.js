import express from 'express';

async function main() {
  try {
    const app = express();

    // @ts-ignore
    app.get('/', async (req, res, next) => {
      try {
        return res.status(200).json({ success: true, data: 'data' });
      } catch (error) {
        return res.status(500).json({ success: false, error: error });
      }
    });

    app.listen(3005, () => {
      console.log(`[Server]: 🚀 http://localhost:${3005} 🚀`);
    });
  } catch (error) {
    console.log('[Error (server)]', error);
  }
}

main();
