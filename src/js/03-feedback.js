import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form');
const inputNameRef = document.querySelector('input[name="email"]');
const areaMessageRef = document.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';
let dataStorage;
if (!localStorage.getItem(STORAGE_KEY)) {
  dataStorage = {};
} else {
  dataStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
}
getStorageLocalValue();
formRef.addEventListener('input', throttle(addData, 500));
function addData(evt) {
  dataStorage[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataStorage));
}
formRef.addEventListener('submit', removeData);
function removeData(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  localStorage.removeItem(STORAGE_KEY);
  formRef.reset();
  delete dataStorage.email;
  delete dataStorage.message;
}
function getStorageLocalValue() {
  const storageOBject = localStorage.getItem(STORAGE_KEY);
  if (storageOBject) {
    const storageValue = JSON.parse(storageOBject);
    areaMessageRef.value = storageValue.message;
    inputNameRef.value = storageValue.email;
  }
}
