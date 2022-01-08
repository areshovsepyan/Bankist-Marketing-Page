'use strict';

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
setTimeout(() => header.prepend(cookieMessage), 1500);

///// Close cookie message with 1.6s delay
setTimeout( () => cookieCloseBtn
  .addEventListener('click', () => cookieMessage.remove()), 1600);

////////////////////////////////////////////////////




