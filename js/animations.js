// GSAP Animations
gsap.registerPlugin(TextPlugin);

// Animasi teks lead
gsap.to(".lead", {
  duration: 2,
  delay: 1.5,
  text: "Fresh graduate in Mechanical Engineering, passionate about energy and material engineering, skilled in CAD, and simulation.",
});

// Animasi navbar
gsap.from(".navbar", { duration: 1, y: "-100%", opacity: 0 });

// Animasi judul utama
// gsap.from(".display-4", { duration: 1, x: -50, opacity: 0, delay: 1, ease: "back" });
