
/* script.js - clean and commented */
/* helper to create id for an image */
function makeId(src, alt){
  try { return 'img_' + btoa(src + '|' + (alt||'')).replace(/=/g,'').slice(0,20); }
  catch(e) { return 'img_' + encodeURIComponent(src).slice(-20); }
}

/* Mobile nav */
document.getElementById('nav-toggle')?.addEventListener('click', ()=> {
  document.getElementById('top-nav')?.classList.toggle('open');
});

/* Fade-in for images */
document.querySelectorAll('.imgwrap img').forEach(img => {
  if(img.complete) img.classList.add('loaded');
  img.addEventListener('load', () => img.classList.add('loaded'));
});

/* Lightbox & Likes logic */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const likeBtnLightbox = document.querySelector('.like-btn-lightbox');
const lightboxClose = document.querySelector('.lightbox .close');

/* Initialize thumbnail likes and click handlers */
document.querySelectorAll('.imgwrap img').forEach(img => {
  const id = makeId(img.src, img.alt);

  // simulate global starting count if not present
  if(localStorage.getItem('count_' + id) === null){
    const start = Math.floor(Math.random() * 60) + 5;
    localStorage.setItem('count_' + id, start);
  }

  const count = localStorage.getItem('count_' + id);
  const liked = localStorage.getItem('liked_' + id) === '1';

  // create like button element
  const likeDiv = document.createElement('div');
  likeDiv.className = 'like-btn' + (liked ? ' liked' : '');
  likeDiv.dataset.id = id;
  likeDiv.innerHTML = '<span class="heart">❤</span><span class="like-count">' + count + '</span>';

  img.parentNode.after(likeDiv);

  // click on like under thumbnail
  likeDiv.addEventListener('click', () => {
    if(localStorage.getItem('liked_' + id) === '1') return;
    let c = parseInt(localStorage.getItem('count_' + id) || '0') + 1;
    localStorage.setItem('count_' + id, c);
    localStorage.setItem('liked_' + id, '1');
    likeDiv.querySelector('.like-count').textContent = c;
    likeDiv.classList.add('liked');
    // sync lightbox
    if(lightbox.style.display === 'flex' && lightboxImg.src === img.src){
      likeBtnLightbox.querySelector('.like-count').textContent = c;
      likeBtnLightbox.classList.add('liked');
    }
  });

  // clicking thumbnail opens lightbox
  img.addEventListener('click', () => openLightbox(img));
});

/* Open lightbox */
function openLightbox(img){
  const id = makeId(img.src, img.alt);
  lightbox.style.display = 'flex';
  lightboxImg.src = img.src;
  likeBtnLightbox.dataset.id = id;
  likeBtnLightbox.querySelector('.like-count').textContent = localStorage.getItem('count_' + id) || '0';
  if(localStorage.getItem('liked_' + id) === '1') likeBtnLightbox.classList.add('liked');
  else likeBtnLightbox.classList.remove('liked');
}

/* Close handlers */
lightboxClose.addEventListener('click', () => lightbox.style.display = 'none');
lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.style.display = 'none'; });

/* Like in lightbox */
likeBtnLightbox.addEventListener('click', () => {
  const id = likeBtnLightbox.dataset.id;
  if(!id) return;
  if(localStorage.getItem('liked_' + id) === '1') return;
  let c = parseInt(localStorage.getItem('count_' + id) || '0') + 1;
  localStorage.setItem('count_' + id, c);
  localStorage.setItem('liked_' + id, '1');
  likeBtnLightbox.querySelector('.like-count').textContent = c;
  likeBtnLightbox.classList.add('liked');
  // update thumbnail like display
  const thumb = document.querySelector('.imgwrap img[src="' + lightboxImg.src + '"]');
  if(thumb){
    const likeDiv = thumb.parentNode.nextElementSibling;
    if(likeDiv && likeDiv.classList.contains('like-btn')){
      likeDiv.querySelector('.like-count').textContent = c;
      likeDiv.classList.add('liked');
    }
  }
});
