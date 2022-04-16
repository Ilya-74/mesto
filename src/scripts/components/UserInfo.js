export class UserInfo {
    constructor({profileNameSelector, profileBioSelector, avatarSelector}) {
        this._nameElement = document.querySelector(profileNameSelector)
        this._bioElement = document.querySelector(profileBioSelector)
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            bio: this._bioElement.textContent,
        }
    }

    setUserInfo( title, bio, avatar ) {
        this._nameElement.textContent = title;
        this._bioElement.textContent = bio;
        this._avatar.src = avatar;
    }
}