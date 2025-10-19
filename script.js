// --- Nawigacja mobilna ---
document.getElementById('nav-toggle').addEventListener('click', ()=>{
  document.getElementById('top-nav').classList.toggle('open');
});

// --- Lightbox ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const likeBtnLightbox = document.querySelector('.like-btn-lightbox');

document.querySelectorAll('.gallery-preview .imgwrap img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    const id = img.alt + '_' + img.src; // unikalny ID zdjęcia
    likeBtnLightbox.dataset.id = id;
    let likes = localStorage.getItem(id) || 0;
    likeBtnLightbox.querySelector('.like-count').textContent = likes;
    likeBtnLightbox.classList.toggle('liked', likes > 0);
  });
});

document.querySelector('.lightbox .close').addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// --- Lajki ---
document.addEventListener('DOMContentLoaded', () => {
  // pod miniaturami
  document.querySelectorAll('.gallery-preview .imgwrap img').forEach(img => {
    const likeDiv = document.createElement('div');
    const id = img.alt + '_' + img.src;
    likeDiv.className = 'like-btn';
    likeDiv.dataset.id = id;
    likeDiv.innerHTML = '❤️ <span class="like-count">' + (localStorage.getItem(id)||0) + '</span>';
    img.parentNode.after(likeDiv);

    likeDiv.addEventListener('click', () => {
      let likes = parseInt(localStorage.getItem(id) || 0) + 1;
      localStorage.setItem(id, likes);
      likeDiv.querySelector('.like-count').textContent = likes;
      likeDiv.classList.add('liked');
    });
  });

  // w lightboxie
  likeBtnLightbox.addEventListener('click', () => {
    const id = likeBtnLightbox.dataset.id;
    let likes = parseInt(localStorage.getItem(id) || 0) + 1;
    localStorage.setItem(id, likes);
    likeBtnLightbox.querySelector('.like-count').textContent = likes;
    likeBtnLightbox.classList.add('liked');

    // synchronizacja z miniaturą
    const thumb = document.querySelector('.gallery-preview .imgwrap img[src="'+lightboxImg.src+'"]');
    if(thumb){
      const likeDiv = thumb.parentNode.nextElementSibling;
      if(likeDiv && likeDiv.classList.contains('like-btn')){
        likeDiv.querySelector('.like-count').textContent = likes;
        likeDiv.classList.add('liked');
      }
    }
  });
});
