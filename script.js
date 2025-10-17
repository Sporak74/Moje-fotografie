document.getElementById('nav-toggle').addEventListener('click', () => {
  document.getElementById('top-nav').classList.toggle('open');
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const close = document.getElementsByClassName('close')[0];

document.querySelectorAll('.preview-card img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
  });
});

close.onclick = () => { lightbox.style.display = 'none'; };
window.onclick = e => { if (e.target == lightbox) lightbox.style.display = 'none'; };

// Intersection Observer - animacja fade/slide dla sekcji
const sections = document.querySelectorAll('.about, .featured, .contact');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold: 0.2});
sections.forEach(sec => observer.observe(sec));

// Paralaksa dla miniatur galerii
window.addEventListener('scroll', () => {
  const images = document.querySelectorAll('.preview-card img');
  images.forEach(img => {
    const speed = 0.2; // regulacja intensywności paralaksy
    const offset = window.scrollY * speed;
    img.style.transform = `translateY(${offset}px)`;
  });
});
