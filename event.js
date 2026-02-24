document.addEventListener("DOMContentLoaded", () => {

  function initCarousel(carousel) {
    const images = carousel.querySelectorAll("img");
    const dots = carousel.querySelectorAll(".carousel-dot");
    const pauseBtn = carousel.querySelector(".carousel-pause");

    let index = 0;
    let paused = false;

    images.forEach((img, i) =>
      img.classList.toggle("active", i === 0)
    );

    dots.forEach((dot, i) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        images[index].classList.remove("active");
        dots[index].classList.remove("active");
        index = i;
        images[index].classList.add("active");
        dots[index].classList.add("active");
      });
    });

    let interval = setInterval(() => {
      if (paused) return;
      images[index].classList.remove("active");
      dots[index].classList.remove("active");
      index = (index + 1) % images.length;
      images[index].classList.add("active");
      dots[index].classList.add("active");
    }, 3500);

    pauseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      paused = !paused;
      pauseBtn.textContent = paused ? "▶" : "⏸";
    });

    carousel.dataset.interval = interval;
  }

  /* Hook into popup creation */
  window.addEventListener("click", () => {
    document.querySelectorAll(".event-card.expanded [data-carousel]")
      .forEach(initCarousel);
  });

});