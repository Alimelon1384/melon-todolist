class FeaturesView {
	_searchInput = document.querySelector(".search__input");
	_searchForm = document.querySelector(".search");
	_btnSort = document.querySelector(".btn--sort");
	_btnClear = document.querySelector(".btn--clear");
	_btnCheckAll = document.querySelector(".btn--check-all");

	constructor() {
		this._searchForm.addEventListener("submit", (e) => e.preventDefault());
	}

	addHandlerCheckAll(handler) {
		this._btnCheckAll.addEventListener("click", handler);
	}

	addHandlerSort(handler) {
		this._btnSort.addEventListener("click", handler);
	}

	addHandlerSearch(handler) {
		this._searchInput.addEventListener("input", function () {
			handler(this.value);
		});
	}

	addHandlerClearChecked(handler) {
		this._btnClear.addEventListener("click", handler);
	}
}

export default new FeaturesView();
