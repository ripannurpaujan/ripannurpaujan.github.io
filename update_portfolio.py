#!/usr/bin/env python3
"""
update_portfolio.py
────────────────────────────────────────────────────────────────
Cara pakai:
  python update_portfolio.py   → update HTML & JS, skip git

Yang diubah:
  HTML/allprojects.html  → hanya isi <div id="projectsContainer">
  Data/projectdata.js    → format sesuai projectdetails.js yang ada

Yang TIDAK disentuh:
  Navbar, header, filter, stats, footer, semua CSS/JS asli
  Git commit & push — lakukan manual setelah cek hasil
────────────────────────────────────────────────────────────────
"""

import re, sys, json
from pathlib import Path
from datetime import datetime

try:
    import openpyxl
except ImportError:
    sys.exit("❌  Jalankan dulu: pip install openpyxl")

# ── Paths ──────────────────────────────────────────────────────
REPO_ROOT  = Path(__file__).parent.resolve()
EXCEL_FILE = REPO_ROOT / "projects.xlsx"
HTML_FILE  = REPO_ROOT / "HTML" / "allprojects.html"
JS_FILE    = REPO_ROOT / "Data" / "projectdata.js"

# Kolom Excel (urut dari kolom A, data mulai baris 4)
KEYS = [
    "id", "title", "description", "categories",
    "image_path", "card_icon", "card_label", "tags",
    "date", "client", "duration", "category",
    "skills", "overview", "challenges", "solutions",
    "res_val", "res_txt", "gallery", "pub_url",
]

MONTH_MAP = {
    "January":1,"February":2,"March":3,"April":4,"May":5,"June":6,
    "July":7,"August":8,"September":9,"October":10,"November":11,"December":12
}


# ══════════════════════════════════════════════════════════════
# 1. BACA EXCEL
# ══════════════════════════════════════════════════════════════
def parse_date(date_str):
    """Parse 'Month YYYY' or 'Month YYYY - Month YYYY' → sortable int."""
    if not date_str:
        return 0
    part = date_str.split(" - ")[-1].strip()  # ambil end date jika range
    tokens = part.split()
    if len(tokens) >= 2:
        return (int(tokens[1]) if tokens[1].isdigit() else 0) * 100 + MONTH_MAP.get(tokens[0], 0)
    return 0


def read_excel():
    if not EXCEL_FILE.exists():
        sys.exit(f"❌  Tidak ketemu: {EXCEL_FILE}")

    wb = openpyxl.load_workbook(EXCEL_FILE, data_only=True)
    ws = wb["Projects"]

    projects = []
    for row in ws.iter_rows(min_row=4, values_only=True):
        if not row[0]:          # skip baris kosong / contoh
            continue
        p = {key: (str(row[i]).strip() if row[i] is not None else "")
             for i, key in enumerate(KEYS)}
        projects.append(p)

    # Sort newest first berdasarkan date
    projects.sort(key=lambda p: parse_date(p["date"]), reverse=True)

    print(f"  ✓ {len(projects)} proyek dibaca dari Excel")
    return projects


# ══════════════════════════════════════════════════════════════
# 2. BUILD CARD HTML
# ══════════════════════════════════════════════════════════════
def build_card(p):
    if p["image_path"]:
        image_block = f'<img src="{p["image_path"]}" alt="" />'
    else:
        image_block = (
            f'<span class="project-icon">{p["card_icon"]}</span>\n'
            f'                <p class="project-category">{p["card_label"]}</p>'
        )

    # skill badges dari kolom tags (maks 3, pisah koma)
    badges = [b.strip() for b in p["tags"].split(",") if b.strip()][:3]
    badges_html = "\n                ".join(
        f'<span class="skill-badge">{b}</span>' for b in badges
    )

    # data-tags = categories (pisah spasi, untuk multi-filter)
    # Encode tags pakai | sebagai separator (aman dari spasi dalam nama tag)
    tags_attr = "|".join(t.strip() for t in p["categories"].split(",") if t.strip())

    return (
        f'        <div class="col-md-6 col-lg-4 project-item" data-tags="{tags_attr}">\n'
        f'          <div class="project-card h-100">\n'
        f'            <div class="project-image text-center">\n'
        f'              <div>\n'
        f'                {image_block}\n'
        f'              </div>\n'
        f'            </div>\n'
        f'            <div class="project-content">\n'
        f'              <h3 class="project-title">{p["title"]}</h3>\n'
        f'              <p class="project-description">{p["description"]}</p>\n'
        f'              <div class="project-skills">\n'
        f'                {badges_html}\n'
        f'              </div>\n'
        f'            </div>\n'
        f'            <div class="project-footer">\n'
        f'              <a href="../HTML/projectdetail.html?id={p["id"]}" class="project-btn">View Details &rarr;</a>\n'
        f'            </div>\n'
        f'          </div>\n'
        f'        </div>'
    )


