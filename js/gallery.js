import images from './gallery-items.js';

const imagesContainer = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const closeLightbox = document.querySelector('.lightbox__button');
const galleryMarkup = createGalleryMarkup(images);

imagesContainer.insertAdjacentHTML('beforeend', galleryMarkup);

imagesContainer.addEventListener('click', onImagesContainerClick);
closeLightbox.addEventListener('click', onCloseLightboxButtonClick);

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

	lightbox.classList.add('is-open');
	
	// console.log(evt.target.dataset.source);
}

function onCloseLightboxButtonClick () {
	lightbox.classList.remove('is-open');
}