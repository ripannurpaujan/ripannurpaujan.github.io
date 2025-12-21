function loadProjectDetail() {
  // 1. Ambil Proyek dari URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  if (!projectId || !projectData[projectId]) {
    // Tampilkan pesan error dan hentikan eksekusi
    document.getElementById("project-title").textContent = "ERROR: Proyek Tidak Ditemukan";
    document.getElementById("project-description").textContent = "ID proyek tidak valid.";
    return;
  }

  const project = projectData[projectId];

  // 2. Isi Konten Sederhana (Header & Overview)
  // document.getElementById("project-title").textContent = project.title;

  // document.getElementById("project-category").textContent = project.categSory;

  // 3. Hero Image (Background Project)
  // Pastikan variabel 'project' sudah ditemukan dari projectdata.js
  if (project) {
    // 1. Ambil Elemen HTML berdasarkan ID yang baru kita buat
    const heroImg = document.getElementById("hero-img");
    const heroCat = document.getElementById("hero-category");
    const heroTitle = document.getElementById("hero-title");

    // 2. Tentukan Gambar Mana yang Dipakai
    // Logic: Cek 'project.image' (thumbnail utama) dulu.
    // Kalau kosong, ambil gambar pertama dari array 'project.images[0]'.
    // Kalau kosong juga, pakai placeholder.
    let imageSource = "";

    if (project.image) {
      imageSource = project.image;
    } else if (project.images && project.images.length > 0) {
      imageSource = project.images[0];
    } else {
      imageSource = "assets/img/placeholder.jpg";
    }

    // 3. Suntikkan Data ke HTML
    heroImg.src = imageSource;
    heroImg.alt = project.title; // Alt text untuk SEO/Aksesibilitas

    heroCat.textContent = project.category; // Teks Kategori
    heroTitle.textContent = project.title; // Teks Judul Project
  }

  // Header
  document.getElementById("project-subtitle").textContent = project.subtitle;
  document.getElementById("project-description").textContent = project.description;
  document.getElementById("project-date").textContent = project.date;

  // 4. Project Overview (Menggunakan innerHTML)
  document.getElementById("project-overview-content").innerHTML = project.overview_html;

  // Sidebar Info
  document.getElementById("info-client").textContent = project.info_client;
  document.getElementById("info-duration").textContent = project.info_duration;
  document.getElementById("info-category").textContent = project.info_category;

  // 5. Isi Konten Daftar (Challenges, Solutions, Skills)

  // FUNGSI BANTU UNTUK MEMBUAT LIST ITEM
  function createListItem(text, dotClass) {
    return `
            <li>
                <div class="${dotClass}"></div>
                <span>${text}</span>
            </li>
        `;
  }

  // Isi Challenges
  const challengesList = document.getElementById("challenges-list");
  challengesList.innerHTML = project.challenges.map((c) => createListItem(c, "challenge-dot")).join("");

  // Isi Solutions
  const solutionsList = document.getElementById("solutions-list");
  solutionsList.innerHTML = project.solutions.map((s) => createListItem(s, "solution-dot")).join("");

  // Isi Skills
  const skillsGrid = document.getElementById("skills-grid");
  skillsGrid.innerHTML = project.skills.map((skill) => `<span class="badge rounded-pill">${skill}</span>`).join(" ");

  // 6. Isi Konten Results (Numerik)
  const resultsContainer = document.getElementById("results-container");

  // FUNGSI BANTU UNTUK MEMBUAT RESULT ITEM
  let delay = 0;
  resultsContainer.innerHTML = project.results
    .map((result) => {
      const resultHTML = `
            <div class="col-md-6" data-aos="fade-up" data-aos-delay="${delay}00">
                <div class="result-item">
                    <div class="result-number" data-value="${result.value}">${result.value}%</div>
                    <div class="result-text">${result.text}</div>
                </div>
            </div>
        `;
      delay += 1; // Tambah delay untuk efek animasi
      return resultHTML;
    })
    .join("");

  // 7. Gallery Section
  // Variabel Global untuk Gallery
  let currentGalleryIndex = 0;
  let galleryImages = [];

  // Fungsi inisialisasi (Dipanggil saat halaman loading data project)
  function initGallery(projectData) {
    const gallerySection = document.getElementById("gallery-section");

    // 1. Cek Data: Gunakan 'projectData.gallery' atau 'projectData.details.gallery' sesuai struktur JSON kamu
    // Saya buat flexible: cek details.gallery dulu, kalau null cek gallery biasa
    const images = projectData.details && projectData.details.gallery ? projectData.details.gallery : projectData.gallery || [];

    if (images.length > 0) {
      galleryImages = images;
      currentGalleryIndex = 0;
      gallerySection.style.display = "block"; // Tampilkan section

      renderGallery(); // Render tampilan awal
      renderThumbnails(); // Buat tombol thumbnail
    } else {
      gallerySection.style.display = "none"; // Sembunyikan jika tidak ada foto
    }
  }

  // Fungsi Update Tampilan Utama
  function renderGallery() {
    const mainImg = document.getElementById("gallery-main-img");
    const counter = document.getElementById("gallery-counter");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");

    // Set Source Gambar
    mainImg.src = galleryImages[currentGalleryIndex];

    // Update Counter Text
    counter.textContent = `${currentGalleryIndex + 1} / ${galleryImages.length}`;

    // Sembunyikan tombol navigasi jika gambarnya cuma 1
    if (galleryImages.length <= 1) {
      btnPrev.style.display = "none";
      btnNext.style.display = "none";
      counter.style.display = "none";
    } else {
      btnPrev.style.display = "flex";
      btnNext.style.display = "flex";
    }

    // Update Highlight Thumbnail
    updateActiveThumbnail();
  }

  // Fungsi Ganti Gambar (Prev/Next)
  // n = -1 (mundur) atau 1 (maju)
  function changeGalleryImage(n) {
    currentGalleryIndex += n;

    // Logic Loop (Kalau habis, balik ke awal/akhir)
    if (currentGalleryIndex >= galleryImages.length) {
      currentGalleryIndex = 0;
    } else if (currentGalleryIndex < 0) {
      currentGalleryIndex = galleryImages.length - 1;
    }

    renderGallery();
  }

  window.changeGalleryImage = changeGalleryImage;
  window.setGalleryImage = setGalleryImage;

  // Fungsi Full Screen
  // const fullscreenBtn = document.getElementById("btn-fullscreen");
  // const galleryStage = document.querySelector(".gallery-stage");

  // fullscreenBtn.addEventListener("click", () => {
  //   if (!document.fullscreenElement) {
  //     galleryStage.requestFullscreen();
  //   } else {
  //     document.exitFullscreen();
  //   }
  // });

  /* ======================
     INIT GALLERY
  ====================== */
  function initGallery(project) {
    galleryImages = project.details?.gallery || project.gallery || [];

    if (!galleryImages.length) return;

    document.getElementById("gallery-section").style.display = "block";
    renderGallery();
    renderThumbnails();
  }

  /* ======================
     GALLERY NORMAL
  ====================== */
  function renderGallery() {
    document.getElementById("gallery-main-img").src = galleryImages[currentGalleryIndex];

    document.getElementById("gallery-counter").innerText = `${currentGalleryIndex + 1} / ${galleryImages.length}`;
  }

  function changeGalleryImage(n) {
    currentGalleryIndex = (currentGalleryIndex + n + galleryImages.length) % galleryImages.length;

    renderGallery();
  }

  window.changeGalleryImage = changeGalleryImage;

  /* ======================
     FULLSCREEN OVERLAY
  ====================== */
  const fsOverlay = document.getElementById("fullscreenGallery");
  const fsImage = document.getElementById("fsImage");
  const fsThumbs = document.getElementById("fsThumbs");
  const fsBtn = document.getElementById("btn-fullscreen");

  fsBtn.addEventListener("click", () => {
    openFullscreen(currentGalleryIndex);
  });

  function openFullscreen(index) {
    currentGalleryIndex = index;
    fsOverlay.style.display = "flex";
    renderFullscreen();
  }

  function closeFullscreen() {
    fsOverlay.style.display = "none";
  }

  function renderFullscreen() {
    fsImage.src = galleryImages[currentGalleryIndex];
    fsThumbs.innerHTML = "";

    galleryImages.forEach((img, i) => {
      const t = document.createElement("img");
      t.src = img;
      t.className = "fs-thumb";
      if (i === currentGalleryIndex) t.classList.add("active");

      t.onclick = () => {
        currentGalleryIndex = i;
        renderFullscreen();
        renderGallery();
      };

      fsThumbs.appendChild(t);
    });
  }

  function nextFS() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    renderFullscreen();
    renderGallery();
  }

  function prevFS() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    renderFullscreen();
    renderGallery();
  }

  /* expose ke HTML */
  window.openFullscreen = openFullscreen;
  window.closeFullscreen = closeFullscreen;
  window.nextFS = nextFS;
  window.prevFS = prevFS;

  /* ======================
     ESC UX
  ====================== */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeFullscreen();
  });

  /* ======================
     EKSEKUSI
  ====================== */
  initGallery(project);

  // Fungsi Klik Thumbnail Langsung
  function setGalleryImage(index) {
    currentGalleryIndex = index;
    renderGallery();
  }

  // Fungsi Render Tombol Thumbnail
  function renderThumbnails() {
    const thumbsContainer = document.getElementById("gallery-thumbs");
    thumbsContainer.innerHTML = ""; // Bersihkan lama

    // Jika gambar cuma 1, tidak perlu thumbnail
    if (galleryImages.length <= 1) return;

    galleryImages.forEach((imgSrc, index) => {
      const btn = document.createElement("button");
      btn.className = "thumb-btn";
      btn.onclick = () => setGalleryImage(index);

      // Beri ID unik biar mudah dicari untuk active state
      btn.id = `thumb-${index}`;

      btn.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${index + 1}">`;
      thumbsContainer.appendChild(btn);
    });
  }

  // Fungsi Update Border Biru pada Thumbnail
  function updateActiveThumbnail() {
    // Hapus class active dari semua thumb
    document.querySelectorAll(".thumb-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Tambah class active ke thumb yang sesuai
    const activeBtn = document.getElementById(`thumb-${currentGalleryIndex}`);
    if (activeBtn) {
      activeBtn.classList.add("active");
    }
  }

  // --- EKSEKUSI ---
  // Panggil fungsi ini di bagian bawah script utama kamu, setelah project ditemukan
  if (typeof project !== "undefined") {
    initGallery(project);
  }
}

