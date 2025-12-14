To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

## API Documentation

- Local: `http://localhost:3000`
- Production: `https://....`

| Endpoint             | HTTP     | Description            | Available |
| -------------------- | -------- | ---------------------- | --------- |
| `/characters`        | `GET`    | Get all characters     | ✅        |
| `/characters/{slug}` | `GET`    | Get character by slug  | ✅        |
| `/characters`        | `POST`   | Add new character      |           |
| `/characters`        | `DELETE` | Delete all characters  |           |
| `/characters/{id}`   | `DELETE` | Delete character by id |           |
| `/characters/{id}`   | `PATCH`  | Patch character by id  |           |
| `/characters/{id}`   | `PUT`    | Update character by id |           |
