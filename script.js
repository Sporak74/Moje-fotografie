document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.top-nav a');
  const path = window.location.pathname.split('/').pop();
  navLinks.forEach(a => {
    if(a.getAttribute('href') === path) a.classList.add('active');
  });

  const images = document.querySelectorAll('.gallery-grid img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('#lightbox img');
  const captionEl = document.querySelector('#lightbox .caption');
  const closeBtn = document.querySelector('#lightbox .close');
  let lastScroll = 0;

  function openLightbox(src, caption){
    lastScroll = window.scrollY || window.pageYOffset;
    document.body.style.top = `-${lastScroll}px`;
    document.body.style.position = 'fixed';
    document.body.style.left = '0';
    document.body.style.right = '0';
    lightboxImg.src = src;
    captionEl.textContent = caption || '';
    lightbox.style.display = 'flex';
    lightboxImg.style.maxHeight = '90vh';
    lightboxImg.style.maxWidth = '90vw';
    closeBtn.focus();
  }

  function closeLightbox(){
    lightbox.style.display = 'none';
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, lastScroll);
  }

  images.forEach(img => {
    img.addEventListener('click', (e) => {
      const src = img.getAttribute('data-full') || img.src;
      const caption = img.getAttribute('alt') || '';
      openLightbox(src, caption);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && lightbox.style.display === 'flex') closeLightbox(); });
});
// --- Lajki (serduszka) ---
document.addEventListener("DOMContentLoaded", () => {
  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach(btn => {
    const imgId = btn.dataset.id;
    const countEl = btn.querySelector(".like-count");
    let likes = localStorage.getItem(`likes_${imgId}`) || 0;
    countEl.textContent = likes;

    btn.addEventListener("click", () => {
      likes = parseInt(likes) + 1;
      localStorage.setItem(`likes_${imgId}`, likes);
      countEl.textContent = likes;
      btn.classList.add("liked");
    });
  });
});
