"use strict";
import images from "./gallery-items.js";
const jsGalleryRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const btnCloseRef = document.querySelector(
  "button[data-action = close-lightbox]"
);
const lightboxImageRef = document.querySelector(".lightbox__image");
const overlayRef = document.querySelector(".lightbox__content");
let index = 0;
let dataIndex = 0;

const createIndex = () => (index += 1);

const createGalleryImage = (image) => {
  const galleryImage = document.createElement("img");
  galleryImage.classList.add("gallery__image");
  galleryImage.setAttribute("src", image.preview);
  galleryImage.setAttribute("data-source", image.original);
  galleryImage.setAttribute("alt", image.description);
  galleryImage.setAttribute("data-index", createIndex());
  return galleryImage;
};

const createGalleryLink = (image) => {
  const galleryImage = createGalleryImage(image);
  const galleryLink = document.createElement("a");
  galleryLink.classList.add("gallery__link");
  galleryLink.setAttribute("href", image.original);
  galleryLink.appendChild(galleryImage);
  return galleryLink;
};

const createGalleryItem = (image) => {
  const galleryItem = document.createElement("li");
  galleryItem.classList.add("gallery__item");
  const galleryLink = createGalleryLink(image);
  galleryItem.appendChild(galleryLink);
  return galleryItem;
};

const galleryImages = images.map((image) => {
  return createGalleryItem(image);
});
jsGalleryRef.append(...galleryImages);

const handlejsGalleryShow = (event) => {
  event.preventDefault();
  const { target } = event;
  if (target.nodeName !== "IMG") return;
  modalRef.classList.add("is-open");
  lightboxImageRef.src = target.dataset.source;
  dataIndex = target.dataset.index - 1;
  console.log(dataIndex);
};

const handlejsGalleryClose = () => {
  modalRef.classList.remove("is-open");
  lightboxImageRef.src = "";
};

const handleOverlayClickClose = (event) => {
  const { target, currentTarget } = event;
  if (target === currentTarget) {
    handlejsGalleryClose();
  }
};

const handleEscPressing = (event) => {
  const { key } = event;
  if (!modalRef.classList.contains("is-open")) return;
  if (key === "Escape") {
    handlejsGalleryClose();
  }
};

const handleLeftSlide = (event) => {
  const { key } = event;
  if (!modalRef.classList.contains("is-open")) return;
  if (dataIndex > 0) {
    if (key === "ArrowLeft") {
      dataIndex -= 1;
      lightboxImageRef.src = images[dataIndex].original;
    }
  }
};

const handleRightSlide = (event) => {
  const { key } = event;
  if (!modalRef.classList.contains("is-open")) return;
  if (dataIndex < images.length - 1) {
    if (key === "ArrowRight") {
      dataIndex += 1;
      lightboxImageRef.src = images[dataIndex].original;
    }
  }
};

jsGalleryRef.addEventListener("click", handlejsGalleryShow);

btnCloseRef.addEventListener("click", handlejsGalleryClose);

overlayRef.addEventListener("click", handleOverlayClickClose);

window.addEventListener("keydown", handleEscPressing);

window.addEventListener("keydown", (event) => handleLeftSlide(event));
window.addEventListener("keydown", (event) => handleRightSlide(event));
