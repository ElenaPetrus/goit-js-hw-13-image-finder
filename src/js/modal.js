import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onGallerylClick(event) {
    event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const imgChange = `<img src= "${event.target.dataset.source}" height="600"/>`;
  const instance = basicLightbox.create(imgChange);
  
  instance.show();
  window.addEventListener('keydown', closeModal); 

  function closeModal(event) {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', closeModal);
    }
  }
}

export {onGallerylClick};