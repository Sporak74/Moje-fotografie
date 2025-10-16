// Simple JS for nav toggle, like buttons and active link highlighting
document.addEventListener('DOMContentLoaded', function(){
  // Nav toggle for mobile
  const navToggle = document.getElementById('nav-toggle');
  const topNav = document.getElementById('top-nav');
  if(navToggle && topNav){
    navToggle.addEventListener('click', function(){
      topNav.classList.toggle('active');
    });
  }

  // Highlight active link
  try{
    const links = document.querySelectorAll('.top-nav a');
    const path = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a=>{
      if(a.getAttribute('href') === path) a.classList.add('active-link');
    });
  }catch(e){}

  // Like buttons
  document.querySelectorAll('.like-btn').forEach(btn=>{
    btn.addEventListener('click', function(e){
      const likesSpan = this.parentElement.querySelector('.likes');
      if(!likesSpan) return;
      let n = parseInt(likesSpan.textContent||'0',10);
      n = n + 1;
      likesSpan.textContent = n;
      this.setAttribute('aria-pressed','true');
    });
  });
});
