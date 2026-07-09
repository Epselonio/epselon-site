// Epselon site chrome: mobile nav + scroll fade-ups. No dependencies.
(function () {
  var toggle = document.querySelector('.eps-nav__toggle');
  var links = document.querySelector('.eps-nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') links.classList.remove('is-open');
    });
  }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var faders = document.querySelectorAll('.fade-up');
  if (reduced || !('IntersectionObserver' in window)) {
    faders.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  faders.forEach(function (el) { io.observe(el); });
})();
