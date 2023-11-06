import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const breedSelectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

loaderEl.classList.add('visually-hidden');
errorEl.classList.add('visually-hidden');

let isFirstLoad = true;

const displaySelect = new SlimSelect({
  select: breedSelectEl,
});

fetchBreeds()
  .then(breeds => {
    const displayData = breeds.map(({ id, name }) => ({
      text: name,
      value: id,
    }));
    displaySelect.setData(displayData);
  })
  .catch(anErrorOccurred);

breedSelectEl.addEventListener('change', changeCat);

function changeCat(event) {
  event.preventDefault();

  catInfoEl.innerHTML = '';

  loaderEl.classList.replace('visually-hidden', 'loader');
  catInfoEl.classList.add('visually-hidden');

  let breedId = event.currentTarget.value;

  fetchCatByBreed(breedId).then(breeds => {
    loaderEl.classList.replace('loader', 'visually-hidden');
    breedSelectEl.classList.remove('visually-hidden');

    const catImg = breeds
      .map(({ url }) => {
        return `<img src="${url}" class="cat-img" alt="cat" width=500/>`;
      })
      .join('');
    catInfoEl.insertAdjacentHTML('afterbegin', catImg);
  });

  if (!isFirstLoad) {
    fetchBreeds().then(breeds => {
      const infoCat = breeds
        .map(breed => {
          if (breed.id === breedId) {
            const { description, temperament, name, origin } = breed;

            return `<div class="info-cat">
                  <h1>${name}</h1>
                  <p>${description}</p>
                  <p><span class="temperament">Temperament: </span>${temperament}</p>
                  <p><span class="country">Country: </span>${origin}</p>
                </div>`;
          }
        })
        .join('');

      catInfoEl.insertAdjacentHTML('beforeend', infoCat);
      catInfoEl.classList.remove('visually-hidden');
    });
  }
  isFirstLoad = false;
}

function anErrorOccurred() {
  loaderEl.classList.add('visually-hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong. Try reloading the page.'
  );
}
