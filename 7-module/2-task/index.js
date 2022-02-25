import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = createElement(`
      <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
         
          </h3>
        </div>
        <div class="modal__body">
        </div>
      </div>
    </div>
    `)
  let closeButton = this.modal.querySelector('.modal__close');
  closeButton.addEventListener('click',this.close);

  }
  open(){
   this.body = document.querySelector('body');
   this.html = document.documentElement;
   this.body.querySelector('.container').appendChild(this.modal);
   this.body.classList.add('is-modal-open');
   this.html.addEventListener('keydown',this.closeByEscape);
  }
  setTitle(title){
    let modalTitle = this.modal.querySelector('.modal__title');
    modalTitle.innerText = title;
  }
  setBody(body){
    let bodyTitle = this.modal.querySelector('.modal__body');
    bodyTitle.appendChild(body);
  }
  close(e){
    this.body = document.querySelector('body');
    this.body.classList.remove('is-modal-open');
    document.documentElement.removeEventListener('keydown',this.closeByEscape);
    let modal = document.querySelector('.modal');
    modal.remove();
    
  }
  closeByEscape(e){
    if (e.code === 'Escape'){
    this.html = document.documentElement;
    this.html.removeEventListener('keydown',this.closeByEscape);
    let modal = document.querySelector('.modal');
    modal.remove();
    }
  }
}
