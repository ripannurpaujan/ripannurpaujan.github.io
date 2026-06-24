# Portfolio Auto-Updater

Script untuk update web portfolio `ripannurpaujan.github.io` secara otomatis dari file Excel.

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

### 1. Edit file Excel
Buka `projects.xlsx` di Excel. Data proyek dimulai dari **baris 5** (4 baris pertama adalah header).

| Kolom | Keterangan |
|-------|-----------|
| `id` | ID unik proyek (huruf kecil, underscore, no spasi) |
| `title` | Judul proyek |
| `short_desc` | Deskripsi singkat (1–2 kalimat) |
| `category` | Kategori: `Research` / `Simulation` / `Manufacturing` / `Data` / dll |
| `tags` | Tag dipisah pipe: `Python\|Power BI\|MySQL` |
| `image_path` | Path relatif dari root repo: `img/Projects/Dashboard/kpi.png` |
| `status` | `Published` / `In Progress` / `Draft` |
| `date` | Format `YYYY-MM`: `2026-01` |
| `client` | Nama perusahaan/institusi |
| `duration` | Contoh: `3 months`, `Ongoing` |
| `full_pub_url` | Link publikasi (kosongkan kalau ga ada) |
| `overview` | Deskripsi lengkap proyek |
| `challenges` | Tantangan — dipisah semicolon: `Tantangan 1;Tantangan 2` |
| `solutions` | Solusi — dipisah semicolon: `Solusi 1;Solusi 2` |
| `res_val` | Nilai hasil pencapaian — dipisah pipe: `39%\|7` |
| `res_txt` | Label hasil pencapaian — dipisah pipe: `Fe Removal\|Team Size` |
| `gallery` | Path gambar gallery — dipisah semicolon: `img/p1.png;img/p2.png` |

### 2. Jalanin script
Dari root repo lo:
```bash
python update_portfolio.py
```

Done! Portfolio akan update otomatis di GitHub Pages ~30 detik kemudian.

## Options

```bash
# Update file tapi ga push ke GitHub (buat review dulu)
python update_portfolio.py --no-push
```

## File yang diupdate otomatis

| File | Yang diubah |
|------|-------------|
| `HTML/allprojects.html` | Inject project cards ke dalam `<div id="projectsContainer">` |
| `Data/projectdata.js` | Update data array untuk halaman project detail |

### Aturan penting
- Script hanya mengubah **isi** `projectsContainer` di `allprojects.html` — navbar, filter, stats section, footer, CSS, dan JS **tidak disentuh**
- `Data/projectdata.js` menggunakan format array JS murni (`challenges`, `solutions`, `gallery` sebagai array, bukan string HTML) agar kompatibel dengan `.map()` di `projectdetails.js`
- **Jangan edit manual** kedua file di atas — akan ke-overwrite setiap kali script dijalanin
- Kalau ada yang rusak, recovery via: `git reset --hard <commit> && git push --force`