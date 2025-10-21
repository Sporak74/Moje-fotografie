
// mobile nav toggle
document.getElementById('nav-toggle')?.addEventListener('click', ()=>{
  document.getElementById('top-nav')?.classList.toggle('open');
});

// image fade in
document.querySelectorAll('.imgwrap img').forEach(img=>{
  if(img.complete) img.classList.add('loaded');
  img.addEventListener('load', ()=> img.classList.add('loaded'));
});

function makeId(src, alt){ return 'img_' + btoa(src + '|' + (alt||'')).replace(/=/g,'').slice(0,20); }

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const likeBtnLightbox = document.querySelector('.like-btn-lightbox');
const lightboxClose = document.querySelector('.lightbox .close');

// init thumbnails with like buttons and click handlers
document.querySelectorAll('.imgwrap img').forEach(img=>{
  const id = makeId(img.src, img.alt);
  // init count if absent (variant 2 simulated global base)
  if(localStorage.getItem('count_' + id) === null){
    const base = Math.floor(Math.random()*60) + 5;
    localStorage.setItem('count_' + id, base);
  }
  const count = localStorage.getItem('count_' + id);
  const liked = localStorage.getItem('liked_' + id) === '1';
  const likeDiv = document.createElement('div');
  likeDiv.className = 'like-btn' + (liked ? ' liked' : '');
  likeDiv.dataset.id = id;
  likeDiv.innerHTML = '<span class="heart">❤</span><span class="like-count">' + count + '</span>';
  img.parentNode.after(likeDiv);

  likeDiv.addEventListener('click', ()=>{
    if(localStorage.getItem('liked_' + id) === '1') return;
    let c = parseInt(localStorage.getItem('count_' + id) || '0') + 1;
    localStorage.setItem('count_' + id, c);
    localStorage.setItem('liked_' + id, '1');
    likeDiv.querySelector('.like-count').textContent = c;
    likeDiv.classList.add('liked');
    // sync lightbox if open
    if(lightbox.style.display === 'flex' && lightboxImg.src === img.src){
      likeBtnLightbox.querySelector('.like-count').textContent = c;
      likeBtnLightbox.classList.add('liked');
    }
  });

  img.addEventListener('click', ()=> openLightbox(img));
});

function openLightbox(img){
  const id = makeId(img.src, img.alt);
  lightbox.style.display = 'flex';
  lightboxImg.src = img.src;
  likeBtnLightbox.dataset.id = id;
  likeBtnLightbox.querySelector('.like-count').textContent = localStorage.getItem('count_' + id) || '0';
  if(localStorage.getItem('liked_' + id) === '1'){ likeBtnLightbox.classList.add('liked'); } else { likeBtnLightbox.classList.remove('liked'); }
}

lightboxClose.addEventListener('click', ()=> lightbox.style.display = 'none');
lightbox.addEventListener('click', (e)=> { if(e.target === lightbox) lightbox.style.display = 'none'; });

likeBtnLightbox.addEventListener('click', ()=>{
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
