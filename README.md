
# Harry Potter API

API bertema **Harry Potter** dengan fitur **CRUD** dan **Search** untuk tiga entitas utama:
- **Characters** (karakter)
- **Spells** (mantra)
- **Houses** (asrama)

Didesain sederhana, cepat dijalankan secara lokal dengan **Bun + TypeScript**.

<p align="center">
  https://bun.shhttps://img.shields.io/badge/Built%20with-Bun-000000?logo=bun&logoColor=fff</a>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-%23007oColor=white
  https://img.shields.io/badge/API-CRUD%20%2B%20Search-success
</p>

---

## ✨ Fitur

- **CRUD lengkap** untuk `characters`, `spells`, `houses`
- **Search & filter** dengan query `q` dan parameter spesifik per entitas
- **Pagination & sorting**: `page`, `limit`, `sortBy`, `order`
- Respons konsisten: `data`, `meta`, `error`
- Struktur folder modular (controller/router/service) *(sesuaikan dengan implementasi di `src/`)*

> Cara menjalankan lokal mengikuti instruksi di halaman repo: `bun install` → `bun run dev` → buka `http://localhost:3000`. [1](https://github.com/Theofilush/harry-potter-api)

---

## 📦 Prasyarat

- Bun terpasang di mesin Anda
- Node API-compatible (Bun menjalankan skrip dan dependency)  
- **TypeScript** untuk tipe yang lebih aman

---

## 🚀 Menjalankan Secara Lokal

```bash
# 1) Instal dependency
bun install

# 2) Jalankan development server
bun run dev

# 3) Akses API
# (default) http://localhost:3000
