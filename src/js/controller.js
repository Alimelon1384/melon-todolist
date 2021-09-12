import * as model from "./model.js";
import ItemView from "./views/itemView.js";
import ErrorView from "./views/errorView.js";
import AdditionView from "./views/additionView.js";
import FeaturesView from "./views/featuresView.js";

const controlAddition = function (data, edit) {
	// transfer to todo object
	const newItem = model.createTODO(data);

	if (edit) {
		AdditionView.toggleEdit();

		const oldItem = model.state.edit;
		const condition = model.state.items.find(
			(obj) =>
				obj.title.toLowerCase() === newItem.title.toLowerCase() &&
				obj.title !== oldItem.title
		);

		if (condition) {
			ErrorView.render(
				"addition error",
				"Couldn't add two item with the same title!"
			);
			return;
		}
		// update state
		const obj = model.state.items.find((i) => i.title === oldItem.title);
		model.editItem(obj, newItem);
	} else {
		// check title condition
		const condition = model.state.items.find(
			(obj) => obj.title.toLowerCase() === newItem.title.toLowerCase()
		);
		if (condition) {
			ErrorView.render(
				"addition error",
				"Couldn't add two item with the same title!"
			);
			return;
		}

		// add to items
		model.appendItem(newItem);
	}

	// close window
	AdditionView.removeWindow();

	// clear form
	AdditionView.clearForm();

	// update the ui list
	ItemView.render(model.state.items);
};

const controlRemoveItem = function (id) {
	// remove from state
	model.removeItem(id);

	// remove from ui
	ItemView.render(model.state.items);
};

const controlSearch = async function (query) {
	// render spinner
	ItemView.renderSpinner();

	// timeout
	await model.timeout(0.4);

	if (!query) {
		// main all item
		ItemView.render(model.state.items);
	} else {
		const results = model.searchItem(query);
		// render results
		if (results.length) ItemView.render(results);
		// render error
		else ItemView.renderError("no results found for your search query!");
	}
};

const controlSort = function () {
	if (model.state.sorted) {
		ItemView.render(model.state.items);
	} else {
		ItemView.render(model.sortItems());
	}
	model.state.sorted = !model.state.sorted;
};

const controlCheck = function (id) {
	// toggle checkbox
	model.toggleCheck(id);
};

const controlClearChecked = function () {
	// get checked items
	const checkItems = model.getCheckedItems();

	// remove checked items
	checkItems.forEach((item) => {
		model.removeItem(item.title);
	});

	// update ui
	ItemView.render(model.state.items);
};

const controlEdit = function (id) {
	// find item
	const item = model.state.items.find((item) => item.title === id);
	model.state.edit = item;

	// add window
	AdditionView.createWindow();

	// set default value
	AdditionView.settingDefaultValue(item);

	// get edit form
	AdditionView.toggleEdit();
};

const controlCheckAll = function () {
	// check all the items
	model.toggleCheckAll();

	// update ui list
	ItemView.render(model.state.items);
};

const init = function () {
	FeaturesView.addHandlerSearch(controlSearch);
	FeaturesView.addHandlerClearChecked(controlClearChecked);
	FeaturesView.addHandlerCheckAll(controlCheckAll);
	FeaturesView.addHandlerSort(controlSort);
	ItemView.render(model.state.items);
	ItemView.addHandlerRemove(controlRemoveItem);
	ItemView.addHandlerCheck(controlCheck);
	ItemView.addHandlerEdit(controlEdit);
	AdditionView.addHandlerSubmit(controlAddition);
};

init();
