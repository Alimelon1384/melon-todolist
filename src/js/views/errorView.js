class ErrorView {
	_container = document.querySelector(".error-container");
	_window = document.querySelector(".error-container .error");
	_overlay = document.querySelector(".error-container .overlay");
	_btn = document.querySelector(".error__btn button");
	_title = document.querySelector(".error__title");
	_text = document.querySelector(".error__text");

	constructor() {
		this._btn.addEventListener("click", this.removeWindow.bind(this));
		this._overlay.addEventListener("click", this.removeWindow.bind(this));
		document.addEventListener("keypress", (e) => {
			e.key === "Escape" ? this.removeWindow().bind(this) : null;
		});
	}

	render(title, text) {
		this._title.innerHTML = title;
		this._text.innerHTML = text;
		this.createWindow();
	}

	removeWindow() {
		this._container.classList.add("hidden");
	}

	createWindow() {
		this._container.classList.remove("hidden");
	}
}

export default new ErrorView();
