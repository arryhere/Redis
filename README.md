# Redis

---

## About

- In memory data-store

---

## Configuration

- redis server port: **6379**
- redis insights port: **8001**
- redis username: **root** (default value: "default")
- redis password: **password** (default value: "")

---

## Set-Up

- `docker compose -f ./compose.db.yaml up --build -d`
- `docker container exec -it redis_stack sh`
  - `redis-cli -u redis://root:password@localhost:6379/0`
  ***
- `npm i`
- `npm run redis`
- `npm run serve`
  ***

---

## Redis Docs

- **Cheatsheet** [https://redis.io/learn/howtos/quick-start/cheat-sheet]
- **Commands** [https://redis.io/docs/latest/commands]
- **Data-Types** [https://redis.io/docs/latest/develop/data-types]

---
