// script.js — lightbox + obsługa menu/like (całość)
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

  // --- Lightbox: tworzymy raz i używamy delegacji kliknięć ---
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Zamknij">&times;</button>
    <div class="lightbox-content"><img src="" alt="Podgląd zdjęcia"></div>
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  // Funkcja otwierająca (przyjmuje URL obrazu)
  function openLightbox(url, alt = '') {
    lightboxImg.src = url;
    lightboxImg.alt = alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // blokada scrolla tła
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = ''; // przywrócenie scrolla
  }

  // Delegacja: łapiemy kliknięcie wszędzie w dokumencie, filtruemy .gallery img
  document.addEventListener('click', (e) => {
    const clicked = e.target;

    // jeśli kliknięto w przycisk zamykania lub tło lightboxa -> zamknij
    if (clicked === closeBtn || clicked === lightbox) {
      closeLightbox();
      return;
    }

    // znajdź najbliższy element <img> wewnątrz .gallery (obsługuje <picture> też)
    const img = clicked.closest && clicked.closest('.gallery img');
    if (!img) return;

    e.preventDefault();

    // obsługa srcset/picture: jeśli jest data-large użyj go, inaczej img.currentSrc lub src
    const large = img.dataset.large || img.currentSrc || img.src;
    const alt = img.alt || '';
    openLightbox(large, alt);
  });

  // Zamknięcie przez Esc
  document.addEventListener('keyup', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });

  // Kliknięcie w wolną przestrzeń lightboxa zamyka (już obsługujemy powyżej przy clicked === lightbox)
  // closeBtn obsługuje kliknięcie:
  closeBtn.addEventListener('click', closeLightbox);
});

