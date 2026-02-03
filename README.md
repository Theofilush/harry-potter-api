
## Harry Potter API (Hono + Prisma)

A modern, high‑performance REST API inspired by the Wizarding World's rich character universe. Built to be clean, simple, and developer‑friendly, this project helps you explore backend architecture, API design, and magical data handling. Perfect for learning, portfolio building, or just experimenting with enchanted code.

---

## 🔗 API URLs
### Development
```
http://localhost:3000
```
### Production
```
https://hp-api-theofilus.up.railway.app
```

---

## 🗄️ Database
This project uses **PostgreSQL** as the primary database.
- Fully supported by Prisma
- Works locally via Docker Compose
- Works in production via Railway (PostgreSQL deployment recommended)

### Example `DATABASE_URL` format
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
```
Example for Railway:
```
postgresql://postgres:password@containers-us-west-XX.railway.app:12345/railway
```

---

## ✨ Features
- ⚡ Ultra‑fast backend powered by **Hono**
- 🧙 Type‑safe validation using **Zod**
- 🗄️ **Prisma ORM with PostgreSQL**
- 🔮 Auto‑generated OpenAPI metadata
- 🪄 Full CRUD operations for Characters and Wands
- 📦 Modular & extensible module pattern
- 🐳 **Docker Compose** for local & production runs
- 🌱 **Prisma seed** script to preload sample data

---

## 🚀 Quick Start
### Installation
```bash
git clone https://github.com/Theofilush/harry-potter-api.git
cd harry-potter-api
bun install
```

### Environment Setup
Copy the example env:
```bash
cp .env.example .env
```
Edit `.env` and set up your PostgreSQL connection:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

### Run (Bun)
```bash
bun dev
```
Your development server will run at:
```
http://localhost:3000
```

---

## 🏰 Base URL
All Character API routes are served under:
```
/character
```
Full example:
```
http://localhost:3000/character
https://hp-api-theofilus.up.railway.app/character
```

---

## 📚 API Endpoints
| Method | Path | Description |
| - | - | - |
| GET | `/character/` | Retrieve all characters |
| GET | `/character/{slug}` | Retrieve one character by slug |
| POST | `/character/` | Create new character |
| PUT | `/character/{id}` | Full update of a character |
| PATCH | `/character/{id}` | Partial update (upsert wand behavior) |
| DELETE | `/character/{id}` | Delete a character |

### Rules
- `id` must be **26 characters**
- `slug` must be **unique** and **non‑empty**

---

## 🧩 Project Structure (Actual Repository)
```
.
├─ .dockerignore
├─ .env.example
├─ .gitignore
├─ README.md
├─ bun.lock
├─ docker-compose.yaml
├─ docker-compose.prod.yaml
├─ package.json
├─ prisma.config.ts
├─ tsconfig.json
├─ prisma/
│  ├─ schema.prisma
│  ├─ seed.ts
│  └─ migrations/
└─ src/
```

### Typical layout inside `src/`
```
src/
├─ app.ts
├─ server.ts
├─ lib/
│  └─ prisma.ts
├─ modules/
│  └─ characters/
│      ├─ route.ts
│      ├─ schema.ts
│      ├─ service.ts
│      ├─ controller.ts
│      └─ data.ts
```

---

## 🧪 Database & Seeding
### Prisma
```bash
bun db:gen
bun db:migrate
```

### Seed Data
```bash
bun db:seed
```

---

## 🐳 Docker Compose
### Local
```bash
docker compose up -d
```
### Production
```bash
docker compose -f docker-compose.prod.yaml up -d
```

---

## 📘 OpenAPI Documentation
If you add a docs route (e.g. `/` or `/swagger-ui`), you'll unlock:
- Interactive API documentation
- Schema previews
- Validation hints

---

## 🗃️ Database Models Overview
### Character
- Identity fields (name, slug)
- Biological traits
- Hogwarts info
- Actor metadata
- Wand relations

### Wand
- Wood • Core • Length
- Linked to a character

---

## 🧠 Behavior Notes
- GET includes wand info
- POST creates character + wands
- PUT replaces character + rewrites wands
- PATCH upserts wands by slug
- DELETE gracefully handles missing IDs

---

## 🌟 Why This Project Is Cool
- Clean architecture
- Modern tech stack
- Great portfolio backend API

---

## 💡 Ideas for Future Enhancements
- Add spells, houses, books, movies
- Filtering & pagination
- Authentication (JWT, API Key)
- Caching, rate limiting
- Deployment presets

---

## 🪄 Developer Tips
- Use `bun db:studio`
- Keep slugs URL‑friendly
- Start from `.env.example` for consistency

---

## 🛠️ Tech Stack
- PostgreSQL
- Bun
- Hono
- Zod
- Prisma
- TypeScript
- Docker Compose

---

## 📄 License
For educational and demonstration purposes.

