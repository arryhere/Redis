# Redis

---

## Commands

- `set <key> <value>`
- `get <key>`

- `set <entity>:<id> <value>`
- `set <entity>:<id> <value> nx` [nx stores the value if the key does not exist]

- `mset user:1 "Arijit" user:2 "Vivek" user:3 "Foo Bar" user:44 "Redis"`
- `mget user:1 user:2 user:3 user:4` [get multiple values]
