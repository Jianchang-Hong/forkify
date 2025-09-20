// import View from './View';
// class BookmarksView extends View {
//   _parentElement = document.querySelector('.bookmarks__list');
//   _message = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
//   addHandlerBookmarks(handler) {
//     const btn = document.querySelector('.nav__btn--bookmarks');
//     // console.log('btn', btn)
//     btn.addEventListener('click', function () {
//       handler();
//     });
//   }
//   _generateMarkup() {
//     return `
//         ${this._data.map(this._generateMarkupIngredient).join('')}
//     `;
//   }

//   _generateMarkupIngredient(ing) {
//     return `
//         <li class="preview">
//             <a class="preview__link" href="#${ing.id}">
//               <figure class="preview__fig">
//                 <img src="${ing.image}" alt="${ing.title}" />
//               </figure>
//               <div class="preview__data">
//                 <h4 class="preview__name">
//                   ${ing.title}
//                 </h4>
//                 <p class="preview__publisher">${ing.publisher}</p>
//               </div>
//             </a>
//         </li>
//     `;
//   }
// }

// export default new BookmarksView();
// import icons from 'url:../../img/icons.svg';
// import View from './View';
// class BookmarksView extends View {
//   _parentElement = document.querySelector('.bookmarks__list');
//   _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
//   _message = '';
//   _generateMarkup() {
//     return `
//         ${this._data.map(this._generateMarkupPreview).join('')}
//     `;
//   }

//   _generateMarkupPreview(result) {
//     const id = window.location.hash.slice(1);
//     console.log('id', id);
//     return `
//         <li class="preview">
//             <a class="preview__link ${
//               result.id === id ? 'preview__link--active' : ''
//             }" href="#${result.id}">
//               <figure class="preview__fig">
//                 <img src="${result.image}" alt="${result.title}" />
//               </figure>
//               <div class="preview__data">
//                 <h4 class="preview__title">${result.title}</h4>
//                 <p class="preview__publisher">${result.publisher}</p>
//               </div>
//             </a>
//         </li>
//     `;
//   }
// }

// export default new BookmarksView();
import View from './View';
import previewView from './previewView';
// import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return `
      ${this._data
        .map(bookmark => previewView.render(bookmark, false))
        .join('')}
    `;
  }
}

export default new BookmarksView();
