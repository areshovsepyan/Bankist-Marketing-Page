'use strict';

///// DOM selectors /////
const modal = document
  .querySelector('.modal');
const overlay = document
  .querySelector('.overlay');
const btnCloseModal = document
  .querySelector('.btn--close-modal');
const btnsOpenModal = document
  .querySelectorAll('.btn--show-modal');
const header = document
  .querySelector('.header');
const cookieMessage = document
  .createElement('div');
const buttonScrollTo = document
  .querySelector('.btn--scroll-to');
const allSections = document
  .querySelectorAll('.section');
const section1 = document
  .querySelector('#section--1');
const tabs = document
  .querySelectorAll('.operations__tab');
const tabsContainer = document
  .querySelector('.operations__tab-container');
const tabsContent = document
  .querySelectorAll('.operations__content');
const navBar = document
  .querySelector('.nav');
const imgTargets = document
  .querySelectorAll('img[data-src]');


//////////////////  HEADER STYLE CHANGED  //////////////////////////////
/// colors H1
document.querySelector('h1')
  .firstElementChild.style.color = '#4F9E59';
document.querySelector('h1')
  .lastElementChild.style.color = 'white';

/////////////////  MODAL WINDOW, OPEN AND CLOSE WITH EVENT HANDLERS ///////////
const openModal = function(e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

///// OPEN MODAL WINDOW // both button included /////
btnsOpenModal.forEach(btn => btn
  .addEventListener('click', openModal));

///// CLOSE MODAL WINDOW // close button, overlay and escape key
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////// ADD COOKIE MESSAGE WITH TIME DELAY //////
cookieMessage.classList.add('cookie-message');
cookieMessage.innerHTML =
  'We use cookie for improved functionality and analytics. ' +
  '<button class="btn btn--close-cookie"> Got it! </button>';
let cookieCloseBtn;
setTimeout(() => cookieCloseBtn = document
  .querySelector('.btn--close-cookie'), 1550);

///// Open cookie message with 1.5s delay
setTimeout(() => header.prepend(cookieMessage), 1500);

///// Close cookie message with 1.6s delay
setTimeout(() => cookieCloseBtn
  .addEventListener('click', () => cookieMessage.remove()), 1600);

///// Styles for cookie message button
cookieMessage.style.backgroundColor = '#37383d';
cookieMessage.style.width = '100vw';
cookieMessage.style.height = '70px';

///////////////////////// BUTTON SCROLL /////////////////////////////////
///// Event handler to the button
buttonScrollTo.addEventListener('click', function(e) {
  e.preventDefault();
///// Scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////// PAGE NAVIGATION SMOOTH / NAVIGATION BAR EVENTS ////////////////
/// creating an event on parent element,
/// passing to child with event delegation
document.querySelector('.nav__links')
  .addEventListener('click', function(e) {
    e.preventDefault();

    if (e.target.classList.contains('nav__link')
      && !e.target.classList.contains('btn--show-modal')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  }, true);

///////////////// TABBED COMPONENTS //////////////////////
/// Event handlers
tabsContainer.addEventListener('click', function(e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  // Guard clause
  if (!clicked) return;

  // remove active classes
  tabs
    .forEach(tab => tab
      .classList.remove('operations__tab--active'));
  tabsContent
    .forEach(content => content
      .classList.remove('operations__content--active'));

  // add active classes
  clicked
    .classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////// NAV BAR FADE ANIMATION /////////////////////////
/// Universal handler function
const hoverHandler = function(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav')
      .querySelectorAll('.nav__link');
    const logo = link.closest('.nav')
      .querySelector('.nav__logo');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

/// Event handlers
navBar
  .addEventListener('mouseover', hoverHandler.bind(0.5));
navBar
  .addEventListener('mouseout', hoverHandler.bind(1));

//////////////////////// STICKY NAV BAR IMPLEMENTATION //////////////////////
/// THE INTERSECTION OBSERVER API (BETTER PRACTICE)
const navHeight = navBar.getBoundingClientRect().height;
const stickyNav = function(entries, _) {
  const [entry] = entries;

  navBar.classList.remove('sticky');
  if (!entry.isIntersecting) {
    navBar.classList.add('sticky');
  }
};

const headerObserver =
  new IntersectionObserver(
    stickyNav,
    {
      root: null,
      threshold: 0,
      rootMargin: `-${navHeight}px`
    });
headerObserver.observe(header);

//////////////////////// REVEAL SECTIONS (SCROLLING) //////////////////////
const revealSections = function(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);

};
const sectionObserver = new IntersectionObserver(
  revealSections,
  {
    root: null,
    threshold: 0.15
  });
allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//////////////////////// LAZY LOADING IMAGES //////////////////////
const loadImg = function(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg,
  {
    root: null,
    threshold: 0,
    rootMargin: '200px',
  });

imgTargets.forEach(img => imgObserver.observe(img));