// Panggil fungsi saat halaman selesai dimuat
window.onload = loadProjectDetail;

// Animasi
// Initialize Lucide icons
lucide.createIcons();

// Navigation functions
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    // Fallback to homepage
    window.location.href = "/";
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add scroll-based animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply animation to cards
document.querySelectorAll(".card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});

// Add hover effects to result items
document.querySelectorAll(".result-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-4px)";
    this.style.boxShadow = "0 8px 24px -4px hsl(var(--primary) / 0.1)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "none";
  });

  item.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
});

// Other Project Function
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  // validasi data
  if (!projectId || !projectData[projectId]) return;

  const otherProjectsContainer = document.getElementById("other-projects");
  if (!otherProjectsContainer) return;

  otherProjectsContainer.innerHTML = "";

  // ambil semua project kecuali yang sedang dibuka
  let otherKeys = Object.keys(projectData).filter((key) => key !== projectId);

  // acak urutan
  otherKeys.sort(() => Math.random() - 0.5);

  // ambil maksimal 3
  otherKeys.slice(0, 3).forEach((key) => {
    const other = projectData[key];

    const link = document.createElement("a");
    link.href = `projectdetail.html?id=${key}`;
    link.className = "list-group-item list-group-item-action";

    // title
    const titleDiv = document.createElement("div");
    titleDiv.className = "fw-bold";
    titleDiv.textContent = other.title || "Untitled Project";
    link.appendChild(titleDiv);

    // subtitle (optional)
    if (other.subtitle) {
      const subtitle = document.createElement("small");
      subtitle.className = "text-muted d-block";
      subtitle.textContent = other.subtitle;
      link.appendChild(subtitle);
    }

    // skills (maks 3)
    if (Array.isArray(other.skills)) {
      const skillWrapper = document.createElement("div");
      skillWrapper.className = "mt-2";

      other.skills.slice(0, 3).forEach((skill) => {
        const badge = document.createElement("span");
        badge.className = "badge bg-secondary rounded-pill me-1";
        badge.textContent = skill;
        skillWrapper.appendChild(badge);
      });

      link.appendChild(skillWrapper);
    }

    otherProjectsContainer.appendChild(link);
  });
});
