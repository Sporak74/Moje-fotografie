// script.js — z lightboxem i obsługą menu/like
document.addEventListener('DOMContentLoaded', () => {
  // --- Nawigacja mobilna ---
  const navToggle = document.getElementById('nav-toggle');
  const topNav = document.getElementById('top-nav');
  if (navToggle && topNav) {
    navToggle.addEventListener('click', () => {
      topNav.classList.toggle('active');
    });
  }

  // --- Podświetlenie aktywnego linku ---
  const links = document.querySelectorAll('.top-nav a');
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active-link');
  });

  // --- Polubienia ---
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const likesSpan = btn.parentElement.querySelector('.likes');
      if (!likesSpan) return;
      let n = parseInt(likesSpan.textContent || '0', 10);
      likesSpan.textContent = n + 1;
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  // --- Lightbox: pełnoekranowy podgląd ---
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="" alt="Podgląd zdjęcia">
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  // kliknięcie w zdjęcie otwiera podgląd
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });

  // zamykanie lightboxa
  closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
});
  // zamykanie lightboxa
  closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
});
