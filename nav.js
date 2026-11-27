// Mobile menu toggle — shared by every page.
(function () {
  var toggle = document.querySelector('.site-nav__toggle');
  var links = document.getElementById('site-nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    links.classList.toggle('is-open', !open);
  });
})();
