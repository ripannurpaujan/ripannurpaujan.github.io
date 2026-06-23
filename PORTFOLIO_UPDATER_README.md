# Portfolio Auto-Updater

Script untuk update web portfolio `ripannurpaujan.github.io` secara otomatis dari file CSV.

## Setup (sekali saja)

```bash
pip install pandas openpyxl
```

Pastikan git sudah login di komputer lo:
```bash
git config --global user.name "Ripan Nurpaujan"
git config --global user.email "fauzanivan21@gmail.com"
```

## Cara pakai (setiap mau update)

### 1. Edit file CSV
Buka `data/projects.csv` di Excel. Tambah baris baru untuk proyek baru.

| Kolom | Keterangan |
|-------|-----------|
| `id` | ID unik proyek (huruf kecil, underscore, no spasi) |
| `title` | Judul proyek |
| `short_desc` | Deskripsi singkat (1–2 kalimat) |
| `category` | Kategori: Research / Simulation / Manufacturing / Python / dll |
| `tags` | Tag dipisah koma: `Python,Power BI,MySQL` |
| `image_path` | Path relatif dari root repo: `img/Projects/Dashboard/kpi.png` |
| `status` | `Published` atau `In Progress` atau `Draft` |
| `date` | Format `YYYY-MM`: `2026-01` |
| `client` | Nama perusahaan/institusi |
| `duration` | Contoh: `3 months`, `Ongoing` |
| `full_pub_url` | Link publikasi (kosongkan kalau ga ada) |
| `overview` | Deskripsi lengkap proyek |
| `challenges` | Tantangan yang dihadapi |
| `solutions` | Solusi yang dipakai |
| `results` | Hasil & pencapaian |
| `gallery_images` | Path gambar dipisah `\|`: `img/p1.png\|img/p2.png` |

### 2. Jalanin script
Dari root repo lo:
```bash
python scripts/update_portfolio.py
```

Done! Portfolio akan update otomatis di GitHub Pages ~30 detik kemudian.

## Options

```bash
# Preview dulu tanpa nulis file
python scripts/update_portfolio.py --dry-run

# Update file HTML tapi ga push (buat review dulu)
python scripts/update_portfolio.py --no-push
```

## File yang di-generate otomatis
- `HTML/allprojects.html` — halaman daftar semua proyek
- `HTML/projectdetail.html` — halaman detail proyek (data-driven, semua ID)

**Jangan edit manual dua file ini** — akan ke-overwrite setiap kali script dijalanin.
Yang perlu diedit cuma `data/projects.csv`.
