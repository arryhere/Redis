# 🧠 Redis

<div style="background:#222222; border:1px solid #2a2a2a; border-radius:10px; padding:16px; margin:12px 0;">

## 🔍 About

- In-memory data store

</div>

<div style="background:#222222; border:1px solid #2a2a2a; border-radius:10px; padding:16px; margin:12px 0;">

## ⚙️ Configuration

- Redis server port: **6379**
- Redis Insights port: **8001**
- Redis username: **root** (default: `"default"`)
- Redis password: **password** (default: `""`)

</div>

<div style="background:#222222; border:1px solid #2a2a2a; border-radius:10px; padding:16px; margin:12px 0;">

## 🧩 Set-Up

- `docker compose -f ./compose.db.yaml up --build -d`
- `docker container exec -it redis_stack sh`

  - `redis-cli -u redis://root:password@localhost:6379/0`

<br>

- `npm i`
- `npm run redis`
- `npm run server`

</div>
