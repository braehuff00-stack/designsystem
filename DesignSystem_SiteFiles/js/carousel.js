// Carousel arrows (components/carousel.html and patterns/case-study.html).
// The carousels don't wrap or auto-advance, so Previous is disabled on the first
// slide and Next on the last, matching the Figma "Primary Arrow Group Disabled"
// state. A polite live region announces "Slide n of N" after each move.
(() => {
  document.querySelectorAll('.ds-carousel').forEach((wrap) => {
    const carousel = wrap.querySelector('.carousel');
    if (!carousel) return;
    const items = carousel.querySelectorAll('.carousel-item');
    const prev = wrap.querySelector('[data-bs-slide="prev"]');
    const next = wrap.querySelector('[data-bs-slide="next"]');
    const status = wrap.querySelector('.carousel-status');

    const update = (index) => {
      const atStart = index === 0;
      const atEnd = index === items.length - 1;
      // A disabled button can't hold focus, so hand focus to the other arrow first
      if (atStart && document.activeElement === prev) next.focus();
      if (atEnd && document.activeElement === next) prev.focus();
      prev.disabled = atStart;
      next.disabled = atEnd;
      if (status) status.textContent = `Slide ${index + 1} of ${items.length}`;
    };

    carousel.addEventListener('slid.bs.carousel', (event) => update(event.to));
    update(Array.prototype.findIndex.call(items, (item) => item.classList.contains('active')));
  });
})();
