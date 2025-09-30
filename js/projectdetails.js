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
  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-subtitle").textContent = project.subtitle;
  document.getElementById("project-description").textContent = project.description;
  document.getElementById("project-category").textContent = project.category;
  document.getElementById("project-date").textContent = project.date;

  // 3. Carousel Images
  const carouselContainer = document.getElementById("carousel-images");
  carouselContainer.innerHTML = ""; // kosongkan dulu

  if (Array.isArray(project.images) && project.images.length > 0) {
    project.images.forEach((imgSrc, index) => {
      const div = document.createElement("div");
      div.className = "carousel-item" + (index === 0 ? " active" : "");

      const img = document.createElement("img");
      img.src = imgSrc;
      img.className = "d-block w-100";
      img.alt = `${project.title} - ${index + 1}`;

      div.appendChild(img);
      carouselContainer.appendChild(div);
    });
  } else {
    // fallback kalau gak ada array images
    const div = document.createElement("div");
    div.className = "carousel-item active";

    const img = document.createElement("img");
    img.src = project.image || "assets/img/placeholder.jpg";
    img.className = "d-block w-100";
    img.alt = project.title;

    div.appendChild(img);
    carouselContainer.appendChild(div);
  }

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
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

const project = projectData[projectId];

if (project) {
  // title & subtitle
  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-subtitle").textContent = project.subtitle;

  // skills
  const skillsContainer = document.getElementById("skills-grid");
  skillsContainer.innerHTML = "";
  project.skills.forEach((skill) => {
    const badge = document.createElement("span");
    badge.className = "badge bg-secondary rounded-pill me-1";
    badge.textContent = skill;
    skillsContainer.appendChild(badge);
  });

  // other projects
  const otherProjectsContainer = document.getElementById("other-projects");

  // ambil semua project kecuali yg sedang dibuka
  let otherKeys = Object.keys(projectData).filter((key) => key !== projectId);

  // acak urutannya
  otherKeys = otherKeys.sort(() => 0.5 - Math.random());

  // ambil hanya 3
  otherKeys.slice(0, 3).forEach((key) => {
    const other = projectData[key];

    // wrapper link
    const link = document.createElement("a");
    link.href = `projectdetail.html?id=${key}`;
    link.className = "list-group-item list-group-item-action";

    // title
    const titleDiv = document.createElement("div");
    titleDiv.className = "fw-bold";
    titleDiv.textContent = other.title;
    link.appendChild(titleDiv);

    // subtitle
    const subtitle = document.createElement("small");
    subtitle.className = "text-muted";
    subtitle.textContent = other.subtitle;
    link.appendChild(subtitle);

    link.appendChild(document.createElement("br"));

    // skills (maksimal 3 biar rapi)
    if (Array.isArray(other.skills)) {
      other.skills.slice(0, 3).forEach((skill) => {
        const badge = document.createElement("span");
        badge.className = "badge badge-secondary rounded-pill me-1";
        badge.textContent = skill;
        link.appendChild(badge);
      });
    }

    otherProjectsContainer.appendChild(link);

    // separator
    const hr = document.createElement("hr");
    hr.className = "separator";
    otherProjectsContainer.appendChild(hr);
  });
} else {
  document.getElementById("project-title").textContent = "Project not found";
}
