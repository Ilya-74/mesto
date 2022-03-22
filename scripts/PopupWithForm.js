import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector)

        this._handleSubmit = handleSubmit
        this._form = this._popup.querySelector('.popup__form')
    }

    _getInputValues() {

    }

    setEventListeners() {
        super.setEventListeners()

        this._form.addEventListener('submit', this._handleSubmit)

    }

    close() {
        super.close()
        this._form.reset()
    }
}