// Mobile menu toggle — shared by every page.
(function () {
  var toggle = document.querySelector('.site-nav__toggle');
  var links = document.getElementById('site-nav-links');
  if (!toggle || !links) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    links.classList.toggle('is-open', open);
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close after choosing a link (matters for same-page anchors like #auditions)
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  // Close on Escape, returning focus to the button
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close when tapping anywhere outside the nav
  document.addEventListener('click', function (e) {
    if (links.classList.contains('is-open') && !e.target.closest('.site-nav')) {
      setOpen(false);
    }
  });

  // Reset if the screen grows past the mobile breakpoint
  window.matchMedia('(min-width: 768px)').addEventListener('change', function (mq) {
    if (mq.matches) setOpen(false);
  });
})();
