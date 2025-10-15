// === Lightbox ===
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    document.body.style.overflow = "hidden";
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
  document.body.style.overflow = "auto";
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// === System lajków z localStorage ===
document.querySelectorAll(".like-btn").forEach((btn, index) => {
  const likesSpan = btn.nextElementSibling;
  const key = `photo_like_${index}`;
  let liked = localStorage.getItem(key) === "true";
  let likesCount = parseInt(localStorage.getItem(`${key}_count`)) || 0;

  // Wczytaj stan
  if (liked) btn.classList.add("liked");
  likesSpan.textContent = likesCount;

  // Kliknięcie
  btn.addEventListener("click", () => {
    liked = !liked;
    btn.classList.toggle("liked");
    likesCount += liked ? 1 : -1;
    likesSpan.textContent = likesCount;
    localStorage.setItem(key, liked);
    localStorage.setItem(`${key}_count`, likesCount);
  });
});
