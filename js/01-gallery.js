import { galleryItems } from "./gallery-items.js";
// 
const refs = {
  ulEl: document.querySelector(".gallery"),
};

const imgEl = galleryItems
  .map(({ preview, original, description }) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `)
  .join("");
console.log(imgEl);

refs.ulEl.insertAdjacentHTML("afterbegin", imgEl);


const modal = basicLightbox.create(`
  <img
    src=""
    width="800"
    height="600"
    alt="${galleryItems.description}"
  />
`, {
  onShow: () => {
    document.addEventListener("keydown", onEscClose);
  },
  onClose: () => {
    document.removeEventListener("keydown", onEscClose);
  },
});

function onEscClose(event) {
  if (event.code !== "Escape") {
    return;
  }

  modal.close();
}

function onOpenModal(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") return; 
  const source = e.target.dataset.source;
  const image = modal.element().querySelector("img");
  image.src = source;
  modal.show();
}

refs.ulEl.addEventListener("click", onOpenModal);