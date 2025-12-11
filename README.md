
# Harry Potter API

API bertema **Harry Potter** dengan fitur **CRUD** dan **Search** untuk tiga entitas utama:
- **Characters** (karakter)
- **Spells** (mantra)
- **Houses** (asrama)

Didesain ringan dan cepat dijalankan secara lokal menggunakan **Bun + TypeScript**.

<p align="center">
  <a href="https://bun.sh/">https://img.shields.io/badge/Built%20with-Bun-000000?logo=bun&logoColor=fff</a>
  https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white
  https://img.shields.io/badge/API-CRUD%20%2B%20Search-success
</p>

---

## Daftar Isi

- Fitur
- Prasyarat
- Menjalankan Secara Lokal
- Konfigurasi Lingkungan
- Model Data
- Endpoints
  - Characters
  - Spells
  - Houses
- Query Parameters Umum
- Contoh Request
- Respons Standar & Error
- Struktur Proyek
- Scripts
- Testing
- Dokumentasi Otomatis (OpenAPI/Swagger)
- Deployment
- Kontribusi
- Lisensi

---

## Fitur

- **CRUD lengkap** untuk `characters`, `spells`, `houses`.
- **Search & filter**: teks bebas (`q`) + parameter spesifik per entitas.
- **Pagination & sorting**: `page`, `limit`, `sortBy`, `order`.
- Respons konsisten: `data`, `meta`, `error`.
- Kode modular & mudah di‑extend (controller/router/service).

---

## Prasyarat

- **Bun** terpasang di mesin Anda (lihat panduan instalasi resmi).  
