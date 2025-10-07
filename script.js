document.addEventListener('DOMContentLoaded', () => {

  // === MENU (mobilne) ===
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

  // === LAJKI (zapis w localStorage) ===
  document.querySelectorAll('.photo-card').forEach(card => {
    const img = card.querySelector('img');
    const btn = card.querySelector('.like-btn');
    const counter = card.querySelector('.likes');
    if (!img || !btn || !counter) return;

    // klucz localStorage na podstawie nazwy pliku (nie pełnej ścieżki)
    const filename = img.getAttribute('src').split('/').pop();
    const key = `like_${filename}`;

    // wczytanie poprzedniej wartości
    let likes = parseInt(localStorage.getItem(key) || '0', 10);
    counter.textContent = likes;

    // kliknięcie serduszka
    btn.addEventListener('click', () => {
      likes++;
      counter.textContent = likes;
      localStorage.setItem(key, likes);

      // animacja pulsu
      btn.style.transform = 'scale(1.4)';
      setTimeout(() => btn.style.transform = 'scale(1)', 150);
    });
  });

  // === LIGHTBOX ===
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = lightbox?.querySelector('.close');

  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery img').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.style.display = 'none';
      lightboxImg.src = '';
      document.body.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // === ANIMACJA POJAWIANIA SIĘ ZDJĘĆ ===
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // przestań obserwować po pierwszym razie
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.photo-card').forEach(card => {
    observer.observe(card);
  });

});
