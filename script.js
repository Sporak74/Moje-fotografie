document.addEventListener("DOMContentLoaded", () => {

  // --- Efekt lightbox (powiększanie zdjęć) ---
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");

  document.querySelectorAll(".photo-card img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      document.body.style.overflow = "hidden"; // blokuj scroll przy otwartym lightboxie
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

  // --- Efekt pojawiania się zdjęć przy przewijaniu ---
  const photoCards = document.querySelectorAll(".photo-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  photoCards.forEach(card => observer.observe(card));

  // --- Automatyczne dodanie loading="lazy" do wszystkich zdjęć ---
  document.querySelectorAll("img").forEach(img => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
  });

  // --- System lajków z zapisem w localStorage ---
  const likeButtons = document.querySelectorAll(".like-btn");

  likeButtons.forEach((btn, index) => {
    const photoCard = btn.closest(".photo-card");
    const likesSpan = photoCard.querySelector(".likes");
    const imgSrc = photoCard.querySelector("img").src;
    const storageKey = `likes_${imgSrc}`;

    // Wczytaj lajki z localStorage
    const savedLikes = localStorage.getItem(storageKey);
    if (savedLikes) {
      likesSpan.textContent = savedLikes;
    }

    // Kliknięcie w serduszko
    btn.addEventListener("click", () => {
      let currentLikes = parseInt(likesSpan.textContent) || 0;
      currentLikes++;
      likesSpan.textContent = currentLikes;
      localStorage.setItem(storageKey, currentLikes);
      btn.style.transform = "scale(1.3)";
      setTimeout(() => btn.style.transform = "scale(1)", 200);
    });
  });

  // --- Efekt fade-in dla ikon społecznościowych ---
  const socialLinks = document.querySelector(".social-links");
  if (socialLinks) {
    const socialObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          socialLinks.classList.add("visible");
          socialObserver.unobserve(socialLinks);
        }
      });
    }, { threshold: 0.3 });
    socialObserver.observe(socialLinks);
  }

});
