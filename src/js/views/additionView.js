class AdditionView {
	_container = document.querySelector(".addition-container");
	_window = document.querySelector(".addition-container .addition");
	_overlay = document.querySelector(".addition-container .overlay");
	_btnOpen = document.querySelector(".btn--add");
	_btnConfirm = document.querySelector(".addition__btn.btn-confirm");
	_btnCancel = document.querySelector(".addition__btn.btn-cancel");
	_form = document.querySelector(".addition__form");
	_edit = false;

	constructor() {
		this._btnOpen.addEventListener("click", this.createWindow.bind(this));
		this._btnCancel.addEventListener("click", this.removeWindow.bind(this));
		this._overlay.addEventListener("click", this.removeWindow.bind(this));
	}

	removeWindow(e) {
		e?.preventDefault();
		this._container.classList.add("hidden");
	}

	createWindow() {
		this._container.classList.remove("hidden");
		setTimeout(() => {
			this._form.querySelector("input").focus();
		}, 500);
	}

	addHandlerSubmit(handler) {
		this._form.addEventListener("submit", (e) => {
			e.preventDefault();

			// get form data
			const data = Array.from(new FormData(this._form));

			handler(data, this._edit);
		});
	}

	clearForm() {
		this._form.querySelectorAll(".inp").forEach((input) => input.blur());
		this._form
			.querySelectorAll(".inp")
			.forEach((input) => (input.value = ""));

		this._form.querySelector("#time").value = "00:00";
		this._form.querySelector("#priority").children[1].selected = "selected";
	}

	toggleEdit() {
		this._edit = !this._edit;
	}

	settingDefaultValue({ title, weekday, time, priority, description }) {
		const inpTitle = this._form.querySelector("#title");
		const inpWeekday = this._form.querySelector("#weekday");
		const inpTime = this._form.querySelector("#time");
		const inpPriority = this._form.querySelector("#priority");
		const inpDescription = this._form.querySelector("#description");

		inpTitle.value = title;
		inpWeekday.value = weekday;
		inpTime.value = time;
		inpPriority.value = priority;
		inpDescription.value = description;
	}
}

export default new AdditionView();
