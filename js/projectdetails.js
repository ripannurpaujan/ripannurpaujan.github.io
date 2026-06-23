function loadProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");

  if (!projectId || !projectData[projectId]) {
    document.getElementById("hero-title").textContent =
      "Project Not Found";
    return;
  }

  const project = projectData[projectId];

  /* =========================
      HERO SECTION
  ========================= */

  const heroImg = document.getElementById("hero-img");
  const heroCat = document.getElementById("hero-category");
  const heroTitle = document.getElementById("hero-title");

  let imageSource = "";

  if (project.image) {
    imageSource = project.image;
  } else if (project.gallery && project.gallery.length > 0) {
    imageSource = project.gallery[0];
  } else {
    imageSource = "../img/placeholder.jpg";
  }

  heroImg.src = imageSource;
  heroImg.alt = project.title || "";
  heroCat.textContent = project.category || "";
  heroTitle.textContent = project.title || "";

  /* =========================
      HEADER
  ========================= */

  document.getElementById("project-date").textContent =
    project.date || "";

  document.getElementById("project-subtitle").textContent =
    project.subtitle || "";

  /* =========================
      OVERVIEW
  ========================= */

  document.getElementById(
    "project-overview-content"
  ).innerHTML = project.overview || "";

  /* =========================
      PROJECT INFO
  ========================= */

  document.getElementById("info-client").textContent =
    project.client || "-";

  document.getElementById("info-duration").textContent =
    project.duration || "-";

  document.getElementById("info-category").textContent =
    project.category || "-";

  /* =========================
      CHALLENGES
  ========================= */

  const challengesList =
    document.getElementById("challenges-list");

  if (Array.isArray(project.challenges)) {
    challengesList.innerHTML = project.challenges
      .map(
        (c) => `
        <li>
          <div class="challenge-dot"></div>
          <span>${c}</span>
        </li>
      `
      )
      .join("");
  } else {
    challengesList.innerHTML =
      project.challenges || "";
  }

  /* =========================
      SOLUTIONS
  ========================= */

  const solutionsList =
    document.getElementById("solutions-list");

  if (Array.isArray(project.solutions)) {
    solutionsList.innerHTML = project.solutions
      .map(
        (s) => `
        <li>
          <div class="solution-dot"></div>
          <span>${s}</span>
        </li>
      `
      )
      .join("");
  } else {
    solutionsList.innerHTML =
      project.solutions || "";
  }

  /* =========================
      SKILLS
  ========================= */

  const skillsGrid =
    document.getElementById("skills-grid");

  skillsGrid.innerHTML = (project.skills || [])
    .map(
      (skill) =>
        `<span class="badge rounded-pill">${skill}</span>`
    )
    .join(" ");

  /* =========================
      RESULTS
  ========================= */

  const resultsContainer =
    document.getElementById("results-container");

  let delay = 0;

  resultsContainer.innerHTML = (project.results || [])
    .map((result) => {
      const html = `
        <div class="col-md-6"
             data-aos="fade-up"
             data-aos-delay="${delay}00">

          <div class="result-item">

            <div class="result-number"
                 data-value="${result.value}">
              ${result.value}
            </div>

            <div class="result-text">
              ${result.text}
            </div>

          </div>
        </div>
      `;

      delay++;

      return html;
    })
    .join("");

  /* =========================
      GALLERY
  ========================= */

  let currentGalleryIndex = 0;
  let galleryImages = project.gallery || [];

  const gallerySection =
    document.getElementById("gallery-section");

  if (!galleryImages.length) {
    gallerySection.style.display = "none";
  } else {
    gallerySection.style.display = "block";

    renderGallery();
    renderThumbnails();
  }

  function renderGallery() {
    document.getElementById(
      "gallery-main-img"
    ).src = galleryImages[currentGalleryIndex];

    document.getElementById(
      "gallery-counter"
    ).innerText =
      `${currentGalleryIndex + 1} / ${galleryImages.length}`;

    updateActiveThumbnail();
  }

  function changeGalleryImage(n) {
    currentGalleryIndex =
      (currentGalleryIndex +
        n +
        galleryImages.length) %
      galleryImages.length;

    renderGallery();
  }

  function setGalleryImage(index) {
    currentGalleryIndex = index;
    renderGallery();
  }

  function renderThumbnails() {
    const thumbs =
      document.getElementById("gallery-thumbs");

    thumbs.innerHTML = "";

    if (galleryImages.length <= 1) return;

    galleryImages.forEach((img, index) => {
      const btn = document.createElement("button");

      btn.className = "thumb-btn";
      btn.id = `thumb-${index}`;

      btn.innerHTML =
        `<img src="${img}" alt="">`;

      btn.onclick = () =>
        setGalleryImage(index);

      thumbs.appendChild(btn);
    });
  }

  function updateActiveThumbnail() {
    document
      .querySelectorAll(".thumb-btn")
      .forEach((btn) =>
        btn.classList.remove("active")
      );

    const active =
      document.getElementById(
        `thumb-${currentGalleryIndex}`
      );

    if (active)
      active.classList.add("active");
  }

  window.changeGalleryImage =
    changeGalleryImage;

  /* =========================
      FULLSCREEN
  ========================= */

  const fsOverlay =
    document.getElementById(
      "fullscreenGallery"
    );

  const fsImage =
    document.getElementById("fsImage");

  const fsThumbs =
    document.getElementById("fsThumbs");

  const fsBtn =
    document.getElementById(
      "btn-fullscreen"
    );

  if (fsBtn) {
    fsBtn.addEventListener("click", () => {
      openFullscreen(currentGalleryIndex);
    });
  }

  function openFullscreen(index) {
    currentGalleryIndex = index;

    fsOverlay.style.display = "flex";

    renderFullscreen();
  }

  function closeFullscreen() {
    fsOverlay.style.display = "none";
  }

  function renderFullscreen() {
    fsImage.src =
      galleryImages[currentGalleryIndex];

    fsThumbs.innerHTML = "";

    galleryImages.forEach((img, i) => {
      const thumb =
        document.createElement("img");

      thumb.src = img;
      thumb.className = "fs-thumb";

      if (i === currentGalleryIndex) {
        thumb.classList.add("active");
      }

      thumb.onclick = () => {
        currentGalleryIndex = i;

        renderFullscreen();
        renderGallery();
      };

      fsThumbs.appendChild(thumb);
    });
  }

  function nextFS() {
    currentGalleryIndex =
      (currentGalleryIndex + 1) %
      galleryImages.length;

    renderFullscreen();
    renderGallery();
  }

  function prevFS() {
    currentGalleryIndex =
      (currentGalleryIndex -
        1 +
        galleryImages.length) %
      galleryImages.length;

    renderFullscreen();
    renderGallery();
  }

  window.openFullscreen = openFullscreen;
  window.closeFullscreen = closeFullscreen;
  window.nextFS = nextFS;
  window.prevFS = prevFS;
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