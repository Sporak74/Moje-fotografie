
// script.js
// Prosty, odporny na błędy skrypt do galerii
document.addEventListener('DOMContentLoaded', () => {
  // --- Menu toggle (np. na mobilkach) ---
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      menuToggle.classList.toggle('open');
    });
  }

  // --- Smooth scroll dla linków kotwicowych ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // zamknij sidebar po kliknięciu (opcjonalnie)
          if (sidebar && sidebar.classList.contains('open')) sidebar.classList.remove('open');
        }
      }
    });
  });

  // --- Like buttons (z zapisem w localStorage) ---
  document.querySelectorAll('.photo-card').forEach(card => {
    const img = card.querySelector('img');
    const btn = card.querySelector('.like-btn');
    const likesSpan = card.querySelector('.likes');
    if (!img || !btn || !likesSpan) return;

    // klucz po nazwie pliku
    const filename = img.getAttribute('src').split('/').pop();
    const storageKey = 'likes:' + filename;
    const saved = parseInt(localStorage.getItem(storageKey) ?? likesSpan.textContent ?? '0', 10);
    likesSpan.textContent = Number.isNaN(saved) ? 0 : saved;

    btn.addEventListener('click', () => {
      let val = parseInt(likesSpan.textContent || '0', 10);
      if (Number.isNaN(val)) val = 0;
      val += 1;
      likesSpan.textContent = val;
      localStorage.setItem(storageKey, val);

      // krótka animacja feedbacku (jeśli przeglądarka wspiera)
      try {
        btn.animate([
          { transform: 'scale(1)' },
          { transform: 'scale(1.2)' },
          { transform: 'scale(1)' }
        ], { duration: 180 });
      } catch (_) { /* ignore */ }
    });
  });

  // --- Lightbox ---
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = lightbox ? lightbox.querySelector('.close') : null;

  document.querySelectorAll('.gallery img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    // usuń src po krótkim czasie (opcjonalnie)
    setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 200);
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
});
