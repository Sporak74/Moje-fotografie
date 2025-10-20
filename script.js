document.addEventListener('DOMContentLoaded', () => {
  const likeButtons = document.querySelectorAll('.like-btn');
  likeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const likes = btn.nextElementSibling;
      likes.textContent = parseInt(likes.textContent) + 1;
      btn.classList.add('liked');
      setTimeout(() => btn.classList.remove('liked'), 300);
    });
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox .close');
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
      lightbox.style.display = 'flex';
      lightboxImg.src = img.src;
    });
  });
  closeBtn.addEventListener('click', () => lightbox.style.display = 'none');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.photo-card').forEach(el => observer.observe(el));

  const toggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  toggle.addEventListener('click', () => sidebar.classList.toggle('active'));
});