# ══════════════════════════════════════════════════════════════
# 3. INJECT KE allprojects.html
# ══════════════════════════════════════════════════════════════
def update_html(projects):
    if not HTML_FILE.exists():
        sys.exit(f"❌  Tidak ketemu: {HTML_FILE}")

    content = HTML_FILE.read_text(encoding="utf-8")

    pattern = r'(<div[^>]+id=["\']projectsContainer["\'][^>]*>)(.*?)(</div>\s*\n\s*\n?\s*<!-- Stats Section -->)'
    match = re.search(pattern, content, re.DOTALL)

    if not match:
        sys.exit(
            '❌  Tidak menemukan pola <div id="projectsContainer"> ... </div>\n'
            '   <!-- Stats Section --> di HTML lo.\n'
            '   Pastikan comment <!-- Stats Section --> masih ada di file.'
        )

    all_cards = "\n".join(build_card(p) for p in projects)
    new_content = content.replace(
        match.group(0),
        f'{match.group(1)}\n{all_cards}\n      {match.group(3)}'
    )

    HTML_FILE.write_text(new_content, encoding="utf-8")
    print(f"  ✓ HTML/allprojects.html diupdate ({len(projects)} cards)")


# ══════════════════════════════════════════════════════════════
# 4. GENERATE Data/projectdata.js
#    Field names sesuai projectdetails.js:
#    overview, client, duration (BUKAN overview_html / info_*)
#    + tags field untuk multi-filter
# ══════════════════════════════════════════════════════════════
def build_js_entry(p):
    def esc(s):
        return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

    # Overview → jika sudah ada HTML tags, pakai as-is
    # Jika plain text, wrap tiap paragraf (pisah baris kosong) jadi <p>
    raw_overview = p["overview"].replace("\r\n", "\n").strip()
    # Overview parsing


    # Jika sudah HTML, pakai apa adanya
    if any(tag in raw_overview.lower() for tag in ("<p>", "<ul>", "<ol>", "<li>")):
        overview_html = esc(raw_overview)

    else:
        lines = [line.strip() for line in raw_overview.splitlines()]

        html_parts = []
        bullet_items = []

        for line in lines:

            # baris kosong → flush list jika ada
            if not line:
                if bullet_items:
                    html_parts.append(
                        "<ul>" +
                        "".join(
                            f"<li>{esc(item)}</li>"
                            for item in bullet_items
                        ) +
                        "</ul>"
                    )
                    bullet_items = []
                continue

            # bullet list
            if line.startswith("- "):
                bullet_items.append(line[2:].strip())

            else:
                # tutup list sebelumnya kalau ada
                if bullet_items:
                    html_parts.append(
                        "<ul>" +
                        "".join(
                            f"<li>{esc(item)}</li>"
                            for item in bullet_items
                        ) +
                        "</ul>"
                    )
                    bullet_items = []

                html_parts.append(
                    f"<p>{esc(line)}</p>"
                )

        # flush list terakhir
        if bullet_items:
            html_parts.append(
                "<ul>" +
                "".join(
                    f"<li>{esc(item)}</li>"
                    for item in bullet_items
                ) +
                "</ul>"
            )

        overview_html = "".join(html_parts)

        if not overview_html:
            overview_html = "<p>—</p>"

        # Arrays
        challenges = [c.strip() for c in p["challenges"].split(";") if c.strip()]
        solutions  = [s.strip() for s in p["solutions"].split(";") if s.strip()]
        skills     = [s.strip() for s in p["skills"].split(",") if s.strip()]
        gallery    = [g.strip() for g in p["gallery"].split(";") if g.strip()]

        # tags array dari kolom categories (pisah spasi)
        tags = [t.strip() for t in p["categories"].split(",") if t.strip()]

        # Results
        vals = [v.strip() for v in p["res_val"].split("|") if v.strip()]
        txts = [t.strip() for t in p["res_txt"].split("|") if t.strip()]
        results = []
        for v, t in zip(vals, txts):
            try:
                num = float(v)
                num = int(num) if num == int(num) else num
            except ValueError:
                num = v
            results.append({"value": num, "text": t})

        subtitle = esc(p["description"])

        e  = f'  {p["id"]}: {{\n'
        e += f'    title:        "{esc(p["title"])}",\n'
        e += f'    subtitle:     "{subtitle}",\n'
        e += f'    description:  "{subtitle}",\n'
        e += f'    category:     "{esc(p["category"])}",\n'
        e += f'    tags:         {json.dumps(tags, ensure_ascii=False)},\n'
        e += f'    date:         "{p["date"]}",\n'
        e += f'    image:        "{p["image_path"]}",\n'
        e += f'    overview:     `{overview_html}`,\n'
        e += f'    client:       "{esc(p["client"])}",\n'
        e += f'    duration:     "{p["duration"]}",\n'
        e += f'    skills:       {json.dumps(skills, ensure_ascii=False)},\n'
        e += f'    challenges:   {json.dumps(challenges, ensure_ascii=False)},\n'
        e += f'    solutions:    {json.dumps(solutions, ensure_ascii=False)},\n'
        e += f'    results:      {json.dumps(results, ensure_ascii=False)},\n'
        e += f'    gallery:      {json.dumps(gallery, ensure_ascii=False)},\n'
        e += f'    pub_url:      "{esc(p["pub_url"])}"\n'
        e += f'  }}'
        return e



