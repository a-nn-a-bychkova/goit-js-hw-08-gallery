import images from './gallery-items.js';
console.log(images);

const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  galleryItemEl: document.querySelector('.gallery__item'),
  modalEl: document.querySelector('div.lightbox'),
  lightboxOverlayEl: document.querySelector('.lightbox__overlay'),
  lightboxImageEl: document.querySelector('.lightbox__image'),
  lightboxCloseButtonEl: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
};

refs.galleryContainer.addEventListener('click', onContainerClickOpenModal);

refs.lightboxCloseButtonEl.addEventListener('click', onClickButtonCloseModal);

refs.lightboxOverlayEl.addEventListener('click', onOverlayClick);

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

refs.galleryContainer.insertAdjacentHTML('beforeend', listImagesMarkup);

console.log(refs.modalEl);

function onContainerClickOpenModal(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  refs.modalEl.classList.add('is-open');
  refs.lightboxImageEl.src = evt.target.dataset.source;
  refs.lightboxImageEl.alt = evt.target.alt;
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onKeyPress);
}

function onKeyPress(evt) {
  if (evt.code === 'ArrowRight') {
    findNextImage(images);
  } else if (evt.code === 'ArrowLeft') {
    findPreviousImage(images);
  } else {
    return;
  }
}

function findNextImage(images) {
  for (let i = 0; i < images.length; i += 1) {
    if (
      refs.lightboxImageEl.src === images[i].original &&
      i < images.length - 1
    ) {
      return (refs.lightboxImageEl.src = images[i + 1].original);
    }
  }
}

function findPreviousImage(images) {
  for (let i = 0; i < images.length; i += 1) {
    if (refs.lightboxImageEl.src === images[i].original && i > 0) {
      return (refs.lightboxImageEl.src = images[i - 1].original);
    }
  }
}

function onClickButtonCloseModal(evt) {
  // evt.preventDefault();
  if (!evt.target.classList.contains('lightbox__button')) {
    return;
  }
  closeModal();
}

function onOverlayClick(evt) {
  if (!evt.target.classList.contains('lightbox__overlay')) {
    return;
  }
  closeModal();
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

function closeModal() {
  refs.modalEl.classList.remove('is-open');
  refs.lightboxImageEl.src = '';
  refs.lightboxImageEl.alt = '';
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onKeyPress);
}

// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Открытие модального окна по клику на элементе галереи.
// Реализация делегирования на галерее ul.js - gallery и получение url большого изображения.
// Подмена значения атрибута src элемента img.lightbox__image.

// Закрытие модального окна по клику на кнопку button[data - action= "close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна,
// // пока грузится изображение, мы не видели предыдущее.
// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
