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

const createElement = (name, attrs = {}) => {
  const element = document.createElement(name);
  const keys = Object.keys(attrs);
  element.classList.add(attrs.class);
  for (const key of keys) {
    element.setAttribute(key, attrs[key]);
  }
  return element;
};

const createGalleryItems = (image, index) => {
  const galleryItemAttrs = {
    class: "gallery__item",
  };
  const galleryLinkAttrs = {
    class: "gallery__link",
    href: image.original,
  };
  const galleryImgAttrs = {
    class: "gallery__image",
    src: image.preview,
    "data-index": index,
    alt: image.description,
    "data-source": image.original,
  };

  const createGalleryItem = createElement("li", galleryItemAttrs);
  const createGalleryImg = createElement("img", galleryImgAttrs);
  const createGalleryLink = createElement("a", galleryLinkAttrs);
  createGalleryLink.appendChild(createGalleryImg);
  createGalleryItem.appendChild(createGalleryLink);
  return createGalleryItem;
};

const galleryItems = images.map((image, index) => {
  return createGalleryItems(image, index);
});
jsGalleryRef.append(...galleryItems);

const handlejsGalleryShow = (event) => {
  event.preventDefault();
  const { target } = event;
  if (target.nodeName !== "IMG") return;
  modalRef.classList.add("is-open");
  lightboxImageRef.src = target.dataset.source;
  index = target.dataset.index;
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
  if (!modalRef.classList.contains("is-open")) return;
  handlejsGalleryClose();
};

const handlePrevSlide = (event) => {
  if (!modalRef.classList.contains("is-open")) return;
  if (index > 0) {
    index -= 1;
    lightboxImageRef.src = images[index].original;
  }
};

const handleNextSlide = (event) => {
  if (!modalRef.classList.contains("is-open")) return;
  if (index < images.length - 1) {
    index += 1;
    lightboxImageRef.src = images[index].original;
  }
};

const handlePressing = (event) => {
  const { key } = event;
  if (event.key === "Escape") handleEscPressing();
  if (event.key === "ArrowLeft") handlePrevSlide();
  if (event.key === "ArrowRight") handleNextSlide();
};

jsGalleryRef.addEventListener("click", handlejsGalleryShow);

btnCloseRef.addEventListener("click", handlejsGalleryClose);

overlayRef.addEventListener("click", handleOverlayClickClose);

window.addEventListener("keydown", handlePressing);