def update_cache_bust():
    """Update ?v= query string di projectdetail.html supaya browser tidak cache file lama."""
    detail_html = REPO_ROOT / "HTML" / "projectdetail.html"
    if not detail_html.exists():
        print("  ⚠  HTML/projectdetail.html tidak ditemukan, skip cache bust.")
        return

    html = detail_html.read_text(encoding="utf-8")
    v = datetime.now().strftime("%Y%m%d%H%M")
    # Ganti ?v=xxx lama atau tambah baru di script src
    html = re.sub(r"(projectdata\.js)(\?v=\w*)?", "\\g<1>?v=" + v, html)
    html = re.sub(r"(projectdetails\.js)(\?v=\w*)?", "\\g<1>?v=" + v, html)
    detail_html.write_text(html, encoding="utf-8")
    print(f"  ✓ Cache bust diupdate: ?v={v}")
def update_js(projects):
    entries = ",\n".join(build_js_entry(p) for p in projects)
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    js = f"// Auto-generated: {now}\nconst projectData = {{\n{entries}\n}};\n"
    JS_FILE.write_text(js, encoding="utf-8")
    print(f"  ✓ Data/projectdata.js diupdate")
    print()
    print("  📝 File yang diubah — commit manual setelah cek:")
    print("     git add HTML/allprojects.html Data/projectdata.js projects.xlsx")
    print('     git commit -m "feat: <keterangan lo"')
    print("     git push")


# ══════════════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════════════
def main():
    print("\n🔄  Portfolio Updater — ripannurpaujan.github.io")
    print("=" * 50)
    print("\n  📊 Membaca projects.xlsx...")
    projects = read_excel()
    print("\n  🏗️  Update HTML & JS...")
    update_html(projects)
    update_js(projects)
    update_cache_bust()
    print(f"\n✅  Selesai! {len(projects)} proyek diupdate.\n")

if __name__ == "__main__":
    main()