import images from '/gallery-items.js';

const imagesContainer = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const backdrop = document.querySelector('.lightbox__overlay');
const lightboxImage = document.querySelector('.lightbox__image');
const closeLightboxButton = document.querySelector('.lightbox__button');
const galleryMarkup = createGalleryMarkup(images);

imagesContainer.insertAdjacentHTML('beforeend', galleryMarkup);

imagesContainer.addEventListener('click', onImagesContainerClick);

const imageLinks = document.querySelectorAll('.gallery__link');
imageLinks.forEach(link => {
	link.addEventListener('click', onImageLinkClick, false);
});

function createGalleryMarkup(images) {
	return images.map(({ preview, original, description }) => {
		return `
		<li class="gallery__item">
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
		</li>
		`;
	}).join('');
}

function onImagesContainerClick(evt) {
	if (evt.target.nodeName !== 'IMG') {
		return;
	}
	closeLightboxButton.addEventListener('click', onCloseLightboxButtonClick);
	backdrop.addEventListener('click', onBackdropClick);
	window.addEventListener('keydown', onEscKeyPress);
	lightbox.classList.add('is-open');
	lightboxImage.setAttribute('src', `${evt.target.dataset.source}`);
	lightboxImage.setAttribute('alt', `${evt.target.alt}`);
}

function onCloseLightboxButtonClick() {
	closeLightboxButton.removeEventListener('click', onCloseLightboxButtonClick);
	window.removeEventListener('keydown', onEscKeyPress);
	lightbox.classList.remove('is-open');
	lightboxImage.setAttribute('src', '');
	lightboxImage.setAttribute('alt', '');
}

function onImageLinkClick(evt) {
	evt.preventDefault();
}

function onBackdropClick(evt) {
	if (evt.currentTarget === evt.target) {
		backdrop.removeEventListener('click', onBackdropClick);
		onCloseLightboxButtonClick();
	}
}

function onEscKeyPress(evt) {
	if (evt.code === 'Escape') {
		window.removeEventListener('keydown', onEscKeyPress);
		onCloseLightboxButtonClick();
	}
}