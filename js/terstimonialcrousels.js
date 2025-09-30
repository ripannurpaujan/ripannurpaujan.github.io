const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let currentIndex = 0;

// Buat dots sesuai jumlah testimonial
testimonials.forEach((_, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => showTestimonial(i));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("button");

function showTestimonial(index) {
  testimonials[currentIndex].classList.remove("active");
  dots[currentIndex].classList.remove("active");
  currentIndex = index;
  testimonials[currentIndex].classList.add("active");
  dots[currentIndex].classList.add("active");
}

nextBtn.addEventListener("click", () => {
  let newIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(newIndex);
});

prevBtn.addEventListener("click", () => {
  let newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(newIndex);
});

// Auto slide
setInterval(() => {
  let newIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(newIndex);
}, 5000);
