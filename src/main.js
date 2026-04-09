document.addEventListener('DOMContentLoaded', () => {
  const navBtns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');
  const bgLayers = document.querySelectorAll('.bg-layer');

  // 1. Navigation Logic (Switching Sections and Backgrounds)
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Prevent clicking if already active
      if (btn.classList.contains('active')) return;

      const targetId = btn.getAttribute('data-target');

      // Update Buttons
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update Backgrounds
      bgLayers.forEach(bg => {
        bg.classList.remove('active');
        if (bg.id === `bg-${targetId}`) {
          bg.classList.add('active');
        }
      });

      // Update Sections
      sections.forEach(sec => {
        sec.classList.remove('active');
        if (sec.id === `sec-${targetId}`) {
          sec.classList.add('active');
        }
      });
    });
  });

  // 2. Gallery Lightbox
  const lightbox    = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
    });
  });

  const closeLightbox = () => lightbox.classList.remove('open');
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // 3. Horizontal Scroll Logic for Carousels
  const carousels = document.querySelectorAll('.carousel-container');

  carousels.forEach(carousel => {
    // Enable horizontal scrolling with vertical mouse wheel
    carousel.addEventListener('wheel', (evt) => {
      // Only prevent default if we're actually scrolling horizontally
      if (evt.deltaY !== 0) {
        evt.preventDefault();
        carousel.scrollLeft += evt.deltaY;
      }
    }, { passive: false });

    // Drag to scroll functionality for non-trackpad users
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.style.cursor = 'grabbing';
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      carousel.scrollLeft = scrollLeft - walk;
    });
  });
});
