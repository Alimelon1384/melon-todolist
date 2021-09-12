class ItemView {
	_data;
	_parent = document.querySelector(".item-container");
	_error = document.querySelector(".item-container .item-error");

	render(data) {
		this._data = [...data].reverse();
		this._clear();

		const markup = this._generateMarkup();
		this._parent.insertAdjacentHTML("afterbegin", markup);
	}

	renderSpinner() {
		const markup = `
		<div class="spinner-container">
			<img
				class="spinner"
				src="https://img.icons8.com/fluency/48/000000/loading.png"
			/>;
		</div>`;

		this._clear();
		this._parent.insertAdjacentHTML("afterbegin", markup);
	}

	renderError(message) {
		const markup = `
		<div class="item-error">
			<img
				src="https://img.icons8.com/doodle/48/000000/error.png"
				alt="error"
			/>
			<span class="item-error__message">
				${message}
			</span>
		</div>;
		`;

		this._clear();
		this._parent.insertAdjacentHTML("afterbegin", markup);
	}

	addHandlerRemove(handler) {
		this._parent.addEventListener("click", function (e) {
			const target = e.target;
			if (!target.classList.contains("icon-trash")) return;

			const id = target.closest(".item").dataset.id;
			handler(id);
		});
	}

	addHandlerEdit(handler) {
		this._parent.addEventListener("click", function (e) {
			const target = e.target;
			if (!target.classList.contains("icon-edit")) return;

			const id = target.closest(".item").dataset.id;
			handler(id);
		});
	}

	addHandlerCheck(handler) {
		this._parent.addEventListener("click", function (e) {
			const cbx = e.target.closest(".checkbox");
			if (!cbx) return;

			cbx.closest(".item").classList.toggle("item--checked");
			const id = cbx.closest(".item").dataset.id;
			handler(id);
		});
	}

	_clear() {
		this._parent.innerHTML = "";
	}

	_generateMarkup() {
		return this._data.map(this._generateMarkupItem).join("");
	}

	_generateMarkupItem(item) {
		return `
        <div class="item ${item.checked ? "item--checked" : ""}" data-id="${
			item.title
		}" draggable="true" data-priority="${item.priority}">
			<div class="item__checkbox">
				<input
					${item.checked ? "checked" : ""}
					class="inp-checkbox"
					id="${item.title}"
					type="checkbox"
					style="display: none"
				/>
				<label class="checkbox" for="${item.title}">
					<span>
						<svg width="12px" height="9px" viewbox="0 0 12 9">
							<polyline points="1 5 4 8 11 1"></polyline>
						</svg>
					</span>
				</label>
			</div>
			<div class="item__details">
				<div class="item__title">${item.title}</div>
				<div class="item__description" title="${item.description}">
                ${item.description}
				</div>
			</div>
			<div class="item__due-time">${item.weekday}, ${item.time}</div>
			<div class="item__icons">
				<img
					title="remove item"
					class="item__icon icon-trash"
					src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-trash-interface-kiranshastry-lineal-kiranshastry.png"
				/>

				<img
					title="edit item"
					class="item__icon icon-edit"
					src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-edit-interface-kiranshastry-lineal-kiranshastry.png"
				/>
			</div>
		</div>`;
	}
}

export default new ItemView();
