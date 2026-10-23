/* AMANAH — light landing only (no narrative stage) */
(function () {
  'use strict';

  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  var topBar = document.querySelector('.top');
  function onScroll() {
    if (topBar) topBar.classList.toggle('is-on', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nodes = document.querySelectorAll('[data-in]');
  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(nodes, function (el) { el.classList.add('is-show'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-show');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -36px 0px' });
    Array.prototype.forEach.call(nodes, function (el) { io.observe(el); });
  }

  var STORE = 'https://www.noon.com/saudi-en/';
  Array.prototype.forEach.call(document.querySelectorAll('[data-store]'), function (a) {
    if (!a.getAttribute('href') || a.getAttribute('href') === '#') a.setAttribute('href', STORE);
  });
})();
