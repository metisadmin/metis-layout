(function(window) {
  'use strict';

  var querySelector = document.querySelector.bind(document);

  var sideBar = querySelector('.Sidebar');
  var closeSideBtn = querySelector('.Sidebar-close');
  var openSideBtn = querySelector('.Sidebar-open');
  var toggleSideBtn = querySelector('.Sidebar-toggle');
  var resizeTimer;

  function closeSide() {
    sideBar.classList.add('is-collapsed');
  }

  function openSide() {
    sideBar.classList.remove('is-collapsed');
  }

  function toggleSide() {
    sideBar.classList.toggle('is-collapsed');
  }

  closeSideBtn.addEventListener('click', closeSide);
  openSideBtn.addEventListener('click', openSide);
  toggleSideBtn.addEventListener('click', toggleSide);

  function getViewPortWidth() {
    var docElement = document.documentElement;
    var client = docElement.clientWidth;
    var inner = window.innerWidth;

    return (client < inner) ? inner : client;
  }

  function respondSide() {
    var viewPort = getViewPortWidth();
    (viewPort < 768) ? closeSide() : openSide();
  }

  window.onload = respondSide();
  window.onresize = function() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(respondSide, 100);
  };
})(this);
