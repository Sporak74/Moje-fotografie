document.querySelectorAll('.photo-card').forEach(card => {
  const btn = card.querySelector('.like-btn');
  const likes = card.querySelector('.likes');

  btn.addEventListener('click', () => {
    let count = parseInt(likes.textContent);
    count++;
    likes.textContent = count;
    btn.classList.add('liked');
    btn.disabled = true;
  });
});
