// Instagram strip in Club Culture (about.html). Reads the Behold JSON feed
// named in data-behold-feed and builds a row of tappable post tiles that
// open on Instagram. If the feed fails, the strip stays hidden.
(function () {
  var root = document.querySelector('[data-behold-feed]');
  if (!root) return;

  var track = root.querySelector('.insta__track');
  var prev = root.querySelector('.insta__arrow--prev');
  var next = root.querySelector('.insta__arrow--next');

  fetch('https://feeds.behold.so/' + root.dataset.beholdFeed)
    .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
    .then(function (feed) {
      var posts = (feed.posts || []).filter(function (p) { return p.sizes && p.sizes.medium; });
      if (!posts.length) return;

      posts.forEach(function (post) {
        var li = document.createElement('li');
        li.className = 'insta__item';

        var a = document.createElement('a');
        a.className = 'insta__link';
        a.href = post.permalink;
        a.target = '_blank';
        a.rel = 'noopener';

        var img = document.createElement('img');
        img.className = 'insta__img';
        img.src = post.sizes.medium.mediaUrl;
        img.loading = 'lazy';
        img.width = 700;
        img.height = 700;
        var caption = (post.prunedCaption || '').trim();
        img.alt = caption ? 'Instagram post: ' + caption : 'Instagram post';
        a.appendChild(img);

        if (post.mediaType === 'VIDEO') {
          var badge = document.createElement('span');
          badge.className = 'insta__badge insta__badge--play';
          badge.setAttribute('aria-hidden', 'true');
          a.appendChild(badge);
        }

        li.appendChild(a);
        track.appendChild(li);
      });

      root.hidden = false;
      updateArrows();
    })
    .catch(function () { /* leave the strip hidden */ });

  function step() { return track.clientWidth * 0.8; }
  prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
  next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });

  function updateArrows() {
    var max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
  }
  track.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);
})();
