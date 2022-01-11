'use strict';

//////////////////  HEADER  //////////////////////////////
/// colors H1
document.querySelector('h1')
  .firstElementChild.style.color = '#4F9E59';
document.querySelector('h1')
  .lastElementChild.style.color = 'white';

/////////////////  MODAL WINDOW, OPEN AND CLOSE WITH EVENT HANDLERS ////////////////
///// Modal window selectors
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
///// Cookie message and header selectors
const header = document.querySelector('.header');
const cookieMessage = document.createElement('div');
cookieMessage.classList.add('cookie-message');
cookieMessage.innerHTML =
  'We use cookie for improved functionality and analytics. ' +
  '<button class="btn btn--close-cookie"> Got it! </button>';
let cookieCloseBtn;
setTimeout(() => cookieCloseBtn = document
  .querySelector('.btn--close-cookie'), 1550);

///// Open cookie message with 1.5s delay
setTimeout(() => header.append(cookieMessage), 1500);

///// Close cookie message with 1.6s delay
setTimeout(() => cookieCloseBtn
  .addEventListener('click', () => cookieMessage.remove()), 1600);

///// Styles for cookie message button
cookieMessage.style.backgroundColor = '#37383d';
cookieMessage.style.width = '100vw';
cookieMessage.style.height = '70px';

///////////////////////// BUTTON SCROLL /////////////////////////////////
///// Button and section selectors
const buttonScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
/// Tab all selectors
const tabs = document
  .querySelectorAll('.operations__tab');
const tabsContainer = document
  .querySelector('.operations__tab-container');
const tabsContent = document
  .querySelectorAll('.operations__content');

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




