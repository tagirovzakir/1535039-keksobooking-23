const adForm = document.forms['ad-form'];
const addressInput = adForm.querySelector('#address');
const resetButton = adForm.querySelector('.ad-form__reset');
const submitButton = adForm.querySelector('.ad-form__submit');
const avatarContainer = adForm.querySelector('.ad-form-header__preview');
const photoContainer = adForm.querySelector('.ad-form__photo');
const avatarContainerInnerHtml = avatarContainer.cloneNode(true);

const allowedTypeFiles = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
];

export const addressInputInitial = function (center) {
  addressInput.defaultValue = center;
  addressInput.readOnly = true;
};

export const setSubmitCallback = function (callback) {
  submitButton.addEventListener('click', () => {
    if (submitButton.form.checkValidity()) { callback(); }
  });
};

export const setResetCallback = function (...callbacks) {
  resetButton.addEventListener('click', () => {
    callbacks.forEach((callback) => callback());
  });
};

export const setCurrentAddress = function (lat, lng) {
  addressInput.value = `${lat}, ${lng}`;
};

const createPreview = function (container, image) {
  const reader = new FileReader();
  const imagePreview = document.createElement('img');
  container.innerHTML = '';
  container.style.padding = '0';
  container.appendChild(imagePreview);
  imagePreview.style.cssText = 'object-fit: cover; width: 100%; height: 100%;';
  reader.readAsDataURL(image);
  reader.addEventListener('load', () => {
    imagePreview.src = reader.result;
  });
};

export const showPreviewImage = function () {
  adForm.addEventListener('change', (evt) => {
    if (evt.target.matches('[type="file"]')) {
      const image = evt.target.files[0];
      if (allowedTypeFiles.includes(image.type)) {
        if (evt.target.name === 'avatar') {
          createPreview(avatarContainer, image);
        }
        if (evt.target.name === 'images') {
          createPreview(photoContainer, image);
        }
      }
    }
  });
};

export const removePreviews = function () {
  if (adForm['avatar'].files.length) {
    avatarContainer.innerHTML = '';
    avatarContainer.appendChild(avatarContainerInnerHtml);
  }
  if (adForm['images'].files.length) {
    photoContainer.innerHTML = '';
  }
};

