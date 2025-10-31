# 🧠 Redis

<div style="background: #222222; color: #e0e0e0; border: 1px solid #2a2a2a; border-radius: 10px; padding: 16px 20px; margin: 12px 0; box-shadow: 0 2px 6px rgba(0,0,0,0.4); font-family: 'Segoe UI', Roboto, sans-serif;">

## 🔍 About

- In-memory data store

</div>

<div style="background: #222222; color: #e0e0e0; border: 1px solid #2a2a2a; border-radius: 10px; padding: 16px 20px; margin: 12px 0; box-shadow: 0 2px 6px rgba(0,0,0,0.4); font-family: 'Segoe UI', Roboto, sans-serif;">

## ⚙️ Configuration

- Redis server port: **6379**
- Redis Insights port: **8001**
- Redis username: **root** (default: `"default"`)
- Redis password: **password** (default: `""`)

</div>

<div style="background: #222222; color: #e0e0e0; border: 1px solid #2a2a2a; border-radius: 10px; padding: 16px 20px; margin: 12px 0; box-shadow: 0 2px 6px rgba(0,0,0,0.4); font-family: 'Segoe UI', Roboto, sans-serif;">

## 🧩 Set-Up

- `docker compose -f ./compose.db.yaml up --build -d`
- `docker container exec -it redis_stack sh`

  - `redis-cli -u redis://root:password@localhost:6379/0`

- `npm i`
- `npm run redis`
- `npm run server`

</div>
