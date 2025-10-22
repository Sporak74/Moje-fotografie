document.querySelectorAll('.like-button').forEach((btn, i) => {
  const countEl = btn.nextElementSibling;
  const savedLikes = localStorage.getItem('likes_' + i);
  let count = savedLikes ? parseInt(savedLikes) : 0;
  countEl.textContent = count;

  btn.addEventListener('click', () => {
    count++;
    countEl.textContent = count;
    localStorage.setItem('likes_' + i, count);
  });
});
