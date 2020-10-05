import images from './gallery-items.js';
// console.log(images);

// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const galleryContainer = document.querySelector('.js-gallery');

const galleryImageEL = document.querySelector('.gallery__image');

const modalEl = document.querySelector('div.lightbox');
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');
const lightboxImageEl = document.querySelector('.lightbox__image');
const lightboxCloseButtonEl = document.querySelector(
  'button[data-action="close-lightbox"]',
);
galleryContainer.addEventListener('click', onContainerClickOpenModal);

lightboxCloseButtonEl.addEventListener('click', onCloseModal);

// console.log(lightboxButtonEl);

// const option = images[0];
// const imageEl = document.createElement('li');

const listImagesMarkup = images
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
  .join('');

galleryContainer.insertAdjacentHTML('beforeend', listImagesMarkup);

console.log(modalEl);

// Реализация делегирования на галерее ul.js - gallery и получение url большого изображения.

function onContainerClickOpenModal(evt) {
  console.log(evt);
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  modalEl.classList.add('is-open');
  lightboxImageEl.src = evt.target.dataset.source;
  lightboxImageEl.alt = evt.target.alt;
}

function onCloseModal(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('lightbox__button')) {
    return;
  }
  modalEl.classList.remove('is-open');
  lightboxImageEl.src = '';
  lightboxImageEl.alt = '';
}

// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.

// Закрытие модального окна по клику на кнопку button[data - action= "close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
// пока грузится изображение, мы не видели предыдущее.
