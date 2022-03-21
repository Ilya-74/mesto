export class Poupup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._handleEscClose = this._handleEscClose.bind(this)

    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keydown", this._handleEscClose);

    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keydown", this._handleEscClose);

    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close()
          }

    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__imge-close')

        this._popup.addEventListener('click', (event) => {
            if (
                event.target.classList.contains('popup') | 
                event.target.classList.contains(closeButton)
                ) {
                    this.close()
                }
        })

    }
}