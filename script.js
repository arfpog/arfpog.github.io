(function () {
  function fadeIn() {
    requestAnimationFrame(function () {
      document.body.classList.remove('fade-out');
      document.body.classList.add('fade-in');
    });
  }

  function markCurrentNav(root) {
    var current = location.pathname.split('/').pop() || 'index.html';
    root.querySelectorAll('.bottom-nav-inner a[href]').forEach(function (a) {
      var hrefFile = a.getAttribute('href').split('/').pop();
      if (hrefFile === current) a.classList.add('is-current');
    });
  }

  function loadFooter() {
    var placeholder = document.getElementById('footer-placeholder');
    if (!placeholder) {
      fadeIn();
      return;
    }
    fetch('footer.html')
      .then(function (res) { return res.text(); })
      .then(function (html) {
        placeholder.innerHTML = html;
        markCurrentNav(placeholder);
      })
      .catch(function () {})
      .then(fadeIn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
  } else {
    loadFooter();
  }

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) fadeIn();
  });

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    var link = e.target.closest('a');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;

    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#' || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;

    var url;
    try {
      url = new URL(href, window.location.href);
    } catch (err) {
      return;
    }
    if (url.origin !== window.location.origin) return;

    e.preventDefault();
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');
    setTimeout(function () {
      window.location.href = url.href;
    }, 180);
  });
})();
